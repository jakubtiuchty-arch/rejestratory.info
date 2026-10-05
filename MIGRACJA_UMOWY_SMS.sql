-- Separate, private module. Does not change serial login or existing documents.
-- Run using the database owner. No operator is provisioned automatically.
begin;
create table if not exists public.contract_operators (
  user_id uuid primary key references auth.users(id), active boolean not null default true,
  can_manage_clients boolean not null default false
);
create table if not exists public.contract_clients (
  id uuid primary key default gen_random_uuid(), name text not null, nip text not null unique,
  phone text not null check (phone ~ '^\+[1-9][0-9]{7,14}$'),
  auth_user_id uuid not null references auth.users(id), access_version integer not null default 1,
  active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.contract_operator_clients (
  operator_id uuid references public.contract_operators(user_id), client_id uuid references public.contract_clients(id),
  primary key (operator_id, client_id)
);
create table if not exists public.contract_device_bindings (
  serial text primary key, client_id uuid not null references public.contract_clients(id)
);
create table if not exists public.private_contracts (
  id uuid primary key, client_id uuid not null references public.contract_clients(id),
  name text not null, number text not null, signed_on date not null,
  object_key text not null unique, sha256 text not null check (sha256 ~ '^[0-9a-f]{64}$'),
  bytes integer not null check (bytes > 0 and bytes <= 52428800),
  status text not null default 'quarantine' check (status in ('quarantine','published','archived')),
  created_by uuid not null references auth.users(id), created_at timestamptz not null default now()
);
alter table public.private_contracts drop constraint if exists private_contracts_bytes_check;
alter table public.private_contracts add constraint private_contracts_bytes_check check (bytes > 0 and bytes <= 52428800);

create table if not exists public.contract_sms_challenges (
  id uuid primary key default gen_random_uuid(), client_id uuid not null references public.contract_clients(id),
  secret_hash text not null, ip_hash text not null, phone text not null, user_id uuid not null references auth.users(id),
  access_version integer not null, attempts integer not null default 0,
  status text not null default 'prepared' check (status in ('prepared','hooked','sent','checking','consumed','revoked')),
  created_at timestamptz not null default now(), expires_at timestamptz not null default now() + interval '5 minutes'
);
create index if not exists contract_challenges_phone on public.contract_sms_challenges(phone, created_at);
create table if not exists public.contract_access_sessions (
  token_hash text primary key, client_id uuid not null references public.contract_clients(id),
  access_version integer not null, challenge_id uuid not null unique references public.contract_sms_challenges(id),
  expires_at timestamptz not null default now() + interval '15 minutes'
);
create table if not exists public.contract_audit_events (
  id bigint generated always as identity primary key, client_id uuid references public.contract_clients(id),
  contract_id uuid, actor_id uuid, action text not null,
  created_at timestamptz not null default now()
);
-- Tables cannot be read or modified using a browser anon key or an ordinary login.
do $$ declare n text; begin
  foreach n in array array['contract_operators','contract_clients','contract_operator_clients','contract_device_bindings',
    'private_contracts','contract_sms_challenges','contract_access_sessions','contract_audit_events'] loop
    execute format('alter table public.%I enable row level security', n);
    execute format('revoke all on public.%I from public, anon, authenticated', n);
    execute format('grant all on public.%I to service_role', n);
  end loop;
end $$;
grant usage, select on sequence public.contract_audit_events_id_seq to service_role;

-- All challenge transitions are atomic. No OTP is stored here.
create or replace function public.contract_access_rpc(p_action text, p_data jsonb)
returns jsonb language plpgsql security invoker set search_path = public, pg_temp as $$
declare c public.contract_clients; ch public.contract_sms_challenges; s public.contract_access_sessions;
  cid uuid; result jsonb;
begin
  if p_action = 'request' then
    -- Global transaction lock also serializes requests across instances of the application.
    perform pg_advisory_xact_lock(77104420);
    select client_id into cid from contract_device_bindings where serial = p_data->>'serial';
    select * into c from contract_clients where id = cid and active;
    if c.id is null then return jsonb_build_object('error','unavailable'); end if;
    if exists(select 1 from contract_sms_challenges where phone = c.phone and created_at > now() - interval '60 seconds') or
       (select count(*) from contract_sms_challenges where phone = c.phone and created_at > now() - interval '1 hour') >= 5 or
       (select count(*) from contract_sms_challenges where phone = c.phone and created_at > now() - interval '24 hours') >= 10 or
       (select count(*) from contract_sms_challenges where ip_hash = p_data->>'ipHash' and created_at > now() - interval '1 hour') >= 20 then
      return jsonb_build_object('error','rate_limit');
    end if;
    update contract_sms_challenges set status = 'revoked' where phone = c.phone and status <> 'consumed';
    insert into contract_sms_challenges(client_id,secret_hash,ip_hash,phone,user_id,access_version)
      values(c.id,p_data->>'secretHash',p_data->>'ipHash',c.phone,c.auth_user_id,c.access_version) returning * into ch;
    return jsonb_build_object('id',ch.id,'phone',ch.phone);
  elsif p_action = 'hook' then
    select * into ch from contract_sms_challenges where phone = p_data->>'phone' and user_id = (p_data->>'userId')::uuid
      and status = 'prepared' and expires_at > now() order by created_at desc limit 1 for update;
    if ch.id is null or not exists(select 1 from contract_clients where id=ch.client_id and active and access_version=ch.access_version and phone=ch.phone and auth_user_id=ch.user_id) then
      return jsonb_build_object('error','denied');
    end if;
    update contract_sms_challenges set status='hooked' where id=ch.id;
    return jsonb_build_object('id',ch.id);
  elsif p_action in ('sent','cancel','verify','failed','finish') then
    select * into ch from contract_sms_challenges where id=(p_data->>'id')::uuid and secret_hash=p_data->>'secretHash' for update;
    if ch.id is null or ch.expires_at <= now() then return jsonb_build_object('error','denied'); end if;
    if p_action = 'cancel' then
      update contract_sms_challenges set status='revoked' where id=ch.id;
      return '{}'::jsonb;
    end if;
    if not exists(select 1 from contract_clients where id=ch.client_id and active and access_version=ch.access_version and phone=ch.phone and auth_user_id=ch.user_id) then
      return jsonb_build_object('error','denied');
    end if;
    if p_action = 'sent' and ch.status='hooked' then
      update contract_sms_challenges set status='sent' where id=ch.id;
      return '{}'::jsonb;
    elsif p_action = 'verify' and ch.status='sent' and ch.attempts < 5 then
      update contract_sms_challenges set attempts=attempts+1,status='checking' where id=ch.id;
      return jsonb_build_object('phone',ch.phone,'userId',ch.user_id);
    elsif p_action = 'failed' and ch.status='checking' then
      update contract_sms_challenges set status=case when attempts>=5 then 'revoked' else 'sent' end where id=ch.id;
      return '{}'::jsonb;
    elsif p_action = 'finish' and ch.status='checking' and ch.user_id=(p_data->>'userId')::uuid then
      insert into contract_access_sessions(token_hash,client_id,access_version,challenge_id)
        values(p_data->>'tokenHash',ch.client_id,ch.access_version,ch.id) returning * into s;
      update contract_sms_challenges set status='consumed' where id=ch.id;
      insert into contract_audit_events(client_id,actor_id,action) values(ch.client_id,ch.user_id,'sms_unlock');
      return jsonb_build_object('expiresAt',s.expires_at);
    end if;
    return jsonb_build_object('error','denied');
  elsif p_action = 'session' then
    select * into s from contract_access_sessions where token_hash=p_data->>'tokenHash' and expires_at>now();
    if s.token_hash is null then return jsonb_build_object('error','denied'); end if;
    if not exists(select 1 from contract_clients where id=s.client_id and active and access_version=s.access_version) or
       not exists(select 1 from contract_device_bindings where serial=p_data->>'serial' and client_id=s.client_id) then
      return jsonb_build_object('error','denied');
    end if;
    return jsonb_build_object('clientId',s.client_id,'expiresAt',s.expires_at,'userId',
      (select user_id from contract_sms_challenges where id=s.challenge_id));
  elsif p_action = 'logout' then
    delete from contract_access_sessions where token_hash=p_data->>'tokenHash';
    update contract_sms_challenges set status='revoked' where secret_hash=p_data->>'secretHash' and status <> 'consumed';
    return '{}'::jsonb;
  end if;
  return jsonb_build_object('error','denied');
end $$;
revoke all on function public.contract_access_rpc(text,jsonb) from public, anon, authenticated;
grant execute on function public.contract_access_rpc(text,jsonb) to service_role;

create or replace function public.contract_revoke_access() returns trigger language plpgsql set search_path=public,pg_temp as $$
begin
  if (new.phone,new.auth_user_id,new.active) is distinct from (old.phone,old.auth_user_id,old.active) then
    new.access_version := old.access_version + 1;
  end if;
  return new;
end $$;
drop trigger if exists contract_revoke_access on public.contract_clients;
create trigger contract_revoke_access before update on public.contract_clients for each row execute function public.contract_revoke_access();

create or replace function public.contract_save_client(p_operator uuid,p_name text,p_nip text,p_phone text,p_user uuid,p_serials text[])
returns uuid language plpgsql security invoker set search_path=public,pg_temp as $$
declare cid uuid; sn text;
begin
  if not exists(select 1 from contract_operators where user_id=p_operator and active and can_manage_clients) then raise exception 'CONTRACT_DENIED'; end if;
  perform pg_advisory_xact_lock(77104421);
  insert into contract_clients(name,nip,phone,auth_user_id) values(p_name,p_nip,p_phone,p_user)
    on conflict(nip) do update set name=excluded.name,phone=excluded.phone,auth_user_id=excluded.auth_user_id returning id into cid;
  foreach sn in array p_serials loop
    if exists(select 1 from contract_device_bindings where serial=sn and client_id<>cid) then raise exception 'CONTRACT_BINDING_CONFLICT'; end if;
    insert into contract_device_bindings(serial,client_id) values(sn,cid) on conflict(serial) do nothing;
  end loop;
  insert into contract_operator_clients(operator_id,client_id) values(p_operator,cid) on conflict do nothing;
  insert into contract_audit_events(client_id,actor_id,action) values(cid,p_operator,'contact_approved');
  return cid;
end $$;
revoke all on function public.contract_save_client(uuid,text,text,text,uuid,text[]) from public,anon,authenticated;
grant execute on function public.contract_save_client(uuid,text,text,text,uuid,text[]) to service_role;

create or replace function public.contract_publish(p_id uuid,p_operator uuid,p_client_version integer)
returns void language plpgsql security invoker set search_path=public,pg_temp as $$
declare doc public.private_contracts;
begin
  select * into doc from private_contracts where id=p_id and status='quarantine' for update;
  if doc.id is null or doc.created_by<>p_operator or
    not exists(select 1 from contract_operators o where o.user_id=p_operator and active and
      (can_manage_clients or exists(select 1 from contract_operator_clients where operator_id=p_operator and client_id=doc.client_id))) or
    not exists(select 1 from contract_clients where id=doc.client_id and active and access_version=p_client_version) then raise exception 'CONTRACT_DENIED'; end if;
  update private_contracts set status='published' where id=p_id;
  insert into contract_audit_events(client_id,contract_id,actor_id,action) values(doc.client_id,doc.id,p_operator,'publish');
end $$;
revoke all on function public.contract_publish(uuid,uuid,integer) from public,anon,authenticated;
grant execute on function public.contract_publish(uuid,uuid,integer) to service_role;

-- Never use the old client_documents table for contracts. Private random object paths only.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('contracts-private','contracts-private',false,52428800,array['application/pdf'])
 on conflict(id) do update set public=false,file_size_limit=52428800,allowed_mime_types=array['application/pdf'];
-- Restrictive policies prevent existing broad/permissive Storage policies from granting access.
drop policy if exists contracts_private_deny_browser on storage.objects;
create policy contracts_private_deny_browser on storage.objects as restrictive for all to anon,authenticated
 using(bucket_id <> 'contracts-private') with check(bucket_id <> 'contracts-private');
commit;

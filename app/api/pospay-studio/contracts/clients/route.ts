import { NextRequest } from 'next/server';
import { contractAdmin, contractOperator, contractFailure, privateJSON, smallJSON } from '@/lib/contracts-server';
import { ContractError, contractSerial, contractPhone, contractNIP, contractText } from '@/lib/contracts-validation';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const operator = await contractOperator(request), db = contractAdmin();
    let query = db.from('contract_clients').select('id,name,nip,phone').eq('active', true).order('name');
    if (!operator.can_manage_clients) {
      const { data, error } = await db.from('contract_operator_clients').select('client_id').eq('operator_id', operator.user_id);
      if (error) throw error;
      query = query.in('id', (data || []).map(c => c.client_id));
    }
    const { data, error } = await query;
    if (error) throw error;
    return privateJSON({ clients: data, canManageClients: operator.can_manage_clients });
  } catch (error) { return contractFailure(error); }
}
export async function POST(request: NextRequest) {
  try {
    const operator = await contractOperator(request);
    if (!operator.can_manage_clients) throw new ContractError('Brak uprawnień do zatwierdzania telefonów.', 403);
    const body = await smallJSON(request);
    if (body.phoneApproved !== true || !Array.isArray(body.serials) || body.serials.length < 1 || body.serials.length > 100) throw new ContractError('Potwierdź uprawnienie właściciela numeru do umów klienta i dodaj numer urządzenia.');
    const phone = contractPhone(body.phone), name = contractText(body.name, 200), nip = contractNIP(body.nip), serials = [...new Set(body.serials.map(contractSerial))];
    const db = contractAdmin();
    const { data: existing } = await db.from('contract_clients').select('auth_user_id').eq('phone', phone).limit(1).maybeSingle();
    let userId = existing?.auth_user_id;
    if (!userId) {
      const { data, error } = await db.auth.admin.createUser({ phone, phone_confirm: true });
      if (error || !data.user) throw new ContractError('Nie udało się przypisać telefonu. Jeśli numer ma już konto, administrator musi potwierdzić jego powiązanie.', 409);
      userId = data.user.id;
    }
    const { data: id, error } = await db.rpc('contract_save_client', { p_operator: operator.user_id, p_name: name, p_nip: nip, p_phone: phone, p_user: userId, p_serials: serials });
    if (error) throw new ContractError('Nie udało się zapisać klienta. Sprawdź, czy numer urządzenia nie jest przypisany do innego klienta.', 409);
    return privateJSON({ id, name, nip, phone });
  } catch (error) { return contractFailure(error); }
}

const {chromium, expect} = require('@playwright/test');
(async () => {
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1280,height:900}});
 await page.addInitScript(() => {localStorage.setItem('client_name','Nadleśnictwo Test'); localStorage.setItem('serial_number','SERIAL-A');});
 await page.route('https://example.supabase.co/**',async route => {
  const devices=route.request().url().includes('/rest/v1/devices');
  await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(devices?[{id:'11111111-1111-1111-1111-111111111111',serial_number:'SERIAL-A',client_name:'Nadleśnictwo Test',device_name:'Posnet Pospay',last_inspection_date:null,fiscalization_date:'2026-09-30',next_inspection_date:'2028-09-30',location:'Test',forestry_unit:'Jaworz'}]:[])});
 });
 let unlocked=false;
 await page.route('**/api/contracts/**',async route=>{
  const path=new URL(route.request().url()).pathname;
  let status=200,body={};
  if(path.endsWith('request-code')) body={challengeId:'11111111-1111-1111-1111-111111111111',resendAfter:60,expiresIn:300,message:'Kod wysłano na zatwierdzony numer telefonu.'};
  else if(path.endsWith('verify-code')) { const code=route.request().postDataJSON().code; if(code!=='482913'){status=401;body={message:'Kod jest błędny lub wygasł.'}} else {unlocked=true;body={expiresAt:new Date(Date.now()+900000).toISOString()}} }
  else if(path.endsWith('logout')) {unlocked=false;body={success:true};}
  await route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});
 });
 await page.route('**/api/contracts?**',async route=>route.fulfill({status:unlocked?200:401,contentType:'application/json',body:JSON.stringify(unlocked?{contracts:[{id:'11111111-1111-1111-1111-111111111111',name:'Umowa testowa',number:'1/2026',signed_on:'2026-09-30',bytes:100}],expiresAt:new Date(Date.now()+900000).toISOString()}:{message:'Odblokuj umowy kodem SMS.'})}));
 await page.goto((process.env.BASE_URL || 'http://127.0.0.1:3419') + '/panel-klienta/dashboard');
 await expect(page.getByRole('heading',{name:'Umowy',exact:true})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Przydatne dokumenty',exact:true})).toBeVisible();
 await expect(page.getByText('Umowa testowa',{exact:true})).toHaveCount(0);
 const pos=await page.locator('h2').allTextContents(); if(pos.indexOf('Umowy')<=pos.findIndex(x=>x.includes('Przydatne dokumenty'))) throw Error('Incorrect section order');
 await page.getByRole('button',{name:'Odblokuj kodem SMS',exact:true}).click();
 await page.getByLabel('Kod SMS').fill('111111');
 await page.getByRole('button',{name:'Odblokuj umowy',exact:true}).click();
 await expect(page.getByText('Kod jest błędny lub wygasł.',{exact:true})).toBeVisible();
 await expect(page.getByText('Umowa testowa',{exact:true})).toHaveCount(0);
 await page.getByLabel('Kod SMS').fill('482913');
 await page.getByRole('button',{name:'Odblokuj umowy',exact:true}).click();
 await expect(page.getByText('Umowa testowa',{exact:true})).toBeVisible();
 await page.getByRole('heading',{name:'Umowy',exact:true}).scrollIntoViewIfNeeded();
 await page.screenshot({path:'.vercel/contracts-unlocked.png'});
 await page.getByRole('button',{name:'Zablokuj umowy',exact:true}).click();
 await expect(page.getByText('Umowa testowa',{exact:true})).toHaveCount(0);
 console.log('OK: UI, kolejność, lista ukryta przed SMS i po blokadzie, błędny kod, poprawne odblokowanie. Wyłącznie atrapy, bez SMS.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

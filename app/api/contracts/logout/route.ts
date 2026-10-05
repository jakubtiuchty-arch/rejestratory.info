import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { hashSecret } from '@/lib/contracts-validation';
import { accessRPC, requireContractOrigin, privateJSON, contractCookie, CHALLENGE_COOKIE, CONTRACT_COOKIE, contractFailure } from '@/lib/contracts-server';
export async function POST(request: NextRequest) {
  try {
    requireContractOrigin(request);
    const jar = await cookies();
    await accessRPC('logout', { tokenHash: hashSecret(jar.get(CONTRACT_COOKIE)?.value || ''), secretHash: hashSecret(jar.get(CHALLENGE_COOKIE)?.value || '') });
    const response = privateJSON({ success: true });
    for (const name of [CONTRACT_COOKIE, CHALLENGE_COOKIE]) contractCookie(response, name, '', 0);
    return response;
  } catch (error) { return contractFailure(error); }
}

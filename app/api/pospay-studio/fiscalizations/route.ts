import { NextRequest, NextResponse } from "next/server";
import { authorizedPospayRequest, parseRegistration } from "@/lib/pospay-registration";
import { pospayErrorResponse, pospayRPC } from "@/lib/pospay-portal";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!authorizedPospayRequest(request.headers.get("authorization"))) return NextResponse.json({ message: "Brak dostępu do integracji." }, { status: 401 });
  try {
    if (Number(request.headers.get("content-length")) > 10000) return NextResponse.json({ message: "Zgłoszenie jest za duże." }, { status: 413 });
    const registration = parseRegistration(await request.json());
    const result = await pospayRPC("register", registration);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    if (error instanceof SyntaxError) return NextResponse.json({ message: "Nieprawidłowy JSON." }, { status: 400 });
    const result = pospayErrorResponse(error);
    return NextResponse.json({ message: result.message }, { status: result.status });
  }
}

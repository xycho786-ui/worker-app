import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'Test API GET success' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ status: 'Test API POST success', body });
  } catch (error: any) {
    return NextResponse.json({ status: 'Test API POST error', error: error.message }, { status: 500 });
  }
}

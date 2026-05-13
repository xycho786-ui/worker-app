import { NextResponse } from 'next/server';
import postgres from 'postgres';

export async function GET() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return NextResponse.json({ message: 'Database connection string missing' }, { status: 500 });
  }
  
  const sql = postgres(connectionString);

  try {
    const email1 = 'anfasmohammed001@gmail.com';
    const email2 = 'xycho786@gmail.com';

    // Delete from auth.users (Supabase Auth schema)
    await sql`DELETE FROM auth.users WHERE email IN (${email1}, ${email2})`;
    
    // Delete from public."User" (Prisma schema)
    await sql`DELETE FROM public."User" WHERE email IN (${email1}, ${email2})`;

    return NextResponse.json({ 
      message: 'Successfully deleted the stuck accounts! You can now sign up again with these emails.' 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await sql.end();
  }
}

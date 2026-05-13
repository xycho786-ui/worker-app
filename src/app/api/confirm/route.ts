import { NextResponse } from 'next/server';
import postgres from 'postgres';

export async function GET() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return NextResponse.json({ message: 'Database connection string missing' }, { status: 500 });
  }
  
  const sql = postgres(connectionString);

  try {
    // This will confirm all emails in the Supabase auth.users table
    // by setting email_confirmed_at to the current time, bypassing the 
    // "Invalid login credentials" error caused by unverified emails!
    const result = await sql`
      UPDATE auth.users 
      SET email_confirmed_at = NOW() 
      WHERE email_confirmed_at IS NULL
      RETURNING email;
    `;

    return NextResponse.json({ 
      message: 'Successfully confirmed all user emails!',
      confirmed_users: result.map(r => r.email)
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await sql.end();
  }
}

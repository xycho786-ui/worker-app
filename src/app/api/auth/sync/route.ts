import { NextResponse } from 'next/server';
import postgres from 'postgres';

export async function GET() {
  return NextResponse.json({ status: 'API is reachable' });
}

export async function POST(request: Request) {
  console.log('API /api/auth/sync: Received POST request');
  
  // Use direct postgres client to bypass Prisma client-constructor bugs completely
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return NextResponse.json({ message: 'Database connection string missing' }, { status: 500 });
  }
  
  const sql = postgres(connectionString);

  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error('API /api/auth/sync: Failed to parse request JSON', e);
      return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
    }
    
    console.log('API /api/auth/sync: Request body:', JSON.stringify(body));
    const { id, email, name, phone, role } = body;

    if (!id || !email || !name) {
      console.warn('API /api/auth/sync: Missing required fields');
      return NextResponse.json(
        { message: 'Missing required fields: id, email, and name are required' },
        { status: 400 }
      );
    }

    console.log('API /api/auth/sync: Syncing user', id);
    
    const userRole = role || 'CUSTOMER';
    const userPhone = phone || null;

    // First, check if user exists by email
    const existingUsers = await sql`SELECT id FROM "User" WHERE email = ${email}`;
    
    let userRecord;

    if (existingUsers.length > 0) {
      console.log('API /api/auth/sync: User found by email, updating details');
      const updated = await sql`
        UPDATE "User" 
        SET id = ${id}, name = ${name}, phone = ${userPhone}, role = CAST(${userRole} AS "Role"), "updatedAt" = NOW()
        WHERE email = ${email}
        RETURNING *
      `;
      userRecord = updated[0];
    } else {
      console.log('API /api/auth/sync: User not found, creating new user');
      const inserted = await sql`
        INSERT INTO "User" (id, email, name, phone, role, "updatedAt")
        VALUES (${id}, ${email}, ${name}, ${userPhone}, CAST(${userRole} AS "Role"), NOW())
        RETURNING *
      `;
      userRecord = inserted[0];
    }

    // If role is WORKER, ensure worker profile exists
    if (userRecord.role === 'WORKER') {
      console.log('API /api/auth/sync: Ensuring worker profile for', userRecord.id);
      await sql`
        INSERT INTO "WorkerProfile" (id, "userId", skills, experience, "isOnline", rating, "totalReviews", "updatedAt")
        VALUES (gen_random_uuid(), ${userRecord.id}, ARRAY[]::text[], 0, false, 0.0, 0, NOW())
        ON CONFLICT ("userId") DO NOTHING
      `;
    }

    console.log('API /api/auth/sync: Success');
    return NextResponse.json({ user: userRecord }, { status: 201 });
  } catch (error: any) {
    console.error('API /api/auth/sync: CRITICAL ERROR:', error);
    
    // Check for unique constraint violation in Postgres (code 23505)
    if (error.code === '23505') {
      return NextResponse.json(
        { 
          message: `Account synchronization failed: The phone number or email is already registered to another account.`,
          code: error.code 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        message: error.message ? `Database Error: ${error.message}` : 'Internal server error during user synchronization', 
        error: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  } finally {
    // Close the connection
    await sql.end();
  }
}

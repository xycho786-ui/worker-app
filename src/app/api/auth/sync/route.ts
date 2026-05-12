import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'API is reachable' });
}

export async function POST(request: Request) {
  console.log('API /api/auth/sync: Received POST request');
  try {
    console.log('API /api/auth/sync: Loading Prisma...');
    // Dynamically import prisma to catch initialization errors
    const { prisma } = await import('../../../../lib/prisma');
    console.log('API /api/auth/sync: Prisma loaded');
    
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
      console.warn('API /api/auth/sync: Missing required fields', { id: !!id, email: !!email, name: !!name });
      return NextResponse.json(
        { message: 'Missing required fields: id, email, and name are required' },
        { status: 400 }
      );
    }

    console.log('API /api/auth/sync: Upserting user', id);
    // Upsert user in Prisma
    const user = await prisma.user.upsert({
      where: { id },
      update: {
        email,
        name,
        phone: phone || null,
        role: role || 'CUSTOMER',
      },
      create: {
        id,
        email,
        name,
        phone: phone || null,
        role: role || 'CUSTOMER',
      },
    });

    // If role is WORKER, ensure worker profile exists
    if (user.role === 'WORKER') {
      console.log('API /api/auth/sync: Creating worker profile for', user.id);
      await prisma.workerProfile.upsert({
        where: { userId: user.id },
        update: {}, // No changes needed if exists
        create: {
          userId: user.id,
          skills: [],
          experience: 0,
        },
      });
    }

    console.log('API /api/auth/sync: Success');
    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    console.error('API /api/auth/sync: CRITICAL ERROR:', error);
    
    // Log specifically if it's a Prisma error
    if (error.code) {
      console.error('API /api/auth/sync: Prisma Error Code:', error.code);
    }

    return NextResponse.json(
      { 
        message: 'Internal server error during user synchronization', 
        error: error.message || 'Unknown error',
        code: error.code,
        details: error.meta || null,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

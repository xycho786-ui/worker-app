import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, email, name, phone, role } = body;

    if (!id || !email || !name) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upsert user in Prisma
    const user = await prisma.user.upsert({
      where: { id },
      update: {
        email,
        name,
        phone: phone || null,
        role: (role as Role) || 'CUSTOMER',
      },
      create: {
        id,
        email,
        name,
        phone: phone || null,
        role: (role as Role) || 'CUSTOMER',
      },
    });

    // If role is WORKER, ensure worker profile exists
    if (user.role === 'WORKER') {
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

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

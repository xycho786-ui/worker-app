import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, phone, role } = body;

    if (!email || !name) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists in database' },
        { status: 400 }
      );
    }

    // Create user in Prisma
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone: phone || null,
        role: (role as Role) || 'CUSTOMER',
      },
    });

    // If role is WORKER, also create an empty worker profile
    if (user.role === 'WORKER') {
      await prisma.workerProfile.create({
        data: {
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

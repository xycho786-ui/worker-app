import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone, dob, address, locationAddress, hourlyRate, skills } = body;

    // Update User
    const updatedUser = await prisma.user.update({
      where: { email: user.email },
      data: {
        name,
        phone: phone || null,
        address: address || null,
        dob: dob ? new Date(dob) : null,
      },
      include: {
        workerProfile: true,
      }
    });

    // If user is a worker, update worker profile details
    if (updatedUser.workerProfile) {
      await prisma.workerProfile.update({
        where: { id: updatedUser.workerProfile.id },
        data: {
          locationAddress: locationAddress || null,
          hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
          skills: skills ? skills.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
        }
      });
    }

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

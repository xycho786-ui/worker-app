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
    const { workerId, jobDetails } = body;

    if (!workerId || !jobDetails) {
      return NextResponse.json({ message: 'Worker ID and job details are required' }, { status: 400 });
    }

    const customer = await prisma.user.findUnique({
      where: { email: user.email }
    });

    if (!customer) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        customerId: customer.id,
        workerId: workerId,
        jobDetails: jobDetails,
        status: 'PENDING'
      }
    });

    return NextResponse.json({ message: 'Booking created successfully', booking }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

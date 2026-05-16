import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create some users
  const user1 = await prisma.user.upsert({
    where: { email: 'alex@example.com' },
    update: {},
    create: {
      email: 'alex@example.com',
      name: 'Alex Johnson',
      role: Role.WORKER,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'michael@example.com' },
    update: {},
    create: {
      email: 'michael@example.com',
      name: 'Michael Brown',
      role: Role.WORKER,
    },
  });

  // Create Locations first to avoid nested relation issues
  const loc1 = await prisma.location.create({
    data: {
      lat: 40.7128,
      lng: -74.0060,
      address: 'Downtown, Metropolis',
    }
  });

  const loc2 = await prisma.location.create({
    data: {
      lat: 40.7306,
      lng: -73.9352,
      address: 'City Center, Metropolis',
    }
  });

  // Create Worker Profiles
  await prisma.workerProfile.upsert({
    where: { userId: user1.id },
    update: {
      locationId: loc1.id,
    },
    create: {
      userId: user1.id,
      skills: ['Electrician', 'Residential'],
      experience: 10,
      hourlyRate: 45,
      isOnline: true,
      locationId: loc1.id,
    },
  });

  await prisma.workerProfile.upsert({
    where: { userId: user2.id },
    update: {
      locationId: loc2.id,
    },
    create: {
      userId: user2.id,
      skills: ['Plumber', 'Commercial'],
      experience: 8,
      hourlyRate: 55,
      isOnline: false,
      locationId: loc2.id,
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

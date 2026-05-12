import { prisma } from './prisma';

export async function getWorkers() {
  try {
    const workers = await prisma.workerProfile.findMany({
      include: {
        user: true,
        location: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return workers;
  } catch (error) {
    console.error('Error fetching workers:', error);
    return [];
  }
}

export async function getWorkerById(id: string) {
  try {
    const worker = await prisma.workerProfile.findUnique({
      where: { id },
      include: {
        user: true,
        location: true,
        reviews: {
          include: {
            reviewer: true,
          },
        },
      },
    });
    return worker;
  } catch (error) {
    console.error('Error fetching worker:', error);
    return null;
  }
}

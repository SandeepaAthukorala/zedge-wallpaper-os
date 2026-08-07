import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalWallpapers = await prisma.wallpaper.count();
    const pendingUpscale = await prisma.wallpaper.count({
      where: { status: 'Pending' }
    });
    
    // Calculate published this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const publishedThisMonth = await prisma.wallpaper.count({
      where: {
        status: 'Published',
        updatedAt: { gte: startOfMonth }
      }
    });

    const activeBatches = await prisma.batch.findMany({
      where: { status: { in: ['Planned', 'In Progress'] } },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    return NextResponse.json({
      totalWallpapers,
      pendingUpscale,
      publishedThisMonth,
      activeBatches
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}

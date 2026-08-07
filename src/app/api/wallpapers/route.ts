import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get('batchId');

    const where = batchId ? { batchId } : {};

    const wallpapers = await prisma.wallpaper.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        batch: {
          select: { month: true, year: true, theme: true }
        }
      }
    });
    return NextResponse.json(wallpapers);
  } catch (error) {
    console.error('Error fetching wallpapers:', error);
    return NextResponse.json({ error: 'Failed to fetch wallpapers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const wallpaper = await prisma.wallpaper.create({
      data: {
        batchId: data.batchId,
        title: data.title,
        prompt: data.prompt,
        description: data.description,
        tags: data.tags,
        category: data.category,
        targetProfile: data.targetProfile,
        targetRevenue: data.targetRevenue || 'Ad Plays',
        status: data.status || 'Pending',
      }
    });
    return NextResponse.json(wallpaper, { status: 201 });
  } catch (error) {
    console.error('Error creating wallpaper:', error);
    return NextResponse.json({ error: 'Failed to create wallpaper' }, { status: 500 });
  }
}

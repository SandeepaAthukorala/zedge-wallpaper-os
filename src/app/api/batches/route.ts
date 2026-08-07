import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const batches = await prisma.batch.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { wallpapers: true }
        }
      }
    });
    return NextResponse.json(batches);
  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json({ error: 'Failed to fetch batches' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const batch = await prisma.batch.create({
      data: {
        month: data.month,
        year: parseInt(data.year),
        theme: data.theme,
        targetAudience: data.targetAudience,
        category: data.category,
        promptStrategy: data.promptStrategy,
        priority: data.priority || 'Medium',
        competitionEstimate: data.competitionEstimate,
        trendScore: data.trendScore ? parseInt(data.trendScore) : null,
        revenueEstimate: data.revenueEstimate,
        status: data.status || 'Planned',
      }
    });
    return NextResponse.json(batch, { status: 201 });
  } catch (error) {
    console.error('Error creating batch:', error);
    return NextResponse.json({ error: 'Failed to create batch' }, { status: 500 });
  }
}

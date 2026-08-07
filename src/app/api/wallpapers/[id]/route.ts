import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const wallpaper = await prisma.wallpaper.findUnique({
      where: { id },
      include: {
        batch: {
          select: { month: true, year: true, theme: true }
        }
      }
    });
    
    if (!wallpaper) {
      return NextResponse.json({ error: 'Wallpaper not found' }, { status: 404 });
    }
    
    return NextResponse.json(wallpaper);
  } catch (error) {
    console.error('Error fetching wallpaper:', error);
    return NextResponse.json({ error: 'Failed to fetch wallpaper' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const wallpaper = await prisma.wallpaper.update({
      where: { id },
      data
    });
    return NextResponse.json(wallpaper);
  } catch (error) {
    console.error('Error updating wallpaper:', error);
    return NextResponse.json({ error: 'Failed to update wallpaper' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.wallpaper.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting wallpaper:', error);
    return NextResponse.json({ error: 'Failed to delete wallpaper' }, { status: 500 });
  }
}

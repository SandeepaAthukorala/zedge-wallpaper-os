import { prisma } from '@/lib/prisma';
import WallpaperProcessor from './WallpaperProcessor';

export default async function WallpaperDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const wallpaper = await prisma.wallpaper.findUnique({
    where: { id },
    include: {
      batch: true
    }
  });

  const profiles = await prisma.profile.findMany();
  const categories = await prisma.category.findMany();

  if (!wallpaper) {
    return <div className="p-8 text-white">Wallpaper not found.</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <WallpaperProcessor 
        wallpaper={wallpaper} 
        profiles={profiles} 
        categories={categories} 
      />
    </div>
  );
}

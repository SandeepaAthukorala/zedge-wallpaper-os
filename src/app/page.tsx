import { prisma } from '@/lib/prisma';
import Link from 'next/link';

const SEASONAL_OPPORTUNITIES = [
  { name: "New Year", date: "Jan 1", prep: "Dec 1", month: 0, day: 1 },
  { name: "Valentine's Day", date: "Feb 14", prep: "Jan 15", month: 1, day: 14 },
  { name: "Spring", date: "Mar 20", prep: "Feb 15", month: 2, day: 20 },
  { name: "Easter", date: "April", prep: "Mar 15", month: 3, day: 15 },
  { name: "Summer", date: "Jun 21", prep: "May 15", month: 5, day: 21 },
  { name: "Independence Day", date: "Jul 4", prep: "Jun 1", month: 6, day: 4 },
  { name: "Back to School", date: "August", prep: "Jul 15", month: 7, day: 15 },
  { name: "Autumn / Fall", date: "Sep 22", prep: "Aug 15", month: 8, day: 22 },
  { name: "Halloween", date: "Oct 31", prep: "Sep 15", month: 9, day: 31 },
  { name: "Winter", date: "Dec 21", prep: "Nov 15", month: 11, day: 21 },
  { name: "Christmas", date: "Dec 25", prep: "Nov 10", month: 11, day: 25 },
];

export default async function Dashboard() {
  const totalWallpapers = await prisma.wallpaper.count();
  const pendingUpscale = await prisma.wallpaper.count({
    where: { status: 'Pending' }
  });
  
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  
  const publishedThisMonth = await prisma.wallpaper.count({
    where: {
      status: 'Published',
      updatedAt: { gte: startOfMonth }
    }
  });

  const activeBatches: any[] = await prisma.batch.findMany({
    where: { status: { in: ['Planned', 'In Progress'] } },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  // Calculate upcoming opportunities
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  let upcomingOpps = SEASONAL_OPPORTUNITIES.filter(
    opp => opp.month > currentMonth || (opp.month === currentMonth && opp.day >= currentDay)
  );

  // If near the end of the year, wrap around to the next year
  if (upcomingOpps.length < 5) {
    upcomingOpps = [...upcomingOpps, ...SEASONAL_OPPORTUNITIES].slice(0, 5);
  } else {
    upcomingOpps = upcomingOpps.slice(0, 5);
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Welcome back. Here is the overview of your publishing operations.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-zinc-400 text-sm font-medium">Total Wallpapers</h3>
          <p className="text-3xl font-bold text-white mt-2">{totalWallpapers}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-zinc-400 text-sm font-medium">Pending Upscale</h3>
          <p className="text-3xl font-bold text-white mt-2">{pendingUpscale}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-zinc-400 text-sm font-medium">Published this Month</h3>
          <p className="text-3xl font-bold text-white mt-2">{publishedThisMonth}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Active Batches</h2>
          <div className="space-y-4">
            {activeBatches.length === 0 ? (
              <div className="text-zinc-400 text-sm">No active batches. Create one to get started.</div>
            ) : (
              activeBatches.map((batch: any) => (
                <Link key={batch.id} href={`/batches/${batch.id}`} className="block border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-medium">{batch.theme} ({batch.month} {batch.year})</h4>
                      <p className="text-zinc-500 text-sm mt-1">{batch.category}</p>
                    </div>
                    <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full">{batch.status}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Upcoming Seasonal Opportunities</h2>
          <ul className="space-y-4 text-sm">
            {upcomingOpps.map((opp, idx) => (
              <li key={idx} className={`flex justify-between ${idx !== upcomingOpps.length - 1 ? 'border-b border-zinc-800 pb-3' : 'pb-3'}`}>
                <span className="text-zinc-300">{opp.name} ({opp.date})</span>
                <span className="text-blue-400 font-medium">Prep by {opp.prep}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-zinc-900 border border-purple-900/50 rounded-xl p-6 mt-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              AI Engine Setup
            </h2>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
              To enable local GPU 4K upscaling, you need to manually download the Real-ESRGAN engine. 
              <br/><br/>
              1. Download the <a href="https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-windows.zip" className="text-purple-400 hover:underline" target="_blank" rel="noreferrer">Windows Portable ZIP from GitHub</a>.<br/>
              2. Extract the ZIP file.<br/>
              3. Create a folder in your project root at <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-300">bin/realesrgan/</code>.<br/>
              4. Copy <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-300">realesrgan-ncnn-vulkan.exe</code> (and its required files) into that new folder.
            </p>
          </div>
          <a href="https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-windows.zip" target="_blank" rel="noreferrer" className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-lg whitespace-nowrap">
            Download Engine
          </a>
        </div>
      </div>
    </div>
  );
}

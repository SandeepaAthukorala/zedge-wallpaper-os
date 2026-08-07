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
        <Link href="/batches/new" className="bg-white text-black px-4 py-2 rounded-md font-medium text-sm hover:bg-zinc-200 transition-colors">
          + New Batch
        </Link>
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
    </div>
  );
}

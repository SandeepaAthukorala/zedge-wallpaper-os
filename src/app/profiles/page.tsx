import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function ProfilesPage() {
  const profiles: any[] = await prisma.profile.findMany();
  const categories: any[] = await prisma.category.findMany();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Profiles & Tags</h1>
          <p className="text-zinc-400 mt-1">Manage your target profiles, niches, and categories.</p>
        </div>
      </header>

      {/* Account Overview Widget */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-8">
        <div className="p-6 border-b border-zinc-800 bg-zinc-950 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">Zedge Account Executive Summary</h2>
            <p className="text-zinc-500 text-sm mt-1">Data Period: 2025/01/01 – 2026/08/31</p>
          </div>
          <div className="text-right">
            <span className="text-xs bg-emerald-900/40 text-emerald-400 border border-emerald-800/50 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">Growth Strategy: $1,000/mo</span>
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-5 gap-6 divide-x divide-zinc-800">
          <div className="px-4 first:pl-0">
            <h3 className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Net Revenue</h3>
            <p className="text-2xl font-bold text-white">$180.24</p>
          </div>
          <div className="px-4">
            <h3 className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Total Unlocks</h3>
            <p className="text-2xl font-bold text-white">10.4k</p>
          </div>
          <div className="px-4">
            <h3 className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Total Users</h3>
            <p className="text-2xl font-bold text-white">10.3k</p>
          </div>
          <div className="px-4">
            <h3 className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Ad Plays (Rev)</h3>
            <p className="text-2xl font-bold text-blue-400">86.2%</p>
          </div>
          <div className="px-4">
            <h3 className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Top Geo</h3>
            <p className="text-2xl font-bold text-white">USA <span className="text-sm font-normal text-zinc-500">(54.7%)</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profiles Section */}
        <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
            <h2 className="text-xl font-semibold text-white">Target Profiles</h2>
            <button className="bg-white text-black px-3 py-1 rounded text-sm font-medium hover:bg-zinc-200 transition-colors">
              + Add Profile
            </button>
          </div>
          <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
            {profiles.length === 0 ? (
              <p className="text-zinc-500 text-sm">No profiles created yet.</p>
            ) : (
              profiles.map((profile) => (
                <div key={profile.id} className="border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors bg-zinc-950/50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-white flex items-center gap-2">
                        {profile.name}
                        {profile.status.includes('Planned') ? (
                           <span className="text-[10px] bg-blue-900/40 text-blue-400 border border-blue-800/50 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">{profile.status}</span>
                        ) : profile.status.includes('Top Performer') ? (
                           <span className="text-[10px] bg-amber-900/40 text-amber-400 border border-amber-800/50 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">Top Performer</span>
                        ) : (
                           <span className="text-[10px] bg-emerald-900/40 text-emerald-400 border border-emerald-800/50 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">Active</span>
                        )}
                      </h3>
                      <p className="text-zinc-400 text-sm mt-1">{profile.description}</p>
                    </div>
                    {profile.revenue > 0 && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">${profile.revenue.toFixed(2)}</div>
                        <div className="text-xs text-zinc-500">{profile.share}% of total</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Default Tags</span>
                    <div className="flex flex-wrap gap-2">
                      {profile.tags?.split(',').map((tag: string, i: number) => (
                        <span key={i} className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-xs">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden h-fit">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
            <h2 className="text-xl font-semibold text-white">Zedge Categories</h2>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
          <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
            {categories.length === 0 ? (
              <p className="text-zinc-500 text-sm">No categories available.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <span key={cat.id} className="border border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-full text-sm bg-zinc-800/50">
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

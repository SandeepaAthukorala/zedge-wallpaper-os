export default function Dashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Welcome back. Here is the overview of your publishing operations.</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-md font-medium text-sm hover:bg-zinc-200 transition-colors">
          + New Batch
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-zinc-400 text-sm font-medium">Total Wallpapers</h3>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-zinc-400 text-sm font-medium">Pending Upscale</h3>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-zinc-400 text-sm font-medium">Published this Month</h3>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Active Batches */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Active Batches</h2>
          <div className="space-y-4">
            <div className="text-zinc-400 text-sm">No active batches. Create one to get started.</div>
          </div>
        </div>

        {/* Seasonal Opportunities */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Seasonal Opportunities</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-300">Halloween (Oct 31)</span>
              <span className="text-orange-400 font-medium">Prep by Sep 15</span>
            </li>
            <li className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-300">Autumn / Fall</span>
              <span className="text-yellow-500 font-medium">Prep by Aug 20</span>
            </li>
            <li className="flex justify-between pb-3">
              <span className="text-zinc-300">Christmas (Dec 25)</span>
              <span className="text-red-400 font-medium">Prep by Nov 10</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

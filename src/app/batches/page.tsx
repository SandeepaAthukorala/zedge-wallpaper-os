export default function BatchesPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Batch Manager</h1>
          <p className="text-zinc-400 mt-1">Plan and organize your monthly wallpaper releases.</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-md font-medium text-sm hover:bg-zinc-200 transition-colors">
          + Generate New Batch
        </button>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Month</th>
              <th className="px-6 py-4 font-medium">Theme</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Priority</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {/* Placeholder rows */}
            <tr className="hover:bg-zinc-800/50 transition-colors">
              <td className="px-6 py-4">October 2026</td>
              <td className="px-6 py-4">Halloween / Horror</td>
              <td className="px-6 py-4">Dark Fantasy</td>
              <td className="px-6 py-4"><span className="text-red-400">High</span></td>
              <td className="px-6 py-4"><span className="px-2 py-1 bg-zinc-800 rounded-md text-xs">Planned</span></td>
              <td className="px-6 py-4 text-zinc-400 hover:text-white cursor-pointer">Open Workflow &rarr;</td>
            </tr>
            <tr className="hover:bg-zinc-800/50 transition-colors">
              <td className="px-6 py-4">November 2026</td>
              <td className="px-6 py-4">Cozy Autumn</td>
              <td className="px-6 py-4">Nature</td>
              <td className="px-6 py-4"><span className="text-yellow-400">Medium</span></td>
              <td className="px-6 py-4"><span className="px-2 py-1 bg-zinc-800 rounded-md text-xs">Planned</span></td>
              <td className="px-6 py-4 text-zinc-400 hover:text-white cursor-pointer">Open Workflow &rarr;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

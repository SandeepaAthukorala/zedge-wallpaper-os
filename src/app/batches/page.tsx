import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function BatchesPage() {
  const batches: any[] = await prisma.batch.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { wallpapers: true }
      }
    }
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Batch Manager</h1>
          <p className="text-zinc-400 mt-1">Manage your monthly publishing batches.</p>
        </div>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">Batch Name</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Priority</th>
              <th className="px-6 py-4 font-medium">Wallpapers</th>
              <th className="px-6 py-4 font-medium">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-zinc-300">
            {batches.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">
                  No batches created yet.
                </td>
              </tr>
            ) : (
              batches.map((batch: any) => (
                <tr key={batch.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/batches/${batch.id}`} className="text-white font-medium hover:underline">
                      {batch.theme} ({batch.month} {batch.year})
                    </Link>
                  </td>
                  <td className="px-6 py-4">{batch.category}</td>
                  <td className="px-6 py-4">
                    <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full text-xs">
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{batch.priority}</td>
                  <td className="px-6 py-4">{batch._count?.wallpapers || 0}</td>
                  <td className="px-6 py-4">{new Date(batch.createdAt || Date.now()).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

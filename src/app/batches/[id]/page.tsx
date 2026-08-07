import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function BatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const batch = await prisma.batch.findUnique({
    where: { id },
    include: {
      wallpapers: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!batch) {
    return <div className="p-8 text-white">Batch not found.</div>;
  }

  // Type coercions to fix any typescript issues with the mock schema
  const batchData: any = batch;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <Link href="/batches" className="text-zinc-500 hover:text-white text-sm mb-2 inline-block">← Back to Batches</Link>
          <h1 className="text-3xl font-bold tracking-tight text-white">{batchData.theme} ({batchData.month} {batchData.year})</h1>
          <p className="text-zinc-400 mt-1">Category: {batchData.category} | Status: {batchData.status} | Priority: {batchData.priority}</p>
        </div>
        <Link href={`/wallpapers/new?batchId=${batchData.id}`} className="bg-white text-black px-4 py-2 rounded-md font-medium text-sm hover:bg-zinc-200 transition-colors">
          + Add Wallpaper
        </Link>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">Title / Theme</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Profile</th>
              <th className="px-6 py-4 font-medium">Revenue Model</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-zinc-300">
            {batchData.wallpapers?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                  No wallpapers in this batch.
                </td>
              </tr>
            ) : (
              batchData.wallpapers?.map((wp: any) => (
                <tr key={wp.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{wp.title || 'Untitled'}</td>
                  <td className="px-6 py-4">
                    <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full text-xs">
                      {wp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{wp.targetProfile || 'Unassigned'}</td>
                  <td className="px-6 py-4">{wp.targetRevenue}</td>
                  <td className="px-6 py-4">
                    <Link href={`/wallpapers/${wp.id}`} className="text-blue-400 hover:underline">
                      Process
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

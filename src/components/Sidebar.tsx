import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 text-zinc-300 flex flex-col h-screen">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-xl font-semibold text-white tracking-tight">Zedge OS</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/" className="block px-3 py-2 rounded-md hover:bg-zinc-800 hover:text-white transition-colors">
          Dashboard
        </Link>
        <Link href="/batches" className="block px-3 py-2 rounded-md hover:bg-zinc-800 hover:text-white transition-colors">
          Batch Manager
        </Link>
        <Link href="/wallpapers" className="block px-3 py-2 rounded-md hover:bg-zinc-800 hover:text-white transition-colors">
          Wallpapers
        </Link>
        <Link href="/profiles" className="block px-3 py-2 rounded-md hover:bg-zinc-800 hover:text-white transition-colors">
          Profiles & Tags
        </Link>
      </nav>
      
      <div className="p-4 border-t border-zinc-800 text-sm text-zinc-500">
        <p>SANDA Publishing</p>
      </div>
    </div>
  );
}

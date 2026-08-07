'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function NewWallpaperForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const batchId = searchParams.get('batchId');

  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/wallpapers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, prompt, batchId })
      });
      const data = await res.json();
      if (data.id) {
        router.push(`/wallpapers/${data.id}`);
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">Title (Optional)</label>
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-3 text-white focus:outline-none focus:border-zinc-600"
          placeholder="e.g. Neon Cyberpunk City"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">AI Prompt</label>
        <textarea 
          value={prompt} 
          onChange={e => setPrompt(e.target.value)} 
          className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-3 text-white focus:outline-none focus:border-zinc-600 min-h-[150px]"
          placeholder="A futuristic cyberpunk city with neon signage, rainy streets, cinematic lighting --ar 9:16 --v 6.1"
        />
      </div>
      <button type="submit" disabled={saving} className="bg-white text-black px-4 py-2 rounded-md font-medium">
        {saving ? 'Creating...' : 'Create Wallpaper'}
      </button>
    </form>
  );
}

export default function NewWallpaperPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white">Add New Wallpaper</h1>
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <NewWallpaperForm />
      </Suspense>
    </div>
  );
}

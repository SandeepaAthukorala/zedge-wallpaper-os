'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBatchPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  
  const [data, setData] = useState({
    month: 'October',
    year: new Date().getFullYear(),
    theme: '',
    category: '',
    priority: 'Medium',
    targetAudience: '',
    promptStrategy: '',
    competitionEstimate: 'Low',
    revenueEstimate: ''
  });

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(setCategories);
  }, []);

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const batch = await res.json();
      if (batch.id) {
        router.push(`/batches/${batch.id}`);
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white">Create New Batch</h1>
      
      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Month</label>
            <select name="month" value={data.month} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-3 text-white focus:outline-none focus:border-zinc-600">
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Year</label>
            <input type="number" name="year" value={data.year} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-3 text-white focus:outline-none focus:border-zinc-600" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Theme / Name</label>
          <input required type="text" name="theme" value={data.theme} onChange={handleChange} placeholder="e.g. AMOLED Halloween" className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-3 text-white focus:outline-none focus:border-zinc-600" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
            <select required name="category" value={data.category} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-3 text-white focus:outline-none focus:border-zinc-600">
              <option value="">Select Category...</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Priority</label>
            <select name="priority" value={data.priority} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-3 text-white focus:outline-none focus:border-zinc-600">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={saving} className="bg-white text-black px-4 py-2 rounded-md font-medium">
          {saving ? 'Creating...' : 'Create Batch'}
        </button>
      </form>
    </div>
  );
}

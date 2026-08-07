'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WallpaperProcessor({ wallpaper, profiles, categories }: any) {
  const [savedData, setSavedData] = useState({
    title: wallpaper.title || '',
    prompt: wallpaper.prompt || '',
    description: wallpaper.description || '',
    tags: wallpaper.tags || '',
    category: wallpaper.category || '',
    targetProfile: wallpaper.targetProfile || '',
    targetRevenue: wallpaper.targetRevenue || 'Ad Plays',
    originalImage: wallpaper.originalImage || null,
    upscaledImage: wallpaper.upscaledImage || null,
    status: wallpaper.status || 'Pending'
  });

  const [data, setData] = useState(savedData);

  const hasChanges = JSON.stringify(data) !== JSON.stringify(savedData);

  const [saving, setSaving] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(wallpaper.originalImage || null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(wallpaper.upscaledImage || null);
  const [upscaling, setUpscaling] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/wallpapers/${wallpaper.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setSavedData(data);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      // Optimistic preview
      const previewUrl = URL.createObjectURL(file);
      setOriginalImage(previewUrl);
      setUpscaledImage(null);

      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const json = await res.json();
        if (json.url) {
          setOriginalImage(json.url);
          setData(prev => ({ ...prev, originalImage: json.url, upscaledImage: null }));
        }
      } catch (err) {
        console.error('Upload failed', err);
        alert('Upload failed');
      }
      setUploading(false);
    }
  };

  const handleUpscaledUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const previewUrl = URL.createObjectURL(file);
      setUpscaledImage(previewUrl);

      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const json = await res.json();
        if (json.url) {
          setUpscaledImage(json.url);
          setData(prev => ({ ...prev, upscaledImage: json.url, status: 'Upscaled' }));
        }
      } catch (err) {
        console.error('Upload failed', err);
        alert('Upload failed');
      }
      setUploading(false);
    }
  };

  const generateSEO = () => {
    // Basic local SEO generation logic
    const baseKeywords = data.prompt ? data.prompt.split(',').map((k: string) => k.trim()).slice(0, 5) : [];
    const profileData = profiles.find((p: any) => p.name === data.targetProfile);
    
    let title = baseKeywords.length > 0 
      ? `${baseKeywords[0].charAt(0).toUpperCase() + baseKeywords[0].slice(1)} Wallpaper 4K` 
      : 'Premium 4K Wallpaper';
    
    let description = `Download this stunning high-quality ${title.toLowerCase()} for your mobile device. Perfect for AMOLED screens. Discover more premium backgrounds on Zedge.`;
    
    let tagsList = [...baseKeywords, 'wallpaper', '4k', 'background', 'aesthetic'];
    if (profileData && profileData.tags) {
      tagsList = [...tagsList, ...profileData.tags.split(',').map((t: string) => t.trim())];
    }
    const tags = Array.from(new Set(tagsList)).join(', ');

    setData(prev => ({ ...prev, title, description, tags }));
  };

  const handleCopyAIPrompt = () => {
    const aiPrompt = `You are an elite SEO expert and Midjourney prompt engineer for Zedge wallpapers.
I have a baseline wallpaper concept. I need you to enhance it to an "Ultimate Masterpiece" level.
Here is the current data:
Title: ${data.title}
Prompt: ${data.prompt}
Description: ${data.description}
Tags: ${data.tags}
Target Profile: ${data.targetProfile}

Instructions:
1. Make the Midjourney prompt incredibly detailed, cinematic, and breathtaking. Keep --ar 9:16 and --v 6.1.
2. Optimize the SEO Title to be highly clickable.
3. Rewrite the SEO Description to be engaging and keyword-rich.
4. Expand the Tags to a maximum of 10 highly optimized long-tail and aesthetic keywords. IMPORTANT: Replace any spaces in tags with underscores (e.g., 'dark fantasy' becomes 'dark_fantasy') and separate them with commas.

OUTPUT EXACTLY AND ONLY THIS RAW JSON FORMAT. DO NOT ADD MARKDOWN CODE BLOCKS:
{
  "title": "enhanced title",
  "prompt": "enhanced prompt",
  "description": "enhanced description",
  "tags": "tag1, tag_2, tag_3"
}`;
    navigator.clipboard.writeText(aiPrompt);
    alert('AI enhancement prompt copied! Paste it into Gemini or ChatGPT.');
  };

  const handlePasteJSON = (e: any) => {
    const val = e.target.value;
    if (!val) return;
    try {
      // Find the JSON block in case the LLM wrapped it in markdown
      const jsonStr = val.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      if (parsed.title || parsed.prompt) {
        setData(prev => ({
          ...prev,
          title: parsed.title || prev.title,
          prompt: parsed.prompt || prev.prompt,
          description: parsed.description || prev.description,
          tags: parsed.tags || prev.tags
        }));
        e.target.value = ''; // clear textarea on success
        alert('Data successfully enhanced!');
      }
    } catch (err) {
      // Not a valid JSON or still typing, do nothing
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end mb-6">
        <div>
          <Link href={wallpaper.batchId ? `/batches/${wallpaper.batchId}` : '/wallpapers'} className="text-zinc-500 hover:text-white text-sm mb-2 inline-block">← Back</Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">Process Wallpaper</h1>
        </div>
        <div className="space-x-3 flex items-center">
          {hasChanges && <span className="text-amber-500 text-sm font-medium mr-2">Unsaved changes</span>}
          <button 
            onClick={handleSave} 
            disabled={!hasChanges || saving}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              hasChanges 
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_15px_rgba(217,119,6,0.3)]' 
                : 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
            }`}
          >
            {saving ? 'Saving...' : (hasChanges ? 'Save Changes' : 'Saved')}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Metadata</h2>
              <button onClick={generateSEO} className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded hover:bg-zinc-700">
                Auto-Generate SEO
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">AI Prompt</label>
              <div className="flex gap-2">
                <textarea 
                  name="prompt" 
                  value={data.prompt} 
                  onChange={handleChange} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-sm text-white focus:outline-none focus:border-zinc-600 min-h-[100px]"
                />
                <button onClick={() => handleCopy(data.prompt)} className="bg-zinc-800 px-3 rounded-md hover:bg-zinc-700 text-zinc-400">Copy</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">SEO Title</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="title" 
                  value={data.title} 
                  onChange={handleChange} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-sm text-white focus:outline-none focus:border-zinc-600"
                />
                <button onClick={() => handleCopy(data.title)} className="bg-zinc-800 px-3 rounded-md hover:bg-zinc-700 text-zinc-400">Copy</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">SEO Description</label>
              <div className="flex gap-2">
                <textarea 
                  name="description" 
                  value={data.description} 
                  onChange={handleChange} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-sm text-white focus:outline-none focus:border-zinc-600 min-h-[100px]"
                />
                <button onClick={() => handleCopy(data.description)} className="bg-zinc-800 px-3 rounded-md hover:bg-zinc-700 text-zinc-400">Copy</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">SEO Tags (comma separated)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="tags" 
                  value={data.tags} 
                  onChange={handleChange} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-sm text-white focus:outline-none focus:border-zinc-600"
                />
                <button onClick={() => handleCopy(data.tags)} className="bg-zinc-800 px-3 rounded-md hover:bg-zinc-700 text-zinc-400">Copy</button>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Original Generation</label>
                {originalImage ? (
                  <div className="relative h-80 bg-zinc-950 border border-zinc-800 rounded-md overflow-hidden">
                    <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <a href={originalImage} download={`original-${wallpaper.id}.png`} className="bg-zinc-800/90 text-white text-xs px-2 py-1 rounded hover:bg-zinc-700 shadow-sm border border-zinc-700">Download</a>
                      <button onClick={() => { setOriginalImage(null); setUpscaledImage(null); setData(prev => ({ ...prev, originalImage: null, upscaledImage: null })); }} className="bg-red-600/90 text-white text-xs px-2 py-1 rounded hover:bg-red-500 shadow-sm">Remove</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-80 border-2 border-zinc-800 border-dashed rounded-md bg-zinc-950 hover:bg-zinc-900 transition-colors">
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <div className="flex flex-col items-center justify-center text-zinc-400 text-sm">
                        <svg className="w-8 h-8 mb-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        <span>{uploading ? 'Uploading...' : 'Click to upload generation'}</span>
                        <span className="text-xs text-zinc-500 mt-1">PNG, JPG up to 20MB</span>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Upscaled Result</label>
                {upscaledImage ? (
                  <div className="relative h-80 bg-zinc-950 border border-zinc-800 rounded-md overflow-hidden ring-2 ring-blue-500">
                    <img src={upscaledImage} alt="Upscaled" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium shadow-lg">4K Upscaled</div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <a href={upscaledImage} download={`upscaled-${wallpaper.id}.png`} className="bg-zinc-800/90 text-white text-xs px-2 py-1 rounded hover:bg-zinc-700 shadow-sm border border-zinc-700">Download</a>
                      <button onClick={() => { setUpscaledImage(null); setData(prev => ({ ...prev, upscaledImage: null })); }} className="bg-red-600/90 text-white text-xs px-2 py-1 rounded hover:bg-red-500 shadow-sm">Remove</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-80 border-2 border-zinc-800 border-dashed rounded-md bg-zinc-950 hover:bg-zinc-900 transition-colors">
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <div className="flex flex-col items-center justify-center text-zinc-400 text-sm">
                        <svg className="w-8 h-8 mb-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        <span>{uploading ? 'Uploading...' : 'Upload 4K Upscaled Result'}</span>
                        <span className="text-xs text-zinc-500 mt-1">PNG, JPG up to 20MB</span>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleUpscaledUpload} />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">Publishing Target</h2>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Profile</label>
              <select name="targetProfile" value={data.targetProfile} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-sm text-white focus:outline-none">
                <option value="">Select Profile...</option>
                {profiles.map((p: any) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
              <select name="status" value={data.status} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-sm text-white focus:outline-none">
                <option value="Pending">Pending</option>
                <option value="Upscaled">Upscaled</option>
                <option value="Published">Published</option>
              </select>
            </div>
            
          </div>

          <div className="bg-zinc-900 border border-purple-900/50 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              AI Enhancement
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Generate an ultimate prompt to paste into Gemini/ChatGPT to massively enhance this wallpaper's metadata and prompt.
            </p>
            
            <button onClick={handleCopyAIPrompt} className="w-full bg-purple-600/20 text-purple-400 border border-purple-500/30 px-4 py-2 rounded-md font-medium text-sm hover:bg-purple-600/30 transition-colors">
              Copy Enhancement Prompt
            </button>

            <div className="pt-2">
              <label className="block text-sm font-medium text-zinc-400 mb-2">Paste LLM JSON Output</label>
              <textarea 
                placeholder='{ "title": "...", "prompt": "..." }'
                onChange={handlePasteJSON}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-sm text-white focus:outline-none focus:border-purple-500/50 min-h-[120px] font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

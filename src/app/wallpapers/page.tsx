export default function WallpapersPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Wallpapers Workflow</h1>
          <p className="text-zinc-400 mt-1">Manage, optimize, and publish your wallpapers.</p>
        </div>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Search prompt, title, tags..." 
            className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-md focus:outline-none focus:border-zinc-500 w-64"
          />
          <button className="bg-white text-black px-4 py-2 rounded-md font-medium text-sm hover:bg-zinc-200 transition-colors">
            + Add Wallpaper
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar / List */}
        <div className="col-span-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden h-[70vh] flex flex-col">
          <div className="p-4 border-b border-zinc-800 font-medium text-zinc-300">
            Queue (October Batch)
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Example item */}
            <div className="bg-zinc-800 p-3 rounded-lg cursor-pointer border border-zinc-700">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-white truncate">Ethereal Moonlit Oni</span>
                <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1 flex-shrink-0"></span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 truncate">Dark Fantasy • Freaky SANDA</p>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-[70vh] overflow-y-auto">
          <h2 className="text-xl font-semibold text-white mb-6">Editor</h2>
          
          <div className="space-y-6">
            {/* Image Dropzone */}
            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-10 flex flex-col items-center justify-center text-zinc-500 hover:border-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer bg-zinc-950">
              <svg className="w-8 h-8 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p>Drag and drop the generated image here</p>
            </div>

            {/* Prompt */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Midjourney / SD Prompt</label>
              <div className="flex gap-2">
                <textarea 
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md p-3 text-white text-sm focus:outline-none focus:border-zinc-500 resize-none h-24"
                  defaultValue="A hyper-realistic dark fantasy oni demon samurai standing in an ethereal moonlit bamboo forest, glowing red eyes, dense fog, highly detailed, 8k resolution, photorealistic --ar 9:16 --v 6.0"
                ></textarea>
                <button className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-700 self-start">Copy</button>
              </div>
            </div>

            <hr className="border-zinc-800" />

            {/* SEO Metadata */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">SEO Title</label>
                <div className="flex gap-2">
                  <input type="text" defaultValue="Dark Demon Oni Wallpaper 4K" className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-white text-sm focus:outline-none focus:border-zinc-500" />
                  <button className="bg-zinc-800 text-white px-3 py-1 rounded-md hover:bg-zinc-700 text-xs">Copy</button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Target Profile</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-white text-sm focus:outline-none focus:border-zinc-500">
                  <option>Freaky SANDA</option>
                  <option>Golden SANDA</option>
                  <option>SANDA OG</option>
                  <option>Cosmic SANDA</option>
                  <option>Siren SANDA</option>
                  <option>Neon SANDA</option>
                  <option>Minimal SANDA</option>
                  <option>Anime SANDA</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-zinc-400 mb-2">SEO Description</label>
                <div className="flex gap-2">
                  <textarea defaultValue="Download this premium Dark Demon Oni wallpaper for your phone. Perfect for fans of horror and dark fantasy aesthetics. High quality 4K." className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-white text-sm focus:outline-none focus:border-zinc-500 h-20 resize-none"></textarea>
                  <button className="bg-zinc-800 text-white px-3 py-1 rounded-md hover:bg-zinc-700 text-xs self-start">Copy</button>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Tags (Max 10)</label>
                <div className="flex gap-2">
                  <input type="text" defaultValue="dark fantasy, horror, oni demon, samurai, scary, red eyes, 4k, amoled" className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md p-2 text-white text-sm focus:outline-none focus:border-zinc-500" />
                  <button className="bg-zinc-800 text-white px-3 py-1 rounded-md hover:bg-zinc-700 text-xs">Copy</button>
                </div>
              </div>
            </div>

            <hr className="border-zinc-800" />

            {/* Actions */}
            <div className="flex justify-between items-center pt-4">
              <button className="border border-zinc-700 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-zinc-800 transition-colors">
                Run Local Upscaler
              </button>
              <button className="bg-green-600 text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-green-700 transition-colors">
                Mark as Published
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

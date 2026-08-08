'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  X, 
  LayoutDashboard, 
  Layers, 
  Image as ImageIcon, 
  Tags, 
  Cpu,
  Sparkles
} from 'lucide-react';

export default function TutorialModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 mt-4 text-sm font-medium text-purple-400 bg-purple-900/20 rounded-md hover:bg-purple-900/40 transition-colors w-full"
      >
        <BookOpen className="w-4 h-4" />
        භාවිත කිරීමේ අත්පොත (Tutorial)
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div 
            className="w-full max-w-2xl h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
              <div>
                <h2 className="text-2xl font-bold text-white">Zedge OS භාවිත කිරීමේ අත්පොත</h2>
                <p className="text-zinc-400 mt-1">මෙම මෘදුකාංගය භාවිතා කරන ආකාරය පියවරෙන් පියවර ඉගෙන ගනිමු.</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-12">
              
              {/* Step 1: Dashboard */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-purple-400">
                  <div className="p-2 bg-purple-900/30 rounded-lg">
                    <LayoutDashboard className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">1. ඩෑෂ්බෝඩ් (Dashboard)</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  ඩෑෂ්බෝඩ් එක යනු ඔබගේ සමස්ත ක්‍රියාවලියේ සාරාංශය පෙන්වන ප්‍රධාන තිරයයි. මෙහි ඇති කොටස් පහතින් විස්තර කර ඇත:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                  <li><strong className="text-zinc-200">Total Wallpapers:</strong> පද්ධතියේ ඇති මුළු වෝල්පේපර් (Wallpapers) ගණන පෙන්වයි.</li>
                  <li><strong className="text-zinc-200">Pending Upscale:</strong> ගුණාත්මකභාවය (4K) වැඩිකිරීමට (Upscale) පොරොත්තුවෙන් සිටින පින්තූර ගණන.</li>
                  <li><strong className="text-zinc-200">Published this Month:</strong> මේ මාසය තුළ Zedge වෙත පළකළ සම්පූර්ණ පින්තූර ගණන.</li>
                  <li><strong className="text-zinc-200">Active Batches:</strong> දැනට සකසමින් පවතින බැච් (Batches). මෙහි බැච් එකේ තේමාව, මාසය, කාණ්ඩය සහ තත්ත්වය (Status) දිස්වේ. පේළියක් මත ක්ලික් කිරීමෙන් අදාළ බැච් එකට පිවිසිය හැක.</li>
                  <li><strong className="text-zinc-200">Upcoming Seasonal Opportunities:</strong> ඉදිරියේදී එන විශේෂ දින (උදා: Halloween, Christmas) සහ ඒ සඳහා ඔබ පින්තූර සූදානම් කරගත යුතු අවසන් දිනය (Prep by) මෙහි පෙන්වයි.</li>
                  <li><strong className="text-zinc-200">AI Engine Setup:</strong> Upscale කිරීම සඳහා අවශ්‍ය "Real-ESRGAN" මෘදුකාංගය භාගත කරගැනීමට ඇති 'Download Engine' බොත්තම සහ එය සකසන ආකාරය මෙහි ඇත.</li>
                </ul>
              </section>

              {/* Step 2: Batch Manager */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-blue-400">
                  <div className="p-2 bg-blue-900/30 rounded-lg">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">2. බැච් මැනේජර් (Batch Manager)</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  වෝල්පේපර් එකතුවක් (Batch) ස්වයංක්‍රීයව AI හරහා මෙහි නිර්මාණය වේ. මෙම පිටුව මඟින් ඔබගේ සියලුම බැච් කළමනාකරණය කළ හැක. වගුවේ (Table) ඇති තොරතුරු:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                  <li><strong className="text-zinc-200">Batch Name (බැච් නාමය):</strong> බැච් එකේ ප්‍රධාන තේමාව සහ අදාළ මාසය. නම මත ක්ලික් කිරීමෙන් එහි ඇති පින්තූර බලාගත හැක.</li>
                  <li><strong className="text-zinc-200">Category (කාණ්ඩය):</strong> මෙය කුමන වර්ගයේ පින්තූර එකතුවක්ද යන්න (උදා: Mixed, Nature).</li>
                  <li><strong className="text-zinc-200">Status (තත්ත්වය):</strong> බැච් එක දැනට පවතින තත්ත්වය (උදා: Planned - සැලසුම් කර ඇති, In Progress - සකසමින් පවතින).</li>
                  <li><strong className="text-zinc-200">Priority (ප්‍රමුඛතාව):</strong> මෙම බැච් එක කෙතරම් ඉක්මනින් පළකළ යුතුද යන්න (High, Medium, Low).</li>
                  <li><strong className="text-zinc-200">Wallpapers (පින්තූර ගණන):</strong> මෙම බැච් එකට අදාළව නිර්මාණය වී ඇති මුළු පින්තූර ප්‍රමාණය.</li>
                  <li><strong className="text-zinc-200">Created (නිර්මාණය කළ දිනය):</strong> මෙම බැච් එක AI විසින් නිර්මාණය කළ දිනය.</li>
                </ul>
              </section>

              {/* Step 3: Wallpapers */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-green-400">
                  <div className="p-2 bg-green-900/30 rounded-lg">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">3. වෝල්පේපර්ස් (Wallpapers)</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  මෙම පිටුව හරහා පද්ධතියේ ඇති සියලුම තනි වෝල්පේපර්ස් (Individual Wallpapers) පෙන්වයි. වගුවේ ඇති තොරතුරු:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                  <li><strong className="text-zinc-200">Title (මාතෘකාව):</strong> පින්තූරයට ලබා දී ඇති නම.</li>
                  <li><strong className="text-zinc-200">Batch (අදාළ බැච් එක):</strong> මෙම පින්තූරය අයිති කුමන බැච් එකටද යන්න.</li>
                  <li><strong className="text-zinc-200">Status (තත්ත්වය):</strong> පින්තූරය මේ වනවිට කුමන අදියරේද යන්න (උදා: Pending, Upscaled, Published).</li>
                  <li><strong className="text-zinc-200">Profile (ප්‍රොෆයිල් එක):</strong> මෙය පළකරන කර්තෘගේ (Author) නම.</li>
                  <li><strong className="text-zinc-200">Actions (ක්‍රියාමාර්ග):</strong> මෙහි ඇති 'Process' ලින්ක් එක ක්ලික් කිරීමෙන් අදාළ පින්තූරයේ තොරතුරු සංස්කරණය කිරීමට සහ Upscale/Publish කිරීමට අදාළ පිටුවට පිවිසිය හැක.</li>
                </ul>
              </section>

              {/* Step 4: Profiles & Tags */}
              <section className="space-y-4 pb-10">
                <div className="flex items-center gap-3 text-pink-400">
                  <div className="p-2 bg-pink-900/30 rounded-lg">
                    <Tags className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">4. ප්‍රොෆයිල් සහ ටැග් (Profiles & Tags)</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  ඔබගේ Zedge ගිණුමේ ආදායම් විස්තර සහ පළකරන්නන්ගේ (Profiles) තොරතුරු මෙහි අඩංගු වේ:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                  <li><strong className="text-zinc-200">Account Executive Summary:</strong> මෙහි Net Revenue (ශුද්ධ ආදායම), Total Unlocks (පින්තූර ඩවුන්ලෝඩ් කළ ගණන), Total Users (පරිශීලකයින් ගණන), Ad Plays (වීඩියෝ දැන්වීම් මඟින් ආදායම් ලැබූ ප්‍රතිශතය) සහ Top Geo (වැඩිම ආදායමක් ලැබෙන රට) පෙන්වයි.</li>
                  <li><strong className="text-zinc-200">Target Profiles:</strong> ඔබ නිර්මාණය කර ඇති කර්තෘවරුන්ගේ ලැයිස්තුව. මෙහි නම, තත්ත්වය (Active, Planned), ඔවුන් උපයා ඇති මුදල (Revenue), සහ අදාළ Default Tags (ඔවුන්ට අදාළ පොදු ටැග්) දිස්වේ. '+ Add Profile' බොත්තම මඟින් නව කර්තෘවරයෙකු එක් කළ හැක.</li>
                  <li><strong className="text-zinc-200">Zedge Categories:</strong> Zedge හි භාවිතා වන ප්‍රධාන කාණ්ඩ (උදා: Nature, Abstract) මෙහි ලැයිස්තුගත කර ඇත. පින්තූර පළකිරීමේදී මේවා යොදාගැනේ.</li>
                </ul>
              </section>

              {/* Step 5: Process Wallpaper & AI Enhancement */}
              <section className="space-y-4 pb-10">
                <div className="flex items-center gap-3 text-orange-400">
                  <div className="p-2 bg-orange-900/30 rounded-lg">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">5. පින්තූර සැකසීම (Process Wallpaper & AI Enhancement)</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  වෝල්පේපර්ස් පිටුවෙන් 'Process' යන්න ක්ලික් කළ පසු ඔබට මෙම තිරය දිස්වේ. මෙහිදී එක් එක් පින්තූරය Zedge වෙත පළකිරීමට පෙර සම්පූර්ණයෙන්ම සකසා ගත හැක:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                  <li><strong className="text-zinc-200">Metadata (දත්ත සකස් කිරීම):</strong> මෙහි පින්තූරයේ මාතෘකාව (SEO Title), විස්තරය (SEO Description) සහ ටැග් (SEO Tags) අඩංගු වේ. 'Copy' බොත්තම් මඟින් පහසුවෙන් මේවා පිටපත් කළ හැක. 'Auto-Generate SEO' බොත්තම මඟින් මේවා ස්වයංක්‍රීයව පිරවිය හැක.</li>
                  <li><strong className="text-zinc-200">Publishing Target (පළකරන ඉලක්කය):</strong> පින්තූරය පළවිය යුතු කර්තෘ (Profile) සහ පින්තූරයේ දැනට පවතින තත්ත්වය (Status - උදා: Pending) මෙහි තෝරාගත හැක.</li>
                  <li>
                    <strong className="text-zinc-200 text-purple-400">AI Enhancement (AI මඟින් ගුණාත්මකභාවය වැඩිකිරීම):</strong> 
                    මෙය ඉතා වැදගත් විශේෂාංගයකි. පින්තූරයේ SEO දත්ත තවත් දියුණු කිරීම සඳහා 'Copy Enhancement Prompt' බොත්තම ඔබා, එය ChatGPT හෝ Gemini වැනි AI එකකට ලබා දෙන්න. ඉන්පසු එම AI එක ලබාදෙන JSON පිළිතුර ගෙනවිත් 'Paste LLM JSON Output' කොටුවට ඇතුළත් කරන්න. මෙයින් පින්තූරයේ දත්ත ඉතා ඉහළ මට්ටමකට ස්වයංක්‍රීයව සැකසේ.
                  </li>
                  <li><strong className="text-zinc-200">Images (පින්තූර උඩුගත කිරීම):</strong> 'Original Generation' කොටසට මුල් පින්තූරයද, 4K කළ පසු එම විශාල පින්තූරය 'Upscaled Result' කොටසටද උඩුගත කළ හැක. මුල් පින්තූරය උඩුගත කළ විගස එය ස්වයංක්‍රීයව Upscale වීමටද භාජනය විය හැක.</li>
                </ul>
              </section>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

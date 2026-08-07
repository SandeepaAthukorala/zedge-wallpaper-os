const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.join(__dirname, 'src', 'data', 'db.json');
let db = { batches: [], wallpapers: [] };
if (fs.existsSync(dbPath)) {
  db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

const months = [
  { name: 'September', year: 2026, theme: 'Fall & Pre-Halloween' },
  { name: 'October', year: 2026, theme: 'Peak Halloween & Dark Fantasy' },
  { name: 'November', year: 2026, theme: 'Late Autumn, Cozy, Early Winter' },
  { name: 'December', year: 2026, theme: 'Winter, Holidays, Cyberpunk New Year' }
];

const profiles = [
  { name: 'Freaky SANDA', share: 0.48 }, 
  { name: 'Golden SANDA', share: 0.24 }, 
  { name: 'SANDA OG', share: 0.10 },     
  { name: 'Minimal SANDA', share: 0.08 },
  { name: 'Neon SANDA', share: 0.05 },    
  { name: 'Anime SANDA', share: 0.05 }    
];

const vocab = {
  'Freaky SANDA': {
    subjects: ['gothic grim reaper', 'vampire lord', 'eldritch entity', 'plague doctor', 'wendigo', 'fallen angel', 'skeletal knight', 'cursed witch', 'demonic overlord', 'shadow assassin', 'haunted doll', 'blood sorceress'],
    adjectives: ['terrifying', 'sinister', 'macabre', 'blood-soaked', 'shadowy', 'ancient', 'cursed', 'nightmarish', 'gothic', 'eldritch', 'decaying'],
    environments: ['abandoned gothic cathedral', 'foggy graveyard', 'dying wheat field', 'blood moon forest', 'ruined castle', 'dark abyss', 'liminal asylum', 'haunted mansion'],
    lighting: ['volumetric fog', 'cinematic rim lighting', 'blood red glow', 'harsh shadows', 'eerie green luminescence', 'pitch black contrast'],
    styles: ['dark fantasy art', 'Greg Rutkowski style', 'Beksinski surrealism', 'Lovecraftian horror', 'macabre aesthetic', 'octane render, 8k', 'hyper-detailed masterpiece'],
    tags: ['horror', 'dark_fantasy', 'gothic', 'scary', 'spooky', 'creepy', 'nightmare', 'macabre', 'dark_aesthetic', 'demon']
  },
  'Golden SANDA': {
    subjects: ['cozy cabin', 'autumn forest path', 'alpine lake', 'foggy mountain peak', 'rainy coffee shop window', 'glowing fireflies', 'golden retriever in leaves', 'steaming mug of cider', 'rustic fireplace', 'enchanted treehouse'],
    adjectives: ['peaceful', 'cozy', 'warm', 'breathtaking', 'serene', 'golden', 'crisp', 'relaxing', 'enchanting', 'rustic'],
    environments: ['dense pine forest', 'misty morning valley', 'autumn woods', 'lofi cafe', 'rainy street', 'twilight meadow', 'snowy winter lodge', 'sunlit clearing'],
    lighting: ['golden hour sunset', 'soft morning mist', 'warm interior lighting', 'dappled sunlight', 'magical bioluminescence', 'soft twilight'],
    styles: ['national geographic photography', 'cottagecore aesthetic', 'Unreal Engine 5 render', 'environmental concept art', 'lofi chill aesthetic', 'studio ghibli background'],
    tags: ['nature', 'cozy', 'autumn', 'relaxing', 'peaceful', 'warm', 'landscape', 'aesthetic', 'cottagecore', 'forest']
  },
  'SANDA OG': {
    subjects: ['fractal geometry', 'liquid metal', 'abstract fluid dynamics', 'shattered glass', 'floating monoliths', 'iridescent waves', 'crystalline structures'],
    adjectives: ['mesmerizing', 'abstract', 'hyper-detailed', 'surreal', 'geometric', 'fluid', 'prismatic', 'iridescent'],
    environments: ['void of space', 'pure white studio', 'infinite mirror room', 'neon void', 'surreal dreamscape'],
    lighting: ['studio lighting', 'neon reflections', 'caustic light rays', 'chromatic aberration', 'subsurface scattering'],
    styles: ['3d abstract art', 'cinema4d', 'octane render', 'vector art', 'surrealism', 'minimalist geometry'],
    tags: ['abstract', '3d', 'geometric', 'fluid', 'surreal', 'modern', 'aesthetic', 'mesmerizing', 'colorful', 'pattern']
  },
  'Minimal SANDA': {
    subjects: ['solar eclipse', 'single glowing line', 'geometric mountain', 'minimalist moon phase', 'zen circle', 'pure black void with one star', 'origami crane'],
    adjectives: ['clean', 'minimalist', 'sleek', 'pure', 'elegant', 'simple', 'ultra-modern'],
    environments: ['pure black background', 'pitch black void', '#000000 amoled space', 'dark minimal surface'],
    lighting: ['subtle edge light', 'high contrast', 'glowing neon accent', 'soft diffuse light'],
    styles: ['vector art', 'minimalism', 'AMOLED optimized', 'flat design', 'high contrast silhouette'],
    tags: ['minimal', 'amoled', 'black', 'dark', 'clean', 'simple', 'elegant', 'geometric', 'sleek', 'modern']
  },
  'Neon SANDA': {
    subjects: ['cyberpunk street samurai', 'neon sports car', 'futuristic hacker', 'holographic geisha', 'mecha robot', 'cybernetic assassin'],
    adjectives: ['high-tech', 'futuristic', 'cyberpunk', 'neon-lit', 'dystopian', 'synthwave', 'retrowave'],
    environments: ['rainy Tokyo street', 'neon mega-city', 'underground cyberpunk club', 'futuristic alleyway', 'synthwave grid'],
    lighting: ['neon pink and cyan glow', 'wet puddle reflections', 'holographic projections', 'cinematic rain lighting'],
    styles: ['blade runner aesthetic', 'cyberpunk 2077 style', '8k octane render', 'sci-fi concept art', 'synthwave art'],
    tags: ['cyberpunk', 'neon', 'scifi', 'futuristic', 'city', 'rain', 'synthwave', 'tokyo', 'tech', 'glowing']
  },
  'Anime SANDA': {
    subjects: ['lofi anime girl', 'mecha pilot', 'magical school girl', 'samurai under cherry blossoms', 'cat resting on windowsill'],
    adjectives: ['beautiful', 'melancholic', 'kawaii', 'nostalgic', 'epic', 'lofi'],
    environments: ['rooftop at sunset', 'rainy train station', 'magical academy', 'cyberpunk neo-tokyo', 'cozy bedroom'],
    lighting: ['pastel sunset', 'soft studio ghibli lighting', 'dramatic anime shadows', 'neon city glow'],
    styles: ['studio ghibli style', 'makoto shinkai aesthetic', '90s anime retro', 'highly detailed anime art'],
    tags: ['anime', 'lofi', 'aesthetic', 'manga', 'kawaii', 'otaku', 'japan', 'animation', 'cute', 'art']
  }
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

months.forEach(month => {
  const batchId = crypto.randomUUID();
  const batch = {
    id: batchId,
    theme: `${month.name} 2026 Megabatch - ${month.theme}`,
    month: month.name,
    year: month.year,
    category: 'Mixed',
    status: 'Planned',
    priority: 'High',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.batches.push(batch);

  profiles.forEach(profile => {
    const count = Math.round(200 * profile.share);
    const v = vocab[profile.name];
    
    for (let i = 0; i < count; i++) {
      const subject = getRandom(v.subjects);
      const adjective = getRandom(v.adjectives);
      const env = getRandom(v.environments);
      const lighting = getRandom(v.lighting);
      const style = getRandom(v.styles);
      
      const prompt = `A ${adjective} ${subject} in a ${env}. ${lighting}, ${style}, masterpiece, 8k --ar 9:16 --v 6.1 --stylize 250`;
      
      const shuffledTags = [...v.tags].sort(() => 0.5 - Math.random()).slice(0, 7);
      shuffledTags.push(month.name.toLowerCase(), '2026', subject.split(' ')[0].toLowerCase());
      
      db.wallpapers.push({
        id: crypto.randomUUID(),
        title: `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${subject.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} 4K`,
        prompt: prompt,
        description: `Download this incredible ${adjective} ${subject} wallpaper. Perfect for ${profile.name} aesthetic lovers featuring ${env}.`,
        tags: shuffledTags.join(', ').replace(/\s+/g, '_'),
        status: 'Pending',
        batchId: batchId,
        targetProfile: profile.name,
        targetRevenue: 'Ad Plays',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  });
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log(`Generated 4 new batches and 800 new wallpapers.`);

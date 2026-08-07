export interface MetadataInput {
  basePrompt: string;
  category: string;
  primaryTheme: string;
  secondaryTheme?: string;
}

export interface GeneratedMetadata {
  title: string;
  description: string;
  tags: string;
  targetProfile: string;
}

const PROFILE_MAPPING: Record<string, string> = {
  'Dark Fantasy': 'Freaky SANDA',
  'Gothic': 'Freaky SANDA',
  'Horror': 'Freaky SANDA',
  'Nature': 'Golden SANDA',
  'Cozy': 'Golden SANDA',
  'Autumn': 'Golden SANDA',
  'Space': 'Cosmic SANDA',
  'Galaxy': 'Cosmic SANDA',
  'Mystical': 'Siren SANDA',
  'Fantasy': 'Siren SANDA',
  'Cyberpunk': 'Neon SANDA',
  'AMOLED': 'Minimal SANDA',
  'Minimal': 'Minimal SANDA',
  'Anime': 'Anime SANDA',
};

function determineProfile(themes: string[]): string {
  for (const theme of themes) {
    if (PROFILE_MAPPING[theme]) return PROFILE_MAPPING[theme];
  }
  return 'SANDA OG';
}

function generateTags(input: MetadataInput): string {
  const coreTags = [input.category.toLowerCase(), input.primaryTheme.toLowerCase()];
  if (input.secondaryTheme) coreTags.push(input.secondaryTheme.toLowerCase());
  
  // Add some aesthetic tags based on theme
  if (input.primaryTheme === 'Dark Fantasy') coreTags.push('dark aesthetic', 'scary', 'horror');
  if (input.primaryTheme === 'Cyberpunk') coreTags.push('neon', 'futuristic', 'synthwave');
  if (input.primaryTheme === 'Nature') coreTags.push('scenic', 'peaceful', 'landscape');
  if (input.primaryTheme === 'AMOLED') coreTags.push('true black', 'dark mode', 'clean');

  // Ensure unique and max 10
  const uniqueTags = Array.from(new Set(coreTags)).slice(0, 10);
  return uniqueTags.join(', ');
}

export function generateMetadata(input: MetadataInput): GeneratedMetadata {
  // Title Logic: [Primary Theme] + [Secondary Theme?] + Wallpaper | 4K
  const titleStr = `${input.primaryTheme} ${input.secondaryTheme || ''}`.trim();
  const title = `${titleStr} Wallpaper | 4K HD`;

  // Description Logic
  const description = `Download this premium ${titleStr} wallpaper for your phone. Perfect for fans of ${input.category.toLowerCase()} and ${input.primaryTheme.toLowerCase()} aesthetics. High quality, optimized for all mobile screens.`;

  return {
    title,
    description,
    tags: generateTags(input),
    targetProfile: determineProfile([input.primaryTheme, input.secondaryTheme || '']),
  };
}

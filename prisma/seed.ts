import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const profiles = [
    { name: 'Freaky SANDA', description: 'Dark Fantasy, Gothic, Horror', tags: 'dark, horror, gothic, fantasy, scary' },
    { name: 'Golden SANDA', description: 'Nature, Cozy, Autumn', tags: 'nature, cozy, autumn, warm, aesthetic' },
    { name: 'SANDA OG', description: 'Mixed Themes', tags: 'mixed, general, cool, modern' },
    { name: 'Cosmic SANDA', description: 'Space, Galaxy, Celestial', tags: 'space, galaxy, stars, universe, neon' },
    { name: 'Siren SANDA', description: 'Mystical Fantasy', tags: 'mystical, fantasy, magic, ethereal, beautiful' },
    { name: 'Neon SANDA', description: 'Cyberpunk, Neon, Futuristic', tags: 'cyberpunk, neon, future, synthwave' },
    { name: 'Minimal SANDA', description: 'AMOLED, Clean, Minimalist', tags: 'minimal, amoled, dark, clean, simple' },
    { name: 'Anime SANDA', description: 'Anime, Manga, Otaku', tags: 'anime, manga, 2d, illustration' },
  ];

  for (const p of profiles) {
    await prisma.profile.create({
      data: p
    });
  }

  const categories = [
    { name: 'Abstract' },
    { name: 'Animals' },
    { name: 'Anime' },
    { name: 'Architecture' },
    { name: 'Cars & Vehicles' },
    { name: 'City' },
    { name: 'Dark' },
    { name: 'Entertainment' },
    { name: 'Gaming' },
    { name: 'Holidays' },
    { name: 'Minimal' },
    { name: 'Nature' },
    { name: 'Space' },
    { name: 'Sports' }
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { name: c.name },
      update: {},
      create: c
    });
  }

  console.log('Database seeded!');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

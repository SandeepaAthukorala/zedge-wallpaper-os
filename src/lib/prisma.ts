import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');

function readDb() {
  if (!fs.existsSync(dbPath)) return { batches: [], wallpapers: [] };
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch (e) {
    return { batches: [], wallpapers: [] };
  }
}

function writeDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Mocking Prisma Client since 'npm install @prisma/client' failed due to network ECONNRESET in this environment.
// Reads/writes from src/data/db.json
export const prisma: any = {
  batch: {
    findMany: async (args?: any) => {
      const db = readDb();
      let result = db.batches;
      if (args?.where?.status?.in) {
        result = result.filter((b: any) => args.where.status.in.includes(b.status));
      }
      if (args?.include?._count?.select?.wallpapers) {
        result = result.map((b: any) => ({
          ...b,
          _count: { wallpapers: db.wallpapers.filter((w: any) => w.batchId === b.id).length }
        }));
      }
      if (args?.orderBy?.createdAt === 'desc') {
        result.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      if (args?.take) {
        result = result.slice(0, args.take);
      }
      return result;
    },
    findUnique: async (args: any) => {
      const db = readDb();
      const batch = db.batches.find((b: any) => b.id === args.where.id);
      if (!batch) return null;
      if (args?.include?.wallpapers) {
        batch.wallpapers = db.wallpapers.filter((w: any) => w.batchId === batch.id);
      }
      return batch;
    },
    create: async (args: any) => {
      const db = readDb();
      const newBatch = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...args.data };
      db.batches.push(newBatch);
      writeDb(db);
      return newBatch;
    },
    update: async (args: any) => {
      const db = readDb();
      const index = db.batches.findIndex((b: any) => b.id === args.where.id);
      if (index > -1) {
        db.batches[index] = { ...db.batches[index], ...args.data, updatedAt: new Date().toISOString() };
        writeDb(db);
        return db.batches[index];
      }
      return null;
    },
    delete: async (args: any) => {
      const db = readDb();
      db.batches = db.batches.filter((b: any) => b.id !== args.where.id);
      writeDb(db);
      return { success: true };
    }
  },
  wallpaper: {
    findMany: async (args?: any) => {
      const db = readDb();
      let result = db.wallpapers;
      if (args?.include?.batch) {
        result = result.map((w: any) => ({
          ...w,
          batch: db.batches.find((b: any) => b.id === w.batchId) || null
        }));
      }
      if (args?.orderBy?.createdAt === 'desc') {
        result.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      return result;
    },
    findUnique: async (args: any) => {
      const db = readDb();
      const wp = db.wallpapers.find((w: any) => w.id === args.where.id);
      if (!wp) return null;
      if (args?.include?.batch) {
        wp.batch = db.batches.find((b: any) => b.id === wp.batchId) || null;
      }
      return wp;
    },
    create: async (args: any) => {
      const db = readDb();
      const newWp = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...args.data };
      db.wallpapers.push(newWp);
      writeDb(db);
      return newWp;
    },
    update: async (args: any) => {
      const db = readDb();
      const index = db.wallpapers.findIndex((w: any) => w.id === args.where.id);
      if (index > -1) {
        db.wallpapers[index] = { ...db.wallpapers[index], ...args.data, updatedAt: new Date().toISOString() };
        writeDb(db);
        return db.wallpapers[index];
      }
      return null;
    },
    delete: async (args: any) => {
      const db = readDb();
      db.wallpapers = db.wallpapers.filter((w: any) => w.id !== args.where.id);
      writeDb(db);
      return { success: true };
    },
    count: async (args?: any) => {
      const db = readDb();
      if (args?.where?.status) {
        return db.wallpapers.filter((w: any) => w.status === args.where.status).length;
      }
      return db.wallpapers.length;
    }
  },
  profile: {
    findMany: async () => [
      { id: '1', name: 'Freaky SANDA', description: 'Dark Fantasy, Gothic, Horror', tags: 'dark, horror, gothic, scary, demon, spooky', revenue: 86.72, share: 48.1, status: 'Active (Top Performer)' },
      { id: '2', name: 'Golden SANDA', description: 'Nature, Cozy, Autumn', tags: 'nature, cozy, autumn, leaves, forest, warm', revenue: 43.08, share: 23.9, status: 'Active' },
      { id: '3', name: 'SANDA OG', description: 'Mixed Themes', tags: 'mixed, abstract, general', revenue: 26.65, share: 14.8, status: 'Active' },
      { id: '4', name: 'Cosmic SANDA', description: 'Space, Galaxy, Celestial', tags: 'space, galaxy, stars, cosmic, universe, astronaut', revenue: 9.08, share: 5.0, status: 'Active' },
      { id: '5', name: 'Siren SANDA', description: 'Mystical Fantasy', tags: 'mystical, fantasy, siren, magic, magical', revenue: 6.31, share: 3.5, status: 'Active' },
      { id: '6', name: 'Neon SANDA', description: 'Cyberpunk, Neon, Sci-fi', tags: 'cyberpunk, neon, scifi, futuristic, city', revenue: 0, share: 0, status: 'Planned (Expansion)' },
      { id: '7', name: 'Minimal SANDA', description: 'AMOLED, Clean designs', tags: 'minimal, clean, amoled, dark, simple, abstract', revenue: 0, share: 0, status: 'Planned (Expansion)' },
      { id: '8', name: 'Anime SANDA', description: 'Anime, Manga', tags: 'anime, manga, japan, otaku, kawaii, animation', revenue: 0, share: 0, status: 'Planned (Expansion)' }
    ]
  },
  category: {
    findMany: async () => [
      { id: '1', name: 'Abstract' },
      { id: '2', name: 'Nature' },
      { id: '3', name: 'Gaming' },
      { id: '4', name: 'Dark / Horror' },
      { id: '5', name: 'Anime' },
      { id: '6', name: 'Sci-Fi' }
    ]
  }
};

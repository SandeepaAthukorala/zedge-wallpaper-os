---
name: generate-batch
description: Automatically generate a production-ready Zedge wallpaper batch (e.g. October, AMOLED, Luxury, Nature, Gaming) for the Zedge OS.
---

# Generate Zedge Wallpaper Batch

Use this skill when the user asks you to generate a new wallpaper publishing batch for Zedge OS (e.g., "Generate October Batch", "Generate AMOLED Batch").

## 1. Goal
Create a monthly or thematic batch of 30-50 highly optimized wallpaper concepts that fit the SANDA publishing strategy.

## 2. Requirements
- Identify the core theme/aesthetic (e.g., Halloween for October, Pure Black for AMOLED).
- Distribute the wallpapers across the 5 SANDA profiles:
  - **Freaky SANDA** (Dark Fantasy, Horror, Gothic)
  - **Golden SANDA** (Nature, Cozy, Autumn)
  - **Siren SANDA** (Mystical, Fantasy)
  - **Cosmic SANDA** (Space, Galaxy)
  - **Neon SANDA** (Cyberpunk, Sci-Fi)
  - **Minimal SANDA** (AMOLED, Clean)
  - **Anime SANDA** (Anime aesthetics)
- For each wallpaper concept, you must define:
  1. **Prompt**: A production-ready Midjourney/SD prompt (Composition, Lighting, Style, Camera --ar 9:16).
  2. **Title**: SEO Title (e.g., "[Theme] Wallpaper | 4K HD").
  3. **Description**: Search-intent optimized description mentioning the category and aesthetic.
  4. **Tags**: Max 10 tags, comma-separated (2 broad, 3 specific, 2 aesthetic).
  5. **Category**: The closest Zedge category.
  6. **Target Profile**: Which SANDA profile will publish it.

## 3. Workflow
When triggered, you will:
1. Ask the user for the specific Theme or Month if they haven't provided it.
2. Outline the strategy (e.g., "For October, we will do 20 Horror for Freaky SANDA, 10 Autumn for Golden SANDA").
3. Use the Zedge OS database (if instructed) to insert these batch items, OR output them as a formatted Markdown/JSON artifact in the `/batches` folder for the user to import into the app.

## 4. Execution Standard
DO NOT generate average prompts. Every prompt must be capable of competing with top creators. Use lighting keywords (volumetric lighting, cinematic, rim light), quality keywords (8k, hyper-detailed, masterpiece), and aesthetic framing.

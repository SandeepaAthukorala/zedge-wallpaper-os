# Zedge OS Documentation

## 1. Architecture
Zedge OS is built on a modern Next.js App Router architecture with a local-first philosophy.
- **Frontend**: React, Next.js, Tailwind CSS for styling, Shadcn UI for minimal, Notion-like aesthetic.
- **Backend**: Next.js Server Actions and Route Handlers interact with the local filesystem and SQLite.
- **Database**: Prisma ORM with SQLite (`/database/sanda.db`). It persists locally and requires no cloud connection.
- **Processing**: Local execution of CLI tools (like `realesrgan-ncnn-vulkan`) triggered via Node.js `child_process`.

## 2. Folder Structure
- `/database`: SQLite database files.
- `/assets`: Original images before upscaling.
- `/upscaled`: High-resolution, processed images ready for Zedge.
- `/batches`: JSON/Markdown backups of planned monthly batches.
- `/docs`: This documentation.
- `/src`: Next.js source code (app, components, lib).
- `/prisma`: Database schema definitions.

## 3. Database Schema
- **Batch**: Tracks monthly content planning (Theme, Target Audience, Priority).
- **Wallpaper**: The core entity (Prompt, Title, Description, Tags, Category, Target Profile, Status).
- **Profile**: Manages the 5 SANDA profiles and their niches.
- **Category**: Zedge categories (Abstract, Nature, Anime, etc.).

## 4. Workflow
1. **Open Batch**: Select the current month's batch in the Batch Manager.
2. **Choose Wallpaper**: Pick an item from the queue.
3. **Copy Prompt**: Click to copy the generated Midjourney/SD prompt.
4. **Generate**: Paste into your external AI tool and generate the image.
5. **Upload**: Drag & drop the final image into Zedge OS Editor.
6. **Upscale**: Click "Run Local Upscaler" to enhance resolution (4K+).
7. **Metadata Review**: Ensure SEO Title, Description, and Tags are optimized.
8. **Publish**: Copy metadata and upload to the Zedge profile.
9. **Mark Complete**: Progress to the next wallpaper.

## 5. Metadata & SEO Rules
- **Title**: `[Primary Keyword] + [Theme] + Wallpaper | 4K HD` (Max CTR).
- **Description**: Natural language targeting search intent. E.g., "Download this premium [keyword] wallpaper for your phone. Perfect for fans of [category]."
- **Tags**: 2 Broad, 3 Specific, 2 Aesthetic (e.g., 'amoled', '4k'). Maximum 10 tags. NO keyword stuffing.

## 6. Prompt Writing Guide
- **Structure**: `[Subject] in [Setting], [Lighting], [Style/Aesthetic], [Camera Details] --ar 9:16 --v 6.0`
- **Example**: A hyper-realistic dark fantasy oni demon samurai standing in an ethereal moonlit bamboo forest, glowing red eyes, dense fog, highly detailed, 8k resolution, photorealistic --ar 9:16 --v 6.0

## 7. Batch Creation Guide
- Plan 45 days in advance (e.g., plan October's Halloween batch in August).
- Include 30-50 wallpapers per batch.
- Balance between Evergreen (Nature, Space) and Trending (Holidays, Movies).

## 8. Quality Checklist
- [ ] Aspect ratio is exactly 9:16.
- [ ] No strange AI artifacts (hands, text, weird eyes).
- [ ] Composition fits a lock screen (clock area is readable).
- [ ] Upscaled properly without extreme smoothing/blurring.
- [ ] Metadata exactly matches the visual content.

## 9. Future Improvements
- Native API integration with Midjourney (if their terms ever allow it).
- Automated tracking via Zedge unofficial API once stabilized.
- Built-in crop and alignment tool to ensure clock positioning is perfect.

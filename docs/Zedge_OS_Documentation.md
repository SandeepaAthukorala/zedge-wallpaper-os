# Zedge Wallpaper OS - Documentation

## 1. Architecture
Zedge Wallpaper OS is a Next.js 15 (App Router) application with a local SQLite database, managed by Prisma ORM. It runs entirely locally on your machine, enabling a permanent storage system without cloud dependencies.

## 2. Folder Structure
- `/src/app`: Next.js App Router UI pages and API routes.
- `/src/components`: Reusable React components (Sidebar, UI elements).
- `/src/lib`: Shared libraries, including the Prisma database client.
- `/prisma`: Database schema (`schema.prisma`) and local SQLite DB (`database/sanda.db`).
- `/.agents/skills`: Antigravity Skills for AI workflow execution.
- `/docs`: Documentation and guides.

## 3. Database Schema (SQLite)
- **Profile**: Represents Zedge publishing accounts (e.g., Freaky SANDA).
- **Category**: Standard Zedge categories (Nature, Abstract, Gaming).
- **Batch**: A collection of wallpapers organized by month, theme, and priority.
- **Wallpaper**: The core entity storing SEO metadata (Title, Prompt, Description, Tags), relationships to Batch and Profile, and status (Pending, Upscaled, Published).

## 4. Workflow
1. **Create Batch**: From the Dashboard, create a new batch (e.g., October 2026, Halloween).
2. **Add Wallpapers**: Add wallpaper concepts with AI Prompts to the batch.
3. **Generate Images**: Use Antigravity to run Midjourney/SD locally via prompt copying.
4. **Process & SEO**: Open the wallpaper in the OS, auto-generate SEO metadata, and assign it to a Profile and Category.
5. **Upscale**: Click "Upscale" to execute local CLI upscaling (e.g., Real-ESRGAN).
6. **Publish**: Copy metadata directly into Zedge.
7. **Complete**: Mark wallpaper as "Published" in the OS.

## 5. Coding Standards
- **Clean Architecture**: Separation of concerns between UI, API, and DB logic.
- **TypeScript**: Strict typing for data integrity.
- **Tailwind CSS**: Utility-first styling for dark mode UI.

## 6. Metadata Rules
- **Title**: Maximum CTR. High visual intrigue. E.g. "Ethereal Moonlit Disintegration".
- **Description**: Natural, readable, and search-optimized. Never keyword-dump.
- **Tags**: Comma-separated. Include 2 broad, 3 specific, and 2 aesthetic tags.

## 7. SEO Rules
- Target US/International audiences with broad terms ("4K", "Aesthetic").
- Optimize for Ad Engagement: Complex, visually rich descriptions that keep users reading/looking.

## 8. Prompt Writing Guide
- Always append `--ar 9:16` for mobile framing.
- Use negative space at the top (for clock widgets).
- Specify lighting: "volumetric lighting", "cinematic", "rim light".
- Example: "Minimalist aerial view of a winding turquoise river, soft natural morning light, clean composition --ar 9:16 --v 6.1"

## 9. Batch Creation Guide
- Align with Seasonal events (August - December).
- Generate batches via Antigravity Skills: `/goal Generate October Batch`.
- Balance across profiles (e.g., 50% Freaky SANDA, 25% Golden SANDA).

## 10. Trend Research Methodology
- Use Antigravity `search_web` to monitor Midjourney/Zedge subreddits.
- Map seasonal colors (Autumn = Terracotta/Olive; Winter = Ice Blue/Silver).
- Check gaming/anime release calendars.

## 11. Quality Checklist
- [ ] Is it 9:16?
- [ ] Is there space for the clock widget?
- [ ] Are the tags relevant?
- [ ] Is the title catchy?
- [ ] Is the image upscaled to Zedge premium requirements?

## 12. Troubleshooting
- **Database Error**: Run `npx prisma db push` to resync the database.
- **UI Not Loading**: Ensure `npm run dev` is running in the terminal.
- **Upscaler Failing**: Ensure your local upscaler CLI path is correctly configured in `/api/upscale`.

## 13. Future Improvements
- Direct API integration with local Stable Diffusion/ComfyUI instances.
- Automated Zedge uploading via Puppeteer (if Zedge TOS permits).
- Analytics scraping from Zedge Creator Dashboard to automatically update OS revenue data.

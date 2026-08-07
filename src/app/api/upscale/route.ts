import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { exec } from 'child_process';
import util from 'util';
import path from 'path';

const execAsync = util.promisify(exec);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { wallpaperId, originalImage } = data;

    if (!originalImage) {
      return NextResponse.json({ error: 'No original image provided' }, { status: 400 });
    }

    // Extract filename from originalImage (e.g. /uploads/1786106975654-3039240.png -> 1786106975654-3039240.png)
    const filename = originalImage.split('/').pop();
    if (!filename) {
      return NextResponse.json({ error: 'Invalid original image path' }, { status: 400 });
    }

    const ext = path.extname(filename);
    const basename = path.basename(filename, ext);
    const outputFilename = `${basename}_upscaled.png`;

    const inputPath = path.join(process.cwd(), 'public', 'uploads', filename);
    const outputPath = path.join(process.cwd(), 'public', 'uploads', outputFilename);
    const executablePath = path.join(process.cwd(), 'bin', 'realesrgan', 'realesrgan-ncnn-vulkan.exe');

    // Run Real-ESRGAN
    // -n realesrgan-x4plus is the default 4x upscaling model
    const command = `"${executablePath}" -i "${inputPath}" -o "${outputPath}" -n realesrgan-x4plus`;
    
    // Execute the command (this takes time depending on GPU)
    await execAsync(command);
    
    const upscaledImage = `/uploads/${outputFilename}`;

    // Update database
    const updated = await prisma.wallpaper.update({
      where: { id: wallpaperId },
      data: {
        status: 'Upscaled',
        upscaledImage: upscaledImage
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error upscaling wallpaper:', error);
    return NextResponse.json({ error: 'Failed to upscale wallpaper' }, { status: 500 });
  }
}

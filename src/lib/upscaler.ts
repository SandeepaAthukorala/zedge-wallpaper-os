import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

// This function assumes realesrgan-ncnn-vulkan is installed on the system 
// or placed in a bin/ folder within the project.
export async function upscaleImage(
  inputPath: string, 
  outputPath: string, 
  model: string = 'realesrgan-x4plus'
): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    if (!fs.existsSync(inputPath)) {
      resolve({ success: false, message: 'Input file does not exist.' });
      return;
    }

    // Ensure the output directory exists
    const outDir = path.dirname(outputPath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // Construct the command
    // Usage: realesrgan-ncnn-vulkan.exe -i input.jpg -o output.jpg -n model_name
    const command = `realesrgan-ncnn-vulkan -i "${inputPath}" -o "${outputPath}" -n ${model}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Upscale error:', error);
        console.error('stderr:', stderr);
        resolve({ success: false, message: `Upscaling failed: ${error.message}` });
        return;
      }
      
      resolve({ success: true, message: 'Image upscaled successfully.' });
    });
  });
}

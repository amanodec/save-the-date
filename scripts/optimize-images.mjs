import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve('src/assets');
const outputDir = path.resolve('src/assets/optimized');

await fs.mkdir(outputDir, { recursive: true });

const images = [
  { file: 'meenakshi-childhood-1.png', widths: [400, 800, 1200] },
  { file: 'meenakshi-childhood-2.png', widths: [400, 800, 1200] },
  { file: 'divyam-childhood-1.png', widths: [400, 800, 1200] },
  { file: 'divyam-childhood-2.png', widths: [400, 800, 1200] },
  { file: 'meenakshi-cutout.png', widths: [400, 800, 1200] },
  { file: 'divyam-cutout.png', widths: [400, 800, 1200] },
  { file: 'meenakshi-dviyam-1.png', widths: [400, 800, 1020] },
  { file: 'meenakshi-divyam-2.png', widths: [400, 800, 1020] },
];

for (const { file, widths } of images) {
  const source = path.join(sourceDir, file);

  for (const width of widths) {
    const output = path.join(outputDir, file.replace(/\.png$/, `-${width}.webp`));

    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(output);

    console.log(`Converted ${file} -> optimized/${path.basename(output)}`);
  }
}

await sharp(path.resolve('src/assets/originals/og-card.png'))
  .jpeg({ quality: 82, progressive: true, mozjpeg: true })
  .toFile(path.resolve('public/og-card.jpg'));

console.log('Converted og-card.png -> og-card.jpg');

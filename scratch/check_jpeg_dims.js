import fs from 'fs';

function getJpegDimensions(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    let i = 2; // skip SOI
    while (i < buffer.length) {
      if (buffer[i] !== 0xFF) return { error: 'Invalid JPEG' };
      const marker = buffer[i + 1];
      if (marker === 0xD9) break; // EOI
      // SOF0 (0xC0) to SOF15 (0xCF) except 0xC4, 0xC8, 0xCC
      if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) || (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
        const height = buffer.readUInt16BE(i + 5);
        const width = buffer.readUInt16BE(i + 7);
        return { width, height };
      }
      const length = buffer.readUInt16BE(i + 2);
      i += 2 + length;
    }
    return { error: 'SOF not found' };
  } catch (err) {
    return { error: err.message };
  }
}

console.log('games_icon.png:', getJpegDimensions('games_icon.png'));
console.log('pro_resources_icon.png:', getJpegDimensions('pro_resources_icon.png'));

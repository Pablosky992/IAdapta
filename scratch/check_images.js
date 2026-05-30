import fs from 'fs';

function getPngDimensions(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    // PNG dimensions are stored at offset 16 (width) and 20 (height) as 4-byte big-endian integers
    const width = buffer.readInt32BE(16);
    const height = buffer.readInt32BE(20);
    return { width, height };
  } catch (err) {
    return { error: err.message };
  }
}

const files = ['store_icon.png', 'games_icon.png', 'pro_resources_icon.png', 'assets/iadapta_logo.png'];
files.forEach(f => {
  const dims = getPngDimensions(f);
  console.log(`${f}:`, dims);
});

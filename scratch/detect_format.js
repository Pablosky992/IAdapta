import fs from 'fs';

function detectFormat(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const hex = buffer.slice(0, 8).toString('hex').toUpperCase();
    if (hex.startsWith('89504E47')) return 'PNG';
    if (hex.startsWith('FFD8FF')) return 'JPEG';
    if (hex.startsWith('52494646') && buffer.slice(8, 12).toString() === 'WEBP') return 'WEBP';
    return `Unknown (${hex})`;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

const files = ['store_icon.png', 'games_icon.png', 'pro_resources_icon.png', 'assets/iadapta_logo.png'];
files.forEach(f => {
  console.log(`${f}:`, detectFormat(f));
});

const fs = require('fs');
const path = require('path');

const srcDir = './src';
const files = fs.readdirSync(srcDir);

files.forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(srcDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Simple regex check
    const imports = content.match(/^import\s+/m);
    const exports = content.match(/^export\s+/m);
    
    if (imports) {
      console.log(`FOUND import in: ${file}`);
    }
    if (exports) {
      console.log(`FOUND export in: ${file}`);
    }
  }
});
console.log("Check complete.");

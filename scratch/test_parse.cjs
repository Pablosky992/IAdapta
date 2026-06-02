const fs = require('fs');
const path = require('path');
const vm = require('vm');

const jsDir = './js';
const files = fs.readdirSync(jsDir);

files.forEach(file => {
  if (file.endsWith('.js')) {
    const filePath = path.join(jsDir, file);
    try {
      const code = fs.readFileSync(filePath, 'utf8');
      new vm.Script(code);
      console.log(`Syntax OK: ${file}`);
    } catch (err) {
      console.error(`Syntax ERROR in ${file}:`, err);
    }
  }
});

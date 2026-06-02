const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.');
files.forEach(file => {
  if (file.endsWith('.html')) {
    const content = fs.readFileSync(file, 'utf8');
    const hasConfig = content.includes('tailwind.config =');
    console.log(`${file}: ${hasConfig ? 'Has Tailwind Config' : 'MISSING Tailwind Config'}`);
  }
});

const fs = require('fs');

const content = fs.readFileSync('./src/recursos.jsx', 'utf8');

const matches = [];
const lines = content.split('\n');
lines.forEach((line, index) => {
  if (line.toLowerCase().includes('jspdf')) {
    matches.push({ lineNum: index + 1, text: line.trim() });
  }
});

console.log("Found matches:");
console.log(JSON.stringify(matches, null, 2));

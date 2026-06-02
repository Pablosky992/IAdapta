const fs = require('fs');

const content = fs.readFileSync('./src/recursos.jsx', 'utf8');
const lines = content.split('\n');

let found = -1;
lines.forEach((line, index) => {
  if (line.includes('const SectionResources =')) {
    found = index;
  }
});

if (found !== -1) {
  console.log(`Found SectionResources definition at line: ${found + 1}`);
  console.log(lines.slice(found, found + 50).join('\n'));
} else {
  console.log("SectionResources not found");
}

const fs = require('fs');
const vm = require('vm');

function testFile(filePath) {
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    new vm.Script(code);
    console.log(`Syntax OK: ${filePath}`);
  } catch (err) {
    console.error(`Syntax ERROR in ${filePath}:`, err);
  }
}

testFile('./js/shared.js');
testFile('./js/index.js');

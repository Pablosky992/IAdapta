// Extract the Babel script content and try to parse it
const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Find the babel script block
const babelMatch = content.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if (!babelMatch) {
  console.log("ERROR: Could not find <script type='text/babel'> block");
  process.exit(1);
}

const babelCode = babelMatch[1];
console.log(`Babel script length: ${babelCode.length} characters`);
console.log(`Babel script lines: ${babelCode.split('\n').length}`);

// Check for common issues
// 1. Check for unescaped </script> inside the babel code
if (babelCode.includes('</script>')) {
  const idx = babelCode.indexOf('</script>');
  const lineNum = babelCode.substring(0, idx).split('\n').length;
  console.log(`CRITICAL: Found </script> inside babel code at approximately line ${lineNum}`);
}

// 2. Try to check for obvious syntax issues
// Look for unclosed template literals
let inTemplate = false;
let templateStart = 0;
const lines = babelCode.split('\n');
for (let i = 0; i < lines.length; i++) {
  const backtickCount = (lines[i].match(/`/g) || []).length;
  if (backtickCount % 2 !== 0) {
    inTemplate = !inTemplate;
    if (inTemplate) templateStart = i + 1;
  }
}
if (inTemplate) {
  console.log(`WARNING: Unclosed template literal starting around line ${templateStart}`);
}

// 3. Check JSX tag balance for common tags
const jsxOpenDiv = (babelCode.match(/<div\s/g) || []).length + (babelCode.match(/<div>/g) || []).length;
const jsxCloseDiv = (babelCode.match(/<\/div>/g) || []).length;
console.log(`JSX <div> open: ${jsxOpenDiv}, close: ${jsxCloseDiv}`);

const jsxOpenSection = (babelCode.match(/<section\s/g) || []).length + (babelCode.match(/<section>/g) || []).length;
const jsxCloseSection = (babelCode.match(/<\/section>/g) || []).length;
console.log(`JSX <section> open: ${jsxOpenSection}, close: ${jsxCloseSection}`);

const jsxOpenSpan = (babelCode.match(/<span\s/g) || []).length + (babelCode.match(/<span>/g) || []).length;
const jsxCloseSpan = (babelCode.match(/<\/span>/g) || []).length;
console.log(`JSX <span> open: ${jsxOpenSpan}, close: ${jsxCloseSpan}`);

const jsxOpenP = (babelCode.match(/<p\s/g) || []).length + (babelCode.match(/<p>/g) || []).length;
const jsxCloseP = (babelCode.match(/<\/p>/g) || []).length;
console.log(`JSX <p> open: ${jsxOpenP}, close: ${jsxCloseP}`);

const jsxOpenButton = (babelCode.match(/<button\s/g) || []).length + (babelCode.match(/<button>/g) || []).length;
const jsxCloseButton = (babelCode.match(/<\/button>/g) || []).length;
console.log(`JSX <button> open: ${jsxOpenButton}, close: ${jsxCloseButton}`);

const jsxOpenH2 = (babelCode.match(/<h2\s/g) || []).length + (babelCode.match(/<h2>/g) || []).length;
const jsxCloseH2 = (babelCode.match(/<\/h2>/g) || []).length;
console.log(`JSX <h2> open: ${jsxOpenH2}, close: ${jsxCloseH2}`);

const jsxOpenH3 = (babelCode.match(/<h3\s/g) || []).length + (babelCode.match(/<h3>/g) || []).length;
const jsxCloseH3 = (babelCode.match(/<\/h3>/g) || []).length;
console.log(`JSX <h3> open: ${jsxOpenH3}, close: ${jsxCloseH3}`);

const jsxOpenLi = (babelCode.match(/<li\s/g) || []).length + (babelCode.match(/<li>/g) || []).length;
const jsxCloseLi = (babelCode.match(/<\/li>/g) || []).length;
console.log(`JSX <li> open: ${jsxOpenLi}, close: ${jsxCloseLi}`);

const jsxOpenUl = (babelCode.match(/<ul\s/g) || []).length + (babelCode.match(/<ul>/g) || []).length;
const jsxCloseUl = (babelCode.match(/<\/ul>/g) || []).length;
console.log(`JSX <ul> open: ${jsxOpenUl}, close: ${jsxCloseUl}`);

// 4. Check for fragment balance
const jsxOpenFrag = (babelCode.match(/<>/g) || []).length;
const jsxCloseFrag = (babelCode.match(/<\/>/g) || []).length;
console.log(`JSX fragments <>: open: ${jsxOpenFrag}, close: ${jsxCloseFrag}`);

console.log("\nValidation complete.");

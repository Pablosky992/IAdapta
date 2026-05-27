// Try to compile the Babel script content using @babel/parser
const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const babelMatch = content.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if (!babelMatch) {
  console.log("ERROR: Could not find babel block");
  process.exit(1);
}

const babelCode = babelMatch[1];

// Try using eval-like approach to find syntax errors
// We'll use acorn or similar if available, otherwise manual checks

// Check 1: Look for any string that contains </script (case insensitive)
const scriptClosePattern = /<\/\s*script/gi;
let match;
while ((match = scriptClosePattern.exec(babelCode)) !== null) {
  const lineNum = babelCode.substring(0, match.index).split('\n').length;
  console.log(`CRITICAL: Found ${match[0]} at line ${lineNum} of babel block`);
}

// Check 2: Look for HTML comments inside JSX that might break things
const htmlCommentPattern = /<!--[\s\S]*?-->/g;
while ((match = htmlCommentPattern.exec(babelCode)) !== null) {
  const lineNum = babelCode.substring(0, match.index).split('\n').length;
  console.log(`HTML Comment found at line ${lineNum}: ${match[0].substring(0, 50)}`);
}

// Check 3: Check for problematic characters
const nullBytes = (babelCode.match(/\0/g) || []).length;
console.log(`Null bytes: ${nullBytes}`);

// Check 4: Check for BOM or other encoding issues
const firstChars = babelCode.substring(0, 20);
console.log(`First chars hex: ${Buffer.from(firstChars).toString('hex').match(/.{2}/g).join(' ')}`);

// Check 5: Find all function declarations and their approximate line numbers
const functionPattern = /(?:const|function)\s+(\w+)\s*=?\s*function/g;
const functions = [];
while ((match = functionPattern.exec(babelCode)) !== null) {
  const lineNum = babelCode.substring(0, match.index).split('\n').length;
  functions.push({ name: match[1], line: lineNum });
}
console.log(`\nFunction declarations found: ${functions.length}`);
functions.forEach(f => console.log(`  Line ${f.line}: ${f.name}`));

// Check 6: Look for the intruder label in the daily challenge display
const intruderInSwitch = babelCode.indexOf("case 'intruder'");
if (intruderInSwitch === -1) {
  console.log("\nWARNING: 'intruder' case not found in switch");
} else {
  const switchLine = babelCode.substring(0, intruderInSwitch).split('\n').length;
  console.log(`\n'intruder' case found at line ${switchLine}`);
}

// Check 7: Look for the game name display in dailyGames
const intruderLabel = babelCode.indexOf("g === 'intruder'");
if (intruderLabel >= 0) {
  const labelLine = babelCode.substring(0, intruderLabel).split('\n').length;
  const context = babelCode.substring(intruderLabel - 20, intruderLabel + 100);
  console.log(`\n'intruder' label display at line ${labelLine}:`);
  console.log(context);
} else {
  console.log("\nWARNING: intruder label display not found - this might cause runtime error!");
}

// Check 8: Look for the daily challenge game label mapping to ensure all cases are covered
const labelMapPattern = /g === '(\w+)' \? '([^']+)'/g;
const labelMappings = [];
let labelSearch = babelCode;
while ((match = labelMapPattern.exec(labelSearch)) !== null) {
  labelMappings.push({ game: match[1], label: match[2] });
}
console.log(`\nGame label mappings found:`);
labelMappings.forEach(m => console.log(`  ${m.game} -> ${m.label}`));

// Verify all pool games have labels
const poolMatch = babelCode.match(/const pool = \[([^\]]+)\]/);
if (poolMatch) {
  const poolGames = poolMatch[1].match(/'(\w+)'/g).map(s => s.replace(/'/g, ''));
  console.log(`\nPool games: ${poolGames.join(', ')}`);
  poolGames.forEach(game => {
    const hasLabel = labelMappings.some(m => m.game === game);
    if (!hasLabel) {
      console.log(`  CRITICAL: Game '${game}' is in pool but has NO label mapping!`);
    }
  });
}

console.log("\nDone.");

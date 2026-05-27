// Compile the Babel script with @babel/core to find the exact error
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const babelMatch = content.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if (!babelMatch) {
  console.log("ERROR: Could not find babel block");
  process.exit(1);
}

const babelCode = babelMatch[1];
console.log(`Compiling ${babelCode.length} characters of JSX...`);

try {
  const result = babel.transformSync(babelCode, {
    presets: ['@babel/preset-react'],
    filename: 'app.jsx',
    sourceType: 'script',
  });
  console.log("SUCCESS! Babel compiled without errors.");
  console.log(`Output length: ${result.code.length} characters`);
} catch (err) {
  console.log("COMPILATION ERROR FOUND:");
  console.log(err.message);
  
  // Extract line number from error
  if (err.loc) {
    console.log(`\nError location: line ${err.loc.line}, column ${err.loc.column}`);
    
    // Show context around the error
    const lines = babelCode.split('\n');
    const errorLine = err.loc.line;
    const start = Math.max(0, errorLine - 5);
    const end = Math.min(lines.length - 1, errorLine + 5);
    console.log(`\nCode around error (lines ${start+1}-${end+1} of babel block):`);
    for (let i = start; i <= end; i++) {
      const marker = (i + 1 === errorLine) ? '>>>' : '   ';
      console.log(`${marker} ${i+1}: ${lines[i]}`);
    }
  }
}

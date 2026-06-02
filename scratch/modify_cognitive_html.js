import fs from 'fs';

let html = fs.readFileSync('estimulacion-cognitiva.html', 'utf8');

// 1. Remove Babel Standalone script tag
const babelTag = '  <!-- Babel Standalone (JSX in browser) -->\n  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>';
if (html.includes(babelTag)) {
  html = html.replace(babelTag, '');
  console.log('Removed Babel Standalone script tag');
} else {
  html = html.replace(/<!-- Babel Standalone \(JSX in browser\) -->\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone\/babel\.min\.js"><\/script>/, '');
  console.log('Attempted removing Babel Standalone script tag via regex');
}

// 2. Replace inline <script type="text/babel">...</script>
const startScript = html.indexOf('<script type="text/babel">');
const endScript = html.lastIndexOf('</script>');
if (startScript !== -1 && endScript !== -1 && startScript < endScript) {
  html = html.slice(0, startScript) + '<script type="module" src="js/estimulacion-cognitiva.js"></script>' + html.slice(endScript + 9);
  console.log('Replaced inline Babel script with module script tag');
} else {
  console.log('Error: Could not find inline Babel script range');
}

fs.writeFileSync('estimulacion-cognitiva.html', html, 'utf8');
console.log('Saved modified estimulacion-cognitiva.html');

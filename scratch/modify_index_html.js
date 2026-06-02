import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove Babel Standalone script tag
const babelTag = '  <!-- Babel Standalone (JSX in browser) -->\n  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>';
if (html.includes(babelTag)) {
  html = html.replace(babelTag, '');
  console.log('Removed Babel Standalone script tag');
} else {
  // Try without newlines
  html = html.replace(/<!-- Babel Standalone \(JSX in browser\) -->\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone\/babel\.min\.js"><\/script>/, '');
  console.log('Attempted removing Babel Standalone script tag via regex');
}

// 2. Update redirect script
const oldRedirect = `  <!-- Redirección Legacy para SPA / PWA -->
  <script>
    const params = new URLSearchParams(window.location.search);
    const p = params.get('page');
    if (p === 'games' || p === 'cognitive' || p === 'memory' || p === 'order' || p === 'wordsearch' || p === 'math' || p === 'visual' || p === 'intruder' || p === 'challenge') {
      window.location.replace('estimulacion-cognitiva.html' + window.location.search);
    } else if (p === 'resources') {
      window.location.replace('recursos.html' + window.location.search);
    } else if (p === 'guides') {
      window.location.replace('guias.html' + window.location.search);
    }
  </script>`;

const newRedirect = `  <!-- Redirección Legacy para SPA / PWA -->
  <script>
    const params = new URLSearchParams(window.location.search);
    const p = params.get('page');
    if (p === 'games' || p === 'cognitive' || p === 'memory' || p === 'order' || p === 'wordsearch' || p === 'math' || p === 'visual' || p === 'intruder' || p === 'challenge' || p === 'sudoku') {
      window.location.replace('estimulacion-cognitiva.html' + window.location.search);
    } else if (p === 'resources') {
      window.location.replace('recursos.html' + window.location.search);
    } else if (p === 'guides') {
      window.location.replace('guias.html' + window.location.search);
    } else if (p === 'analyzer') {
      window.location.replace('valoracion-estancia.html' + window.location.search);
    } else if (p === 'cv') {
      window.location.replace('cv.html' + window.location.search);
    } else if (p === 'about') {
      window.location.replace('index.html#about');
    } else if (p === 'contact') {
      window.location.replace('contacto.html');
    } else if (p === 'legal') {
      window.location.replace('aviso-legal.html');
    }
  </script>`;

if (html.includes(oldRedirect)) {
  html = html.replace(oldRedirect, newRedirect);
  console.log('Updated legacy redirection block');
} else {
  // Let's do it by regex or searching parts
  const startIdx = html.indexOf('<!-- Redirección Legacy para SPA / PWA -->');
  const endIdx = html.indexOf('</script>', startIdx);
  if (startIdx !== -1 && endIdx !== -1) {
    html = html.slice(0, startIdx) + newRedirect + html.slice(endIdx + 9);
    console.log('Updated legacy redirection block using index search');
  } else {
    console.log('Error: Could not find redirect block');
  }
}

// 3. Replace inline <script type="text/babel">...</script>
const startScript = html.indexOf('<script type="text/babel">');
const endScript = html.lastIndexOf('</script>');
if (startScript !== -1 && endScript !== -1 && startScript < endScript) {
  html = html.slice(0, startScript) + '<script type="module" src="js/index.js"></script>' + html.slice(endScript + 9);
  console.log('Replaced inline Babel script with module script tag');
} else {
  console.log('Error: Could not find inline Babel script range');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved modified index.html');

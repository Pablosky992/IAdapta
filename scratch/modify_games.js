import fs from 'fs';

let code = fs.readFileSync('src/estimulacion-cognitiva.jsx', 'utf8');

// 1. Prepend import
code = "import { Icons, Navbar, Footer, CookieBanner, AdSenseBlock } from './shared.js';\n\n" + code;

// 2. Remove local Icons & AdSenseBlock definitions
const startIcons = code.indexOf('const Icons = {');
const endIcons = code.indexOf('// --- STREAK CALENDAR MODAL ---');
if (startIcons !== -1 && endIcons !== -1) {
  code = code.slice(0, startIcons) + code.slice(endIcons);
  console.log('Removed local Icons & AdSenseBlock definition');
} else {
  console.log('Error: could not find Icons/AdSenseBlock range');
}

// 3. Remove local Navbar, Footer & CookieBanner definitions
const startNav = code.indexOf('// --- NAVBAR & FOOTER & COOKIES ---');
const endNav = code.indexOf('// --- APP ---');
if (startNav !== -1 && endNav !== -1) {
  code = code.slice(0, startNav) + code.slice(endNav);
  console.log('Removed local Navbar, Footer & CookieBanner definition');
} else {
  console.log('Error: could not find Navbar/Footer range');
}

// 4. Remove all difficulty selection AdSenseBlock instances (slot="1157680328")
// Let's use a very clean regex that matches the div block
const adBlockRegex = /\s*(?:\{\/\*\s*Bloque de anuncios - Dificultad\s*\*\/\}|\{\/\*\s*Bloque de anuncios\s*\*\/\}|\/\/\s*Bloque de anuncios.*)?\s*<div className="mt-8 overflow-hidden rounded-xl bg-gray-50\/50 min-h-\[100px\] flex flex-col items-center justify-center">[\s\S]*?<AdSenseBlock slot="1157680328" \/>[\s\S]*?<\/div>/g;

const cleanCode = code.replace(adBlockRegex, '');
const diff = code.length - cleanCode.length;
console.log('Removed ' + diff + ' characters of game ads');
code = cleanCode;

// 5. Update navigateTo in App
code = code.replace("else if (page === 'cv') target = 'index.html?page=cv';", "else if (page === 'cv') target = 'cv.html';");
code = code.replace("else if (page === 'analyzer') target = 'index.html?page=analyzer';", "else if (page === 'analyzer') target = 'valoracion-estancia.html';");
code = code.replace("else if (page === 'legal') target = 'index.html?page=legal';", "else if (page === 'legal') target = 'aviso-legal.html';");

// 6. Update rendering inside App to use shared components properly
code = code.replace('<Navbar activeSection="cognitive" scrollTo={() => {}} currentPage="cognitive" navigateTo={navigateTo} />', '<Navbar currentPage="cognitive" />');
code = code.replace('<Footer scrollTo={() => {}} navigateTo={navigateTo} />', '<Footer currentPage="cognitive" />');
code = code.replace('<CookieBanner navigateTo={navigateTo} />', '<CookieBanner />');

fs.writeFileSync('src/estimulacion-cognitiva.jsx', code, 'utf8');
console.log('Saved modified src/estimulacion-cognitiva.jsx');

const fs = require('fs');

const filePath = './src/guias.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const filesToStrip = [
  'tabla_banera.png',
  'asiento_banera.png',
  'asiento_ducha.png',
  'alza_wc.png',
  'barras_apoyo.png',
  'barandilla_cama.png',
  'trapecio_cama.png',
  'tacos_cama.png',
  'cubiertos_adaptados.png',
  'cuchillo_nelson.png',
  'tabla_cortar.png',
  'andador_interior.png',
  'andador_exterior.png',
  'conteras.png',
  'vaso_escotadura.png'
];

let replacementCount = 0;
filesToStrip.forEach(fileName => {
  const target = `assets/${fileName}`;
  const replacement = fileName;
  
  if (content.includes(target)) {
    // Replace all occurrences of this target
    const regex = new RegExp(target, 'g');
    content = content.replace(regex, replacement);
    console.log(`Replaced: ${target} -> ${replacement}`);
    replacementCount++;
  }
});

if (replacementCount > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated ${filePath} with ${replacementCount} replacements.`);
} else {
  console.log("No replacements were needed.");
}

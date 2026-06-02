import babel from '@babel/core';
import fs from 'fs';
import path from 'path';

const srcDir = './src';
const destDir = './js';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

const compileFiles = () => {
  try {
    const files = fs.readdirSync(srcDir);
    console.log(`Encontrados ${files.length} archivos en ${srcDir}`);

    files.forEach(file => {
      if (path.extname(file) === '.jsx') {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file.replace('.jsx', '.js'));

        console.log(`Compilando ${srcPath} -> ${destPath}...`);
        const code = fs.readFileSync(srcPath, 'utf8');

        const result = babel.transformSync(code, {
          presets: [
            ['@babel/preset-react', {
              runtime: 'classic'
            }]
          ],
          compact: false
        });

        const wrappedCode = `(function() {\n${result.code}\n})();`;
        fs.writeFileSync(destPath, wrappedCode, 'utf8');
      }
    });

    console.log('¡Compilación completada con éxito!');
  } catch (err) {
    console.error('Error durante la compilación:', err);
    process.exit(1);
  }
};

compileFiles();

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const svg2img = require('svg2img');

const publicDir = path.join(__dirname, '../public');

// Файлы для конвертации
const svgFiles = [
  'rick-scientist.svg',
  'morty.svg',
  'pickle-rick.svg'
];

// Конвертация каждого SVG в PNG
svgFiles.forEach(svgFile => {
  const svgPath = path.join(publicDir, svgFile);
  const pngPath = path.join(publicDir, svgFile.replace('.svg', '.png'));
  
  console.log(`Converting ${svgFile} to PNG...`);
  
  try {
    // Чтение SVG файла
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    
    // Конвертация SVG в PNG
    svg2img(svgContent, {
      width: 200,
      height: 200,
    }, (error, buffer) => {
      if (error) {
        console.error(`Error converting ${svgFile}:`, error);
        return;
      }
      
      // Запись PNG файла
      fs.writeFileSync(pngPath, buffer);
      console.log(`Created ${pngPath}`);
    });
  } catch (error) {
    console.error(`Error processing ${svgFile}:`, error);
  }
});

console.log('Conversion process initiated. Check for errors above.'); 
import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.svg')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replacements of Hex codes
  const hexReplacements = {
    // Espresso -> ink
    '#241812': '#1F1612',
    '#18100C': '#1F1612',
    '#36241B': '#1F1612',
    // Roast -> latte (for lines/dividers/SVG accents)
    '#5A3825': '#C9A27E',
    '#452A1C': '#C9A27E',
    '#70462F': '#C9A27E',
    // Cream -> foam
    '#F5EBDD': '#FBF7F1',
    '#FAF5EE': '#FBF7F1',
    '#EBDCC8': '#FBF7F1',
    // Special case for Featured.jsx background to match almond
    '#FBF6EE': '#EADBC8',
    // Caramel -> caramel
    '#C58B4E': '#A8612E',
    '#D79F64': '#A8612E',
    '#AD7437': '#A8612E',
    // Beige -> almond
    '#D8C3A5': '#EADBC8',
    '#E5D6C1': '#EADBC8',
    '#C7AE8C': '#EADBC8'
  };

  for (const [oldHex, newHex] of Object.entries(hexReplacements)) {
    // Replace uppercase and lowercase hexes
    content = content.replace(new RegExp(oldHex, 'gi'), newHex);
  }

  // Also replace any bg-[#...] classes
  // e.g. bg-[#FBF6EE] -> bg-almond
  content = content.replace(/bg-\[#FBF6EE\]/gi, 'bg-almond');
  
  // Specific case for gradient stops if necessary (already handled by direct hex replacement)

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated hex in ${file}`);
  }
});

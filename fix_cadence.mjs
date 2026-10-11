import fs from 'fs';

// Helper to replace classes in a file
function updateFile(file, replacements) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  for (const [oldClass, newClass] of Object.entries(replacements)) {
    newContent = newContent.replace(new RegExp(oldClass, 'g'), newClass);
  }
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
}

// 1. About (Story) -> Foam (Light theme)
updateFile('src/components/About.jsx', {
  'bg-ink': 'bg-foam',
  'text-foam': 'text-ink',
  'border-ink': 'border-latte/40',
  'from-ink': 'from-foam',
  'to-ink': 'to-foam'
});

// 2. MenuTeaser -> Almond
updateFile('src/components/home/MenuTeaser.jsx', {
  'bg-foam': 'bg-almond',
  'bg-\\[#EADBC8\\]': 'bg-almond'
});

// 3. GalleryTeaser -> Foam
updateFile('src/components/home/GalleryTeaser.jsx', {
  'bg-\\[#EADBC8\\]': 'bg-foam',
  'bg-almond': 'bg-foam'
});

// 4. Reviews -> Almond
updateFile('src/components/home/Reviews.jsx', {
  'bg-foam': 'bg-almond',
  'bg-\\[#EADBC8\\]': 'bg-almond'
});

// 5. FinalCTA -> Foam
updateFile('src/components/home/FinalCTA.jsx', {
  'bg-\\[#EADBC8\\]': 'bg-foam',
  'bg-almond': 'bg-foam',
  'bg-ink': 'bg-foam',
  'text-foam': 'text-ink'
});

// Make sure layout footer has correct border if needed, etc.

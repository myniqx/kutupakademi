const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'C:\\Users\\Burak\\Desktop\\Logolar';
const TARGET_DIR = path.join(process.cwd(), 'public', 'partners');

const LOGO_MAPPINGS = {
  'betaalpha.jpeg': 'gpower',
  'Amos.png': 'amos',
  'Comprehensive Meta Analysis.png': 'comprehensive-meta-analysis',
  'Jamovi.png': 'jamovi',
  'Jasp.png': 'jasp',
  'MAXQDA.png': 'maxqda',
  'Minitab.png': 'minitab',
  'Power BI.png': 'power-bi',
  'PYTHON.png': 'python',
  'R.png': 'r',
  'SPSS.png': 'spss',
  'SQL.png': 'sql',
  'vosviewer.jpeg': 'vosviewer',
  'winsteps.jpeg': 'winsteps',
};

async function convertLogos() {
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SOURCE_DIR);
  console.log(`Found ${files.length} files in source directory`);

  let converted = 0;
  let skipped = 0;

  for (const file of files) {
    const targetName = LOGO_MAPPINGS[file];

    if (!targetName) {
      console.log(`⚠️  Skipping unmapped file: ${file}`);
      skipped++;
      continue;
    }

    const sourcePath = path.join(SOURCE_DIR, file);
    const targetPath = path.join(TARGET_DIR, `${targetName}.webp`);

    try {
      await sharp(sourcePath)
        .webp({ quality: 90 })
        .toFile(targetPath);

      console.log(`✅ Converted: ${file} → ${targetName}.webp`);
      converted++;
    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
    }
  }

  console.log(`\n✨ Conversion complete!`);
  console.log(`   Converted: ${converted}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`\nGenerated partner list (alphabetically):`);

  const partners = Object.values(LOGO_MAPPINGS).sort();
  partners.forEach((name, index) => {
    console.log(`  ${index + 1}. ${name}`);
  });
}

convertLogos().catch(console.error);

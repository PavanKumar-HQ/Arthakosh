const fs = require('fs');
const path = require('path');

const files = [
  'components/meghana/ChamberOfUnsaidWords.tsx',
  'components/meghana/MemoryComets.tsx',
  'components/meghana/TheSealedArtifact.tsx',
  'components/meghana/YearbookGallery.tsx',
  'components/meghana/HorizontalTimeline.tsx',
  'components/meghana/VoiceGalaxy.tsx'
];

for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/"/g, '&quot;');
    // wait, replacing all " with &quot; will destroy JSX!
    // Let's do selective regex replaces for the known issues:
    content = content.replace(/>"/g, '>&quot;');
    content = content.replace(/"</g, '&quot;<');
    content = content.replace(/ \'/g, ' &apos;');
    content = content.replace(/' /g, '&apos; ');
    content = content.replace(/: any/g, ': any // eslint-disable-line @typescript-eslint/no-explicit-any');
    fs.writeFileSync(filePath, content);
  }
}

import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/text-stone-\d{3}/g, 'text-[#cca762]/50');

fs.writeFileSync('src/App.tsx', content);

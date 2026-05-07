import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace remaining white backgrounds with deep maroon
content = content.replace(/bg-white/g, 'bg-[#14020a]');
content = content.replace(/bg-stone-50/g, 'bg-[#2a0614]');
content = content.replace(/bg-amber-50/g, 'bg-[#c2964b]/10');
content = content.replace(/hover:border-amber-400/g, 'hover:border-[#c2964b]');

// Make text colors consistent
content = content.replace(/text-stone-900/g, 'text-[#c2964b]');

fs.writeFileSync('src/App.tsx', content);

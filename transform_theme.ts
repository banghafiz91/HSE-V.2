import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace Fonts
content = content.replace(/font-serif/g, 'font-sans');

// Replace Primary Brand Color (Gold/Amber -> Blue)
content = content.replace(/#c2964b/g, '#007BFF');
content = content.replace(/text-amber-700/g, 'text-[#007BFF]');
content = content.replace(/bg-amber-700/g, 'bg-[#007BFF]');
content = content.replace(/border-amber-700/g, 'border-[#007BFF]');
content = content.replace(/text-amber-900/g, 'text-[#0A192F]');

// Lighter / Secondary Blue
content = content.replace(/#cca762/g, '#3395FF');

// Border / Accents
content = content.replace(/#e4d5b7/g, '#CCE5FF');
content = content.replace(/#e0c691/g, '#99CCFF');

// Gradient Dark Texts
content = content.replace(/#8c5a19/g, '#0056B3');
content = content.replace(/#b3883b/g, '#007BFF');

// Base Dark Backgrounds
content = content.replace(/#14020a/g, '#0A192F');
content = content.replace(/#1a050f/g, '#112240');
content = content.replace(/#2a0614/g, '#112240');
content = content.replace(/#0f040a/g, '#020C1B');

// Base Light Backgrounds
content = content.replace(/bg-\[\#fafaf9\]/g, 'bg-[#F8F9FA]');
content = content.replace(/bg-\[\#f5f5f4\]/g, 'bg-[#FFFFFF]');

// Text on Dark
content = content.replace(/#fdf0b0/g, '#FFFFFF');

// Orange Accents - Let's use orange for the secondary gradients/icons
content = content.replace(/text-amber-600/g, 'text-[#FF8C00]');
content = content.replace(/border-amber-600/g, 'border-[#FF8C00]');
content = content.replace(/ring-amber-500/g, 'ring-[#FF8C00]');
content = content.replace(/text-amber-400/g, 'text-[#FF8C00]');
content = content.replace(/bg-amber-100/g, 'bg-[#FFF0E0]');

fs.writeFileSync('src/App.tsx', content);

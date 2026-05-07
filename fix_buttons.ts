import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Change text on blue gradient elements to white
content = content.replace(/text-stone-900 dark:text-\[\#0A192F\]/g, 'text-white dark:text-white');
content = content.replace(/text-stone-900 dark:text-\[\#14020a\]/g, 'text-white dark:text-white');

// Let's make the "TERPOPULER" badge use the Orange color
content = content.replace(
  `from-[#007BFF] to-[#3395FF] text-white dark:text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#CCE5FF] dark:shadow-[#007BFF]/20 whitespace-nowrap">TERPOPULER`,
  `from-[#FF8C00] to-[#FFAA33] text-white dark:text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-200 dark:shadow-orange-900/20 whitespace-nowrap">TERPOPULER`
);

content = content.replace(
  `bg-gradient-to-r from-[#007BFF] to-[#3395FF] text-white dark:text-white rounded-xl hover:opacity-90`,
  `bg-gradient-to-r from-[#007BFF] to-[#3395FF] text-white dark:text-white rounded-xl hover:opacity-90`
);

// Check standard blue bg colors to be text-white
content = content.replace(/bg-\[\#007BFF\] text-stone-900/g, 'bg-[#007BFF] text-white');

// For "Coba Gratis" button (currently just transparent with blue text), let's make it have an orange border and orange text
content = content.replace(
  /bg-transparent text-\[\#007BFF\] dark:text-\[\#007BFF\] rounded-xl font-bold uppercase tracking-widest hover:bg-\[\#007BFF\]\/10 transition-all border border-\[\#CCE5FF\] dark:border-\[\#007BFF\]\/30/g,
  'bg-transparent text-[#FF8C00] dark:text-[#FF8C00] rounded-xl font-bold uppercase tracking-widest hover:bg-[#FF8C00]/10 transition-all border border-[#FF8C00]/50 dark:border-[#FF8C00]/50'
);
content = content.replace(
  /bg-transparent text-\[\#007BFF\] dark:text-\[\#007BFF\] rounded-xl font-bold uppercase tracking-wider hover:bg-\[\#007BFF\]\/10 transition-all border border-\[\#CCE5FF\] dark:border-\[\#007BFF\]\/30/g,
  'bg-transparent text-[#FF8C00] dark:text-[#FF8C00] rounded-xl font-bold uppercase tracking-wider hover:bg-[#FF8C00]/10 transition-all border border-[#FF8C00]/50 dark:border-[#FF8C00]/50'
);

fs.writeFileSync('src/App.tsx', content);

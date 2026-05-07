import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// fix messed up classes
content = content.replace(/placeholder:text-stone-700 dark:text-\[#cca762\] dark:placeholder:text-stone-400 dark:text-\[#cca762\]\/40 dark:text-stone-400 dark:text-\[#cca762\]\/40/g, 'placeholder:text-stone-400 dark:placeholder:text-[#cca762]/40');

// there's another one in 795 and 815
content = content.replace(/bg-white dark:bg-white\/[0-9]+ dark:bg-\[#1a050f\]\/[0-9]+/g, function(match){
  // bg-white dark:bg-white/80 dark:bg-[#1a050f]/80
  if (match.includes('60')) return 'bg-white/60 dark:bg-[#1a050f]/60';
  if (match.includes('50')) return 'bg-white/50 dark:bg-[#1a050f]/50';
  if (match.includes('80')) return 'bg-white/80 dark:bg-[#1a050f]/80';
  return match;
});

// also wait, let's fix the other ones
content = content.replace(/dark:shadow-stone-200 /g, '');
content = content.replace(/placeholder:text-stone-700 dark:text-\[#cca762\] dark:placeholder:text-stone-400 dark:text-\[#cca762\]\/40/g, 'placeholder:text-stone-400 dark:placeholder:text-[#cca762]/40');

// looking for general duplicates or weirdness
content = content.replace(/(dark:bg-\[#1a050f\]\/[0-9]+) dark:bg-\[#1a050f\]\/[0-9]+/g, '$1');

// Fix text-white
content = content.replace(/text-white/g, 'text-stone-50 dark:text-white');
// Wait! `text-stone-50 dark:text-white` makes text-white invisible on light themes unless it's on a dark background. Let's look at where text-white is used:
// usually on buttons that are gradient (gold). White text on Gold (#c2964b) has ~2.1 contrast. We should probably use text-stone-900 on those buttons in light mode.
content = content.replace(/text-stone-50 dark:text-white/g, 'text-stone-900 dark:text-white');

// For icons/text that should be white in dark mode, but dark in light mode:
content = content.replace(/text-white /g, 'text-stone-900 dark:text-white ');
content = content.replace(/text-white"/g, 'text-stone-900 dark:text-white"');

fs.writeFileSync('src/App.tsx', content);

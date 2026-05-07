import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  { match: /bg-\[#fafaf9\]/g, replace: 'bg-[#fafaf9] dark:bg-[#14020a]' },
  { match: /bg-white/g, replace: 'bg-white dark:bg-[#1a050f]' },
  { match: /bg-\[#f5f5f4\]/g, replace: 'bg-[#f5f5f4] dark:bg-[#2a0614]' },

  { match: /text-stone-600/g, replace: 'text-stone-600 dark:text-[#cca762]/80' },
  { match: /text-stone-500/g, replace: 'text-stone-500 dark:text-[#cca762]/60' },
  { match: /text-stone-400/g, replace: 'text-stone-400 dark:text-[#cca762]/40' },
  { match: /text-stone-700/g, replace: 'text-stone-700 dark:text-[#cca762]' },
  
  { match: /text-\[#412702\]/g, replace: 'text-[#412702] dark:text-[#fdf0b0]' },

  { match: /border-\[#e4d5b7\]/g, replace: 'border-[#e4d5b7] dark:border-[#c2964b]/30' },
  
  { match: /shadow-stone-200/g, replace: 'shadow-stone-200 dark:shadow-black/50' },
  { match: /shadow-stone-100/g, replace: 'shadow-stone-100 dark:shadow-black/40' },
  { match: /shadow-\[#e4d5b7\]/g, replace: 'shadow-[#e4d5b7] dark:shadow-[#c2964b]/20' },
  
  { match: /from-\[#412702\] via-\[#855e1c\] to-\[#c2964b\]/g, replace: 'from-[#412702] dark:from-[#fdf0b0] via-[#855e1c] dark:via-[#c2964b] to-[#c2964b] dark:to-[#412702]' },
  
  { match: /placeholder:text-stone-400/g, replace: 'placeholder:text-stone-400 dark:placeholder:text-[#cca762]/40' },

  { match: /invert mix-blend-multiply/g, replace: 'invert dark:invert-0 mix-blend-multiply dark:mix-blend-screen' },
]

for (const { match, replace } of replacements) {
    content = content.replace(match, replace);
}

// Special case for header bg-white -> bg-[#0f0107] to override the generic #1a050f
// Look for `header className="bg-white dark:bg-[#1a050f]`
content = content.replace(/header className="([^"]*)bg-white dark:bg-\[#1a050f\]/g, 'header className="$1bg-white dark:bg-[#0f0107]');

fs.writeFileSync('src/App.tsx', content);

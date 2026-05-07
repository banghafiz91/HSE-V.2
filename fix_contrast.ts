import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// text-[#cca762] and variations:
content = content.replace(/text-\[#cca762\]\/80/g, 'text-stone-600 dark:text-[#cca762]/80');
content = content.replace(/text-\[#cca762\]\/70/g, 'text-stone-500 dark:text-[#cca762]/70');
content = content.replace(/text-\[#cca762\]\/60/g, 'text-stone-500 dark:text-[#cca762]/60');
content = content.replace(/text-\[#cca762\]\/50/g, 'text-stone-400 dark:text-[#cca762]/50');
content = content.replace(/text-\[#cca762\]\/40/g, 'text-stone-400 dark:text-[#cca762]/40');
// text-[#cca762] without opacity (we need to be careful not to replace the ones we just added if we do a generic replace)
// First, replace it when followed by space, double quote, or backtick
content = content.replace(/text-\[#cca762\](?=[\s"`])/g, 'text-stone-700 dark:text-[#cca762]');

// text-[#fdf0b0] (very light yellow, practically invisible on white)
content = content.replace(/text-\[#fdf0b0\](?=[\s"`])/g, 'text-[#412702] dark:text-[#fdf0b0]');

// text-[#c2964b] (accent gold, maybe it's fine, but let's make it slightly darker in light mode so it can be read if needed, though #c2964b is often buttons/icons. Wait, #c2964b has contrast ratio of 2.15 against white, which is very low). Let's use #9b6b22 for light mode.
// Actually, let's keep it #c2964b for a moment or make it #8c5a19 (amber-700-ish)
content = content.replace(/text-\[#c2964b\](?=[\s"`])/g, 'text-amber-700 dark:text-[#c2964b]');

// replace `placeholder:text-[#cca762]`
content = content.replace(/placeholder:text-\[#cca762\]/g, 'placeholder:text-stone-400 dark:placeholder:text-[#cca762]');

// We should also replace the background of body inputs which are `#1a050f` to white in light mode, since the previous revert might have reverted those backgrounds to `#1a050f` unconditionally.
content = content.replace(/bg-\[#1a050f\]/g, 'bg-white dark:bg-[#1a050f]');
content = content.replace(/bg-\[#0f0107\]/g, 'bg-white dark:bg-[#0f0107]');
content = content.replace(/bg-\[#14020a\]/g, 'bg-[#fafaf9] dark:bg-[#14020a]');
content = content.replace(/bg-\[#2a0614\]/g, 'bg-[#f5f5f4] dark:bg-[#2a0614]');
content = content.replace(/bg-white\/50 dark/g, 'bg-white/50 dark'); // skip already added
content = content.replace(/bg-\[#1a050f\]\/50/g, 'bg-white/50 dark:bg-[#1a050f]/50');
content = content.replace(/bg-\[#1a050f\]\/60/g, 'bg-white/60 dark:bg-[#1a050f]/60');
content = content.replace(/bg-\[#1a050f\]\/80/g, 'bg-white/80 dark:bg-[#1a050f]/80');
content = content.replace(/bg-\[#14020a\]\/80/g, 'bg-[#fafaf9]/80 dark:bg-[#14020a]/80');

// Fix border colors
content = content.replace(/border-\[#c2964b\]\/30/g, 'border-[#e4d5b7] dark:border-[#c2964b]/30');
content = content.replace(/border-\[#c2964b\](?=[\s"`])/g, 'border-[#e0c691] dark:border-[#c2964b]'); 

// Fix Shadows
content = content.replace(/shadow-black\/50/g, 'shadow-stone-200 dark:shadow-black/50');
content = content.replace(/shadow-black\/40/g, 'shadow-stone-200 dark:shadow-black/40');
content = content.replace(/shadow-\[#c2964b\]\/20/g, 'shadow-[#e4d5b7] dark:shadow-[#c2964b]/20');

// Fix the gradients
content = content.replace(/from-\[#c2964b\]/g, 'from-[#c2964b] dark:from-[#c2964b]'); // wait no, the gradient text was: 
// bg-gradient-to-b from-[#c2964b] via-[#cca762] to-[#c2964b]
// On white background, light gold text is illegible.
content = content.replace(/from-\[#c2964b\] via-\[#cca762\] to-\[#c2964b\] bg-clip-text/g, 'from-[#8c5a19] dark:from-[#c2964b] via-[#b3883b] dark:via-[#cca762] to-[#8c5a19] dark:to-[#c2964b] bg-clip-text');

// Mix blend of the main image
content = content.replace(/mix-blend-screen/g, 'invert dark:invert-0 mix-blend-multiply dark:mix-blend-screen');

// For "ThemeToggle" specifically, we should have bg-white dark:bg-[#1a050f]
content = content.replace(/bg-[#1a050f] border border-[#e4d5b7] dark:border-\[#c2964b\]\/30 shadow-lg shadow-black dark:shadow-black\/40 text-[#cca762]/g, 'bg-white dark:bg-[#1a050f] border border-[#e4d5b7] dark:border-[#c2964b]/30 shadow-lg shadow-stone-200 dark:shadow-black/40 text-stone-700 dark:text-[#cca762]');

fs.writeFileSync('src/App.tsx', content);


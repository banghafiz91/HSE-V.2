import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix gradients
content = content.replace(/from-\[#c2964b\] dark:from-\[#8c5a19\] dark:from-\[#c2964b\]/g, 'from-[#8c5a19] dark:from-[#c2964b]');
content = content.replace(/text-stone-900 dark:text-stone-900 dark:text-white/g, 'text-stone-900 dark:text-white');
content = content.replace(/from-\[#c2964b\] dark:from-\[#c2964b\]/g, 'from-[#c2964b]');

// We replaced some background from-[#14020a] to from-[#14020a] before (they didn't match), wait. Line 622 has `from-[#14020a] via-[#14020a]/40 to-transparent` this should be `from-white dark:from-[#14020a] via-white/40 dark:via-[#14020a]/40 to-transparent` for light mode
content = content.replace(/from-\[#14020a\] via-\[#14020a\]\/40 to-transparent/g, 'from-[#fafaf9] dark:from-[#14020a] via-[#fafaf9]/40 dark:via-[#14020a]/40 to-transparent');

// What about text-stone-900 ? Some non-gold text became text-[#cca762]. 
// For instance: `Created By Bang Hafizh Nasution` - Let's search for text-[#cca762] in general.
// The user says "kebanyakn teks kurang kontras warna teksnya dibanding dengan background"
// Let's change the remaining text-[#cca762] (which corresponds to gold color) to dark text in light mode where appropriate. 
// However, text-[#cca762] was already replaced with text-stone-700. Let's make it text-stone-800 to be even more contrasty.
content = content.replace(/text-stone-700/g, 'text-stone-800');
content = content.replace(/text-stone-600/g, 'text-stone-700');
content = content.replace(/text-stone-500/g, 'text-stone-600');
content = content.replace(/text-[#412702]/g, 'text-stone-900'); // make the headings darker too.

// Make buttons gold text darker in light mode ? Actually gold on gold background is fine. Wait, text on gold background is text-stone-900 now or text-white. We made it text-stone-900 dark:text-white which is highly contrast. 
// "Masuk" / "Daftar" buttons on inactive: `text-stone-500 dark:text-[#cca762]/60`. Let's bump it to 600.
// We just globally bumped 500 to 600.

fs.writeFileSync('src/App.tsx', content);

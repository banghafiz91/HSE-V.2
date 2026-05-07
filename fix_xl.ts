import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Also fix the text-[#412702] replacement:
// First let's undo text-[#412702] -> text-stone-900 replacement. Oh wait, text-stone-900 replaced any of those characters!
// This means any text-4, text-1, text-2, text-7, text-0 was replaced.
// Luckily "text-stone-900xl" lets us find the sizing classes easily.
content = content.replace(/text-stone-900xl md:text-6xl lg:text-stone-900xl/g, 'text-4xl md:text-6xl lg:text-7xl');
content = content.replace(/text-3xl md:text-stone-900xl/g, 'text-3xl md:text-4xl');

// The h3 elements
content = content.replace(/<h3 className="text-stone-900xl/g, '<h3 className="text-2xl');

// The h2 elements
content = content.replace(/<h2 className="text-stone-900xl font-serif font-bold text-\[\#412702\] dark:text-\[\#fdf0b0\] mb-8">Cocok Untuk/g, '<h2 className="text-2xl font-serif font-bold text-[#412702] dark:text-[#fdf0b0] mb-8">Cocok Untuk');
content = content.replace(/<h2 className="text-stone-900xl font-serif font-bold text-\[\#412702\] dark:text-\[\#fdf0b0\] mb-8">Contoh/g, '<h2 className="text-2xl font-serif font-bold text-[#412702] dark:text-[#fdf0b0] mb-8">Contoh');
content = content.replace(/<h2 className="text-stone-900xl font-serif font-bold text-\[\#412702\] dark:text-\[\#fdf0b0\] leading-tight">Bukan/g, '<h2 className="text-4xl font-serif font-bold text-[#412702] dark:text-[#fdf0b0] leading-tight">Bukan');

// Price blocks
content = content.replace(/<div className="text-stone-900xl font-serif font-bold text-\[\#412702\] dark:text-\[\#fdf0b0\]">Rp/g, '<div className="text-4xl font-serif font-bold text-[#412702] dark:text-[#fdf0b0]">Rp');

// Other headings
content = content.replace(/sm:text-stone-900xl/g, 'sm:text-2xl');
content = content.replace(/text-stone-900xl md:text-5xl/g, 'text-4xl md:text-5xl');

// What if there are other text-stone-900 values that were replaced? Such as `text-4` -> `text-stone-900`? Space-x-4 ? No, my regex matched `text-[...`. Wait: `/text-[#412702]/` matched `text-4`.
// Did it match `text-14`? `text-` followed by `1`. Yes, it would replace `text-1` with `text-stone-900`.
// Let's check if there are any other `text-stone-900\S*` that I didn't intend to replace.
// What about `text-stone-900/50`? Wait, I didn't replace `text-white` with `text-stone-900`, I specifically did `text-white ` to `text-stone-900 dark:text-white `.

// The actual replacement I made: `content.replace(/text-[#412702]/g, 'text-stone-900')`.
// So `#412702` is 7 characters long.
// If it matched `text-4`, it replaced it with `text-stone-900`.
// Let's replace the actual `text-[#412702]` string with `text-stone-900` without regex issues.
// But first, is there any `text-[#412702]` left? 
// No, the previous `text-[#412702]` was untouched because of `#`, wait...
// Regex `/text-[#412702]/` => `#` matches `#`. `4` matches `4`. Oh, the character class is `[#412702]`.
// So it matches ONE character from that set. So `text-#` or `text-4` or `text-1` or `text-2` or `text-7` or `text-0`.
// It didn't replace the full `text-[#412702]`. Because `text-[#` has two characters after `text-`.
// So `text-[#412702]` string itself was NOT matched! ONLY `text-4` etc. were matched!
// So `text-[#412702]` is STILL in the file! Let's correctly replace it.

content = content.replace(/text-\[\#412702\]/g, 'text-stone-900');

fs.writeFileSync('src/App.tsx', content);

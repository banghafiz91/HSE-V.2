import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// The image
content = content.replace(/mix-blend-screen/g, 'invert mix-blend-multiply');

// Let's also check for any text-[#c2964b] and bg-[#c2964b]
// Actually those are fine, gold on light theme looks elegant.

// Let's replace any bg-[#c2964b]/10 to something a bit more visible if needed, or leave it.
// We probably want to remove `text-[#fdf0b0]` globally if we missed it.
// We ran replace for `text-[#fdf0b0]` to `text-[#412702]` already. Let's see if there are any remaining.

// Any other "#1a050f" missed?
content = content.replace(/bg-\[#1a050f\]\/[1-9]0/g, 'bg-white');
content = content.replace(/bg-\[#14020a\]\/[1-9]0/g, 'bg-white');

fs.writeFileSync('src/App.tsx', content);

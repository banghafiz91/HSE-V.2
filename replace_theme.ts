import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/bg-\[#14020a\]/g, 'bg-[#fafaf9]');
content = content.replace(/bg-\[#0f0107\]/g, 'bg-white');
content = content.replace(/bg-\[#1a050f\]/g, 'bg-white');
content = content.replace(/bg-\[#1e030e\]/g, 'bg-white');
content = content.replace(/bg-\[#2a0614\]/g, 'bg-[#f5f5f4]');

content = content.replace(/text-\[#cca762\]\/80/g, 'text-stone-600');
content = content.replace(/text-\[#cca762\]\/60/g, 'text-stone-500');
content = content.replace(/text-\[#cca762\]\/40/g, 'text-stone-400');
content = content.replace(/text-\[#cca762\]/g, 'text-stone-700');

content = content.replace(/text-\[#fdf0b0\]/g, 'text-[#412702]');
content = content.replace(/text-\[#14020a\]/g, 'text-white');

content = content.replace(/border-\[#c2964b\]\/[1-9]0/g, 'border-[#e4d5b7]');
content = content.replace(/border-\[#cca762\]\/[1-9]0/g, 'border-[#e4d5b7]');

content = content.replace(/shadow-black\/50/g, 'shadow-stone-200');
content = content.replace(/shadow-\[#c2964b\]\/[1-9]0/g, 'shadow-[#e4d5b7]');
content = content.replace(/shadow-black\/40/g, 'shadow-stone-100');
content = content.replace(/shadow-black/g, 'shadow-stone-200');

content = content.replace(/from-\[#fdf0b0\] via-\[#c2964b\] to-\[#412702\]/g, 'from-[#412702] via-[#855e1c] to-[#c2964b]');

// Make the inputs look lighter
content = content.replace(/placeholder:text-\[#cca762\]\/40/g, 'placeholder:text-stone-400');

// specifically for gradient block
// "text-[#14020a]" was replaced to "text-white". Some buttons use "text-[#14020a]" with gold background. If bg is gold, white text is okay, but dark text is better for contrast on gold!
// Wait, "#c2964b" is gold. Text on gold should be "#ffffff" or "#1c1917".
content = content.replace(/text-white rounded-xl/g, 'text-white rounded-xl');

fs.writeFileSync('src/App.tsx', content);

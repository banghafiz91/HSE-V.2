import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Global changes (excluding the login page which is already mostly stylized)
// Main body
content = content.replace(/<div className="min-h-screen bg-stone-50 font-sans pb-24 relative">/g, '<div className="min-h-screen bg-[#14020a] text-[#cca762] font-sans pb-24 relative">');

// Header
content = content.replace(/<header className="bg-stone-900 text-amber-500 sticky top-0 z-40 shadow-md">/g, '<header className="bg-[#0f0107] text-[#cca762] sticky top-0 z-40 shadow-md border-b border-[#cca762]/20">');
content = content.replace(/text-stone-400 hover:text-white/g, 'text-[#cca762]/60 hover:text-[#c2964b]');

// Cards
content = content.replace(/bg-white rounded-2xl shadow-sm border border-stone-200/g, 'bg-[#1e030e] rounded-2xl shadow-xl shadow-black/40 border border-[#cca762]/20');
content = content.replace(/bg-white border border-stone-100 rounded-xl/g, 'bg-[#1e030e] border border-[#cca762]/20 rounded-xl');

// Texts
content = content.replace(/text-stone-900/g, 'text-[#c2964b]');
content = content.replace(/text-stone-500/g, 'text-[#cca762]/70');
content = content.replace(/text-stone-600/g, 'text-[#cca762]/80');
content = content.replace(/text-stone-400/g, 'text-[#cca762]/60');
content = content.replace(/text-stone-700/g, 'text-[#cca762]/80');
content = content.replace(/text-white/g, 'text-[#c2964b]');

// Borders
content = content.replace(/border-stone-200/g, 'border-[#cca762]/30');
content = content.replace(/border-stone-100/g, 'border-[#cca762]/20');
content = content.replace(/border-stone-50/g, 'border-[#cca762]/10');

// Inputs & dropdowns
content = content.replace(/bg-stone-50/g, 'bg-[#0f0107]');
content = content.replace(/bg-stone-100/g, 'bg-[#2a0614]');
content = content.replace(/bg-amber-50/g, 'bg-[#c2964b]/10');
content = content.replace(/placeholder:text-stone-400/g, 'placeholder:text-[#cca762]/40');

// Pills
content = content.replace(/bg-amber-500 border-amber-600 text-white/g, 'bg-gradient-to-r from-[#c2964b] to-[#cca762] border-[#c2964b] text-[#14020a]');
content = content.replace(/text-stone-600 hover:border-amber-400/g, 'text-[#cca762]/80 hover:border-[#c2964b]');

// Buttons
content = content.replace(/bg-stone-900/g, 'bg-[#c2964b]');
content = content.replace(/text-amber-500/g, 'text-[#14020a]');
content = content.replace(/hover:bg-stone-800/g, 'hover:opacity-90');

// Other specific bits
content = content.replace(/text-[#cca762]\/80 hover:border-amber-400/g, 'text-[#cca762]/80 hover:border-[#c2964b]');
content = content.replace(/bg-amber-200/g, 'bg-[#c2964b]/30');
content = content.replace(/border-amber-500/g, 'border-[#c2964b]');

// Prevent breaking icons/logo
// No specific changes needed for icon if they inherit currentColor

fs.writeFileSync('src/App.tsx', content);

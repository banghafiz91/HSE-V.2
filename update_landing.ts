import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace Top Button
content = content.replace(
  `<div className="flex justify-center gap-4 pt-8">
               <button onClick={() => setCurrentView('auth')} className="px-10 py-5 flex items-center gap-3 bg-gradient-to-r from-[#c2964b] via-[#cca762] to-[#c2964b] text-stone-900 dark:text-[#14020a] rounded-xl font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-[#e4d5b7] dark:shadow-[#c2964b]/20 border border-[#e0c691] dark:border-[#c2964b] hover:-translate-y-0.5">
                 Gunakan Sekarang <Zap className="w-5 h-5" />
               </button>
            </div>`,
  `<div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
               <button onClick={() => setCurrentView('auth')} className="px-10 py-5 flex items-center justify-center gap-3 bg-gradient-to-r from-[#c2964b] via-[#cca762] to-[#c2964b] text-stone-900 dark:text-[#14020a] rounded-xl font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-[#e4d5b7] dark:shadow-[#c2964b]/20 border border-[#e0c691] dark:border-[#c2964b] hover:-translate-y-0.5">
                 Gunakan Reguler <Zap className="w-5 h-5" />
               </button>
               <button onClick={() => setCurrentView('auth')} className="px-10 py-5 flex items-center justify-center gap-3 bg-transparent text-amber-700 dark:text-[#c2964b] rounded-xl font-bold uppercase tracking-wider hover:bg-[#c2964b]/10 transition-all border border-[#e4d5b7] dark:border-[#c2964b]/30">
                 Coba Gratis
               </button>
            </div>`
);

// Replace Bottom Button
content = content.replace(
  `<button onClick={() => setCurrentView('auth')} className="px-12 py-6 bg-gradient-to-r from-[#c2964b] via-[#cca762] to-[#c2964b] text-stone-900 dark:text-[#14020a] rounded-xl font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-[#e4d5b7] dark:shadow-[#c2964b]/20 border border-[#e0c691] dark:border-[#c2964b] hover:-translate-y-1 text-lg">
               Gunakan Sekarang 🔥
             </button>`,
  `<div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
               <button onClick={() => setCurrentView('auth')} className="px-12 py-6 bg-gradient-to-r from-[#c2964b] via-[#cca762] to-[#c2964b] text-stone-900 dark:text-[#14020a] rounded-xl font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-[#e4d5b7] dark:shadow-[#c2964b]/20 border border-[#e0c691] dark:border-[#c2964b] hover:-translate-y-1 text-lg">
                 Gunakan Reguler 🔥
               </button>
               <button onClick={() => setCurrentView('auth')} className="px-12 py-6 bg-transparent text-amber-700 dark:text-[#c2964b] rounded-xl font-bold uppercase tracking-widest hover:bg-[#c2964b]/10 transition-all border border-[#e4d5b7] dark:border-[#c2964b]/30 text-lg">
                 Coba Gratis
               </button>
             </div>`
);

// Replace Pricing Text
content = content.replace(
  `<h2 className="text-3xl font-serif font-bold text-center text-amber-700 dark:text-[#c2964b] mb-12 uppercase tracking-widest">Pilih Paket Anda</h2>`,
  `<div className="text-center mb-12"><h2 className="text-3xl font-serif font-bold text-amber-700 dark:text-[#c2964b] uppercase tracking-widest mb-3">Pilih Paket Profesional</h2><p className="text-stone-600 dark:text-[#cca762]/80 uppercase tracking-widest text-sm font-medium">Anda juga bisa mencoba secara gratis dengan fitur terbatas.</p></div>`
);

fs.writeFileSync('src/App.tsx', content);

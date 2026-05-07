import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. In Level Upgrade Select
content = content.replace(
  'options={LEVEL_UPGRADE}',
  'options={isTrialActive ? ["Level 1: Bibit + Bibit (Free Trial)"] : LEVEL_UPGRADE}'
);

// We need to make sure 'Level 1: Bibit + Bibit (Free Trial)' overrides the value safely, or just force it on submit.
// Wait! If `isTrialActive` is true, what if `form.levelUpgrade` is empty? 
// If `options={...}`, they can select "Level 1: Bibit + Bibit (Free Trial)".

// Let's modify the Export PDF button:
content = content.replace(
  '<button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 bg-[#c2964b] text-stone-900 dark:text-[#14020a] hover:text-amber-400 rounded-xl font-medium text-sm transition-colors shadow-sm">',
  `<button onClick={() => { if (isTrialActive) { alert("Fitur Export PDF hanya tersedia untuk Akun Premium (Berbayar). Silakan upgrade."); return; } handleExportPDF(); }} className="flex items-center gap-2 px-4 py-2 bg-[#c2964b] text-stone-900 dark:text-[#14020a] hover:text-amber-400 rounded-xl font-medium text-sm transition-colors shadow-sm">
    {isTrialActive && <Lock className="w-4 h-4 text-stone-900 dark:text-[#14020a] mr-1" />}`
);

// Wait, the button has `dark:text-[#14020a]`, but earlier I changed it to `dark:text-white`! Let me use regex for Export PDF button:
// Or use `edit_file` tool to be precise.

fs.writeFileSync('src/App.tsx', content);

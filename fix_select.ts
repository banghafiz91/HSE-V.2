import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'className={disabled ? "text-stone-400" : ""}',
  'className={disabled ? "text-red-500 dark:text-red-400" : "text-stone-800 dark:text-[#cca762]"}'
);
content = content.replace(
  '<option value="" disabled className="text-stone-400">',
  '<option value="" disabled className="text-stone-400 dark:text-[#cca762]/60">'
);

fs.writeFileSync('src/App.tsx', content);

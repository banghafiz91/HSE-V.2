import fs from 'fs';
['GAS_Setup/Code.gs', 'src/services/geminiService.ts'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/gemini-1\.5-flash/g, 'gemini-2.5-flash');
  fs.writeFileSync(file, content);
});
console.log('Updated models');

import fs from 'fs';
let codeGs = fs.readFileSync('GAS_Setup/Code.gs', 'utf8');
codeGs = codeGs.replace(/\\n/g, '\n');
fs.writeFileSync('GAS_Setup/Code.gs', codeGs);
console.log("Fixed");

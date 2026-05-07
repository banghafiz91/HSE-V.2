import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'if (allowed.includes(op)) return op;',
  `if (allowed.includes(op)) {
      if (op === "Level 1: Bibit + Bibit") return "Level 1: Bibit + Bibit (Mode Trial)";
      return op;
    }`
);

// Level Upgrade System edit
content = content.replace(
  'options={isTrialActive ? ["Level 1: Bibit + Bibit (Mode Trial)"] : LEVEL_UPGRADE}',
  'options={filterTrialOptions(LEVEL_UPGRADE, ["Level 1: Bibit + Bibit"], isTrialActive)}'
);

fs.writeFileSync('src/App.tsx', content);

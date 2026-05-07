import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add helper function after component imports
content = content.replace(
  'const PremiumBottle = ({ className }: { className?: string }) => (',
  `const filterTrialOptions = (options: string[], allowed: string[], isTrialActive: boolean): (string | {label: string, disabled: boolean})[] => {
  if (!isTrialActive) return options;
  return options.map(op => {
    if (allowed.includes(op)) return op;
    return { label: \`\${op} 🔒\`, disabled: true };
  });
};

const PremiumBottle = ({ className }: { className?: string }) => (`
);

// Kelompok Problem
content = content.replace(
  'options={["SPL Performance", "Aroma Character"]}',
  'options={filterTrialOptions(["SPL Performance", "Aroma Character"], ["SPL Performance"], isTrialActive)}'
);

// Market Level
content = content.replace(
  'options={MARKET_LEVEL}',
  'options={filterTrialOptions(MARKET_LEVEL, ["Low market", "Middle market"], isTrialActive)}'
);

// Style Aroma
content = content.replace(
  'options={STYLE_AROMA}',
  'options={filterTrialOptions(STYLE_AROMA, ["Fresh office style", "Clubbing style"], isTrialActive)}'
);

// Intensitas Aroma
content = content.replace(
  'options={INTENSITAS}',
  'options={filterTrialOptions(INTENSITAS, ["Moderate", "Strong & Loud"], isTrialActive)}'
);

fs.writeFileSync('src/App.tsx', content);

import * as fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(
  'const LEVEL_UPGRADE = ["Level 1: Bibit + Bibit", "Level 2: Bibit + Aroma Chemical", "Level 3: Bibit + AC + EO/FO", "Level 4: Creative Hybrid Builder", "Level 5: Structure Building System"];',
  'const LEVEL_UPGRADE = ["Level 1: Bibit + Bibit", "Level 2: Bibit + RAW Material", "Level 3: Bibit + RAW Material + EO/FO", "Level 4: Creative Hybrid Builder", "Level 5: Structure Building System"];'
);
app = app.replace(
  'Rekomendasi Aroma Chemical, EO, FO & blend DNA parfum lain berdasarkan target hasil',
  'Rekomendasi RAW Material, EO, FO & blend DNA parfum lain berdasarkan target hasil'
);
app = app.replace(
  'penambahan material Aroma Chemical & Essential Oil',
  'penambahan RAW Material & Essential Oil'
);
app = app.replace(
  "'Rekomendasi aroma chemical'",
  "'Rekomendasi RAW material'"
);
app = app.replace(
  "'fungsi AC'",
  "'fungsi RAW material'"
);
fs.writeFileSync('src/App.tsx', app);

let gemini = fs.readFileSync('src/services/geminiService.ts', 'utf8');
gemini = gemini.replace(/AROMA CHEMICALS DATABASE/g, 'RAW MATERIALS DATABASE');
gemini = gemini.replace(/Aroma Chemical/ig, 'RAW Material');
gemini = gemini.replace(/ \+ AC \+/g, ' + RAW Material +');
gemini = gemini.replace(/, AC \(/g, ', RAW Material (');
fs.writeFileSync('src/services/geminiService.ts', gemini);

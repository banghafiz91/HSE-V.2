import * as fs from 'fs';

let content = fs.readFileSync('src/services/geminiService.ts', 'utf8');

const regex = /const getApiKey = \(\) => \{\n  if \(typeof import.meta !== 'undefined' && import.meta.env\) \{\n    return import.meta.env.VITE_GEMINI_API_KEY \|\| import.meta.env.VITE_API_KEY \|\| "dummy";\n  \}\n  if \(typeof process !== 'undefined' && process.env\) \{\n    return process.env.GEMINI_API_KEY \|\| "dummy";\n  \}\n  return "dummy";\n\};\n\nconst ai = new GoogleGenAI\(\{ apiKey: getApiKey\(\) \}\);/g;

const replacement = `const getApiKey = () => {
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('user_gemini_api_key');
    if (localKey && localKey.trim() !== '') return localKey.trim();
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY || "dummy";
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env.GEMINI_API_KEY || "dummy";
  }
  return "dummy";
};

let _aiInstance: GoogleGenAI | null = null;
let _currentApiKey: string | null = null;

const getAIClient = () => {
  const key = getApiKey();
  if (!_aiInstance || _currentApiKey !== key) {
    _aiInstance = new GoogleGenAI({ apiKey: key });
    _currentApiKey = key;
  }
  return _aiInstance;
};`;

content = content.replace(regex, replacement);

content = content.replace(/await ai\.models/g, 'await getAIClient().models');

fs.writeFileSync('src/services/geminiService.ts', content);

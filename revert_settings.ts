import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove state variables
content = content.replace(/  const \[showSettings, setShowSettings\] = useState\(false\);\n  const \[userApiKey, setUserApiKey\] = useState\(localStorage\.getItem\('user_gemini_api_key'\) \|\| ""\);\n  const \[settingsStatus, setSettingsStatus\] = useState\(""\);\n/g, "");

// 2. Remove settings button in the top nav
content = content.replace(/\n            <button onClick=\{\(\) => setShowSettings\(true\)\} className="text-stone-600 dark:text-\[\#3395FF\]\/60 hover:text-\[\#007BFF\] dark:text-\[\#007BFF\] flex items-center gap-2 text-sm font-medium transition-colors">\n              <Settings className="w-4 h-4" \/> Settings\n            <\/button>/g, "");

// 3. Remove Settings modal
content = content.replace(/      <AnimatePresence>\n        \{showSettings && \([\s\S]*?      <\/AnimatePresence>\n/g, "");

fs.writeFileSync('src/App.tsx', content);

let gemini = fs.readFileSync('src/services/geminiService.ts', 'utf8');

gemini = gemini.replace(/const getApiKey = \(\) => \{\n  if \(typeof window !== 'undefined'\) \{\n    const localKey = localStorage\.getItem\('user_gemini_api_key'\);\n    if \(localKey && localKey\.trim\(\) !== ''\) return localKey\.trim\(\);\n  \}\n  if \(typeof import\.meta !== 'undefined' && import\.meta\.env\) \{\n    return import\.meta\.env\.VITE_GEMINI_API_KEY \|\| import\.meta\.env\.VITE_API_KEY \|\| "dummy";\n  \}\n  if \(typeof process !== 'undefined' && process\.env\) \{\n    return process\.env\.GEMINI_API_KEY \|\| "dummy";\n  \}\n  return "dummy";\n\};\n\nlet _aiInstance: GoogleGenAI \| null = null;\nlet _currentApiKey: string \| null = null;\n\nconst getAIClient = \(\) => \{\n  const key = getApiKey\(\);\n  if \(!_aiInstance \|\| _currentApiKey !== key\) \{\n    _aiInstance = new GoogleGenAI\(\{ apiKey: key \}\);\n    _currentApiKey = key;\n  \}\n  return _aiInstance;\n\};/g, 
`const getApiKey = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY || "dummy";
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env.GEMINI_API_KEY || "dummy";
  }
  return "dummy";
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });`);

gemini = gemini.replace(/await getAIClient\(\)\.models/g, 'await ai.models');

fs.writeFileSync('src/services/geminiService.ts', gemini);

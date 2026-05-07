import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const anchor1 = `  const [showHistory, setShowHistory] = useState(false);`;
const insert1 = `  const [showHistory, setShowHistory] = useState(false);\n  const [showSettings, setShowSettings] = useState(false);\n  const [userApiKey, setUserApiKey] = useState(localStorage.getItem('user_gemini_api_key') || "");\n  const [settingsStatus, setSettingsStatus] = useState("");`;

content = content.replace(anchor1, insert1);

const anchor2 = `            <button onClick={() => setShowHistory(true)} className="text-stone-600 dark:text-[#3395FF]/60 hover:text-[#007BFF] dark:text-[#007BFF] flex items-center gap-2 text-sm font-medium transition-colors">
              <History className="w-4 h-4" /> History
            </button>`;
const insert2 = anchor2 + `\n            <button onClick={() => setShowSettings(true)} className="text-stone-600 dark:text-[#3395FF]/60 hover:text-[#007BFF] dark:text-[#007BFF] flex items-center gap-2 text-sm font-medium transition-colors">
              <Settings className="w-4 h-4" /> Settings
            </button>`;

content = content.replace(anchor2, insert2);

const anchorModals = `<AnimatePresence>
        {showHistory && (`;
const settingsModal = `      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSettings(false)} className="fixed inset-0 bg-stone-900/60 dark:bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-[#0A192F] rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-4 border-b border-[#CCE5FF] dark:border-[#007BFF]/30 flex items-center justify-between bg-stone-50 dark:bg-[#112240]">
                <h2 className="font-bold text-[#007BFF] dark:text-[#007BFF] flex items-center gap-2">
                  <Settings className="w-5 h-5" /> Settings
                </h2>
                <button onClick={() => setShowSettings(false)} className="p-2 text-stone-400 hover:text-stone-600 dark:text-[#3395FF]/60 dark:hover:text-[#3395FF] rounded-xl hover:bg-stone-200 dark:hover:bg-[#112240] transition-colors"><X className="w-5 h-5"/></button>
              </div>
              <div className="p-4 overflow-y-auto">
                <p className="text-sm text-stone-600 dark:text-[#3395FF]/80 mb-4">
                  Masukkan Gemini API Key Anda sendiri untuk menghindari limit kuota. API Key akan disimpan di browser Anda secara lokal. Dapatkan di <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[#007BFF] hover:underline">Google AI Studio</a>.
                </p>
                <div className="space-y-4">
                  <div>
                    <Label>Google Gemini API Key</Label>
                    <input type="text" placeholder="AIzaSy..." value={userApiKey} onChange={(e) => setUserApiKey(e.target.value)} className="w-full px-4 py-3 bg-[#F8F9FA] dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 text-stone-800 dark:text-[#3395FF] placeholder:text-stone-400 dark:placeholder:text-[#3395FF]/40 rounded-xl focus:ring-2 focus:ring-[#007BFF] outline-none transition-all focus:border-[#99CCFF] dark:border-[#007BFF]" />
                  </div>
                  {settingsStatus && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm text-center font-medium">
                      {settingsStatus}
                    </div>
                  )}
                  <button onClick={() => {
                    localStorage.setItem('user_gemini_api_key', userApiKey);
                    setSettingsStatus('API Key berhasil disimpan!');
                    setTimeout(() => setSettingsStatus(''), 3000);
                  }} className="w-full py-3 bg-gradient-to-r from-[#007BFF] to-[#3395FF] text-white rounded-xl font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md shadow-[#CCE5FF] dark:shadow-[#007BFF]/20 border border-[#99CCFF] dark:border-[#007BFF]">
                    Simpan Settings
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showHistory && (`;

content = content.replace(anchorModals, settingsModal);

fs.writeFileSync('src/App.tsx', content);

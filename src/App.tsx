/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Beaker, Wind, Zap, AlertCircle, CheckCircle2, ChevronRight, Activity, TrendingUp, Droplets, BookOpen, Download, History, X, Clock, Sparkles, Microscope, Check, Target, FlaskConical, TestTube, Moon, Sun, Lock, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { cn } from './lib/utils';
import { generateUpgradeFormulation } from './services/geminiService';
import ambroxanImage from './assets/images/regenerated_image_1777909636598.jpg';
import hedioneImage from './assets/images/regenerated_image_1777909640423.jpg';
import smoothImage from './assets/images/regenerated_image_1777911202405.jpg';

const filterTrialOptions = (options: string[], allowed: string[], isTrialActive: boolean): (string | {label: string, disabled: boolean})[] => {
  if (!isTrialActive) return options;
  return options.map(op => {
    if (allowed.includes(op)) {
      if (op === "Level 1: Bibit + Bibit") return "Level 1: Bibit + Bibit (Mode Trial)";
      return op;
    }
    return { label: `${op} 🔒`, disabled: true };
  });
};

const PremiumBottle = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M10 3l4 0l1 3l-6 0z" fill="currentColor" fillOpacity="0.3" />
    <path d="M10 3l4 0l1 3l-6 0z" />
    <rect x="11" y="6" width="2" height="2" />
    <path d="M9 8h6" />
    <path d="M7 11c0-1.5 1-3 2-3h6c1 0 2 1.5 2 3l1 9a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
    <rect x="9" y="13" width="6" height="5" rx="1" strokeOpacity="0.8" />
    <path d="M10 13v5" strokeOpacity="0.3" />
    <path d="M14 13v5" strokeOpacity="0.3" />
    <path d="M7 15c2 1 5 -1 10 0" strokeOpacity="0.4" />
  </svg>
);

const CreatorFooter = () => (
  <div className="flex flex-col items-center justify-center mt-8 pb-4 space-y-2 opacity-80 hover:opacity-100 transition-opacity">
    <img 
      src="https://www.image2url.com/r2/default/images/1777834575973-3c8d16bf-becb-45c1-acd6-38bf1c3e979f.jfif" 
      alt="Bang Hafizh Nasution" 
      className="w-12 h-12 rounded-full object-cover border-2 border-[#99CCFF] dark:border-[#007BFF] shadow-md"
    />
    <p className="text-sm font-medium text-stone-700 dark:text-[#3395FF]/80">Created By Bang Hafizh Nasution</p>
  </div>
);

const Card = ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <div className={cn("bg-white dark:bg-[#112240] rounded-2xl shadow-xl shadow-stone-200 dark:shadow-black/40 border border-[#CCE5FF] dark:border-[#007BFF]/30 p-6", className)} {...props}>
    {children}
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-stone-700 dark:text-[#3395FF]/80 mb-2">{children}</label>
);

const Select = ({ value, onChange, options, placeholder }: { value: string, onChange: (v: string) => void, options: (string | { label: string, disabled: boolean })[], placeholder: string }) => (
  <select 
    value={value} 
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-4 py-3 bg-white dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 rounded-xl focus:ring-2 focus:ring-[#FF8C00] outline-none transition-all appearance-none"
  >
    <option value="" disabled>{placeholder}</option>
    {options.map((op, i) => {
      const isObj = typeof op !== 'string';
      const label = isObj ? (op as any).label : op;
      const val = isObj ? (op as any).label.replace(' 🔒', '') : op;
      const disabled = isObj ? (op as any).disabled : false;
      return <option key={i} value={val} disabled={disabled} className={disabled ? "text-red-500 dark:text-red-400" : "text-stone-800 dark:text-[#3395FF]"}>{label as string}</option>;
    })}
  </select>
);

const MultiSelectPills = ({ values, onChange, options, limit }: { values: string[], onChange: (v: string[]) => void, options: string[], limit: number }) => (
  <div className="flex flex-wrap gap-2">
    {options.map(o => {
      const isSelected = values.includes(o);
      return (
        <button
          key={o}
          onClick={(e) => {
            e.preventDefault();
            if (isSelected) {
              onChange(values.filter(v => v !== o));
            } else if (values.length < limit) {
              onChange([...values, o]);
            }
          }}
          className={cn(
            "px-3 py-1.5 text-sm rounded-full border transition-all duration-200 active:scale-95",
            isSelected 
              ? "bg-[#007BFF]/100 border-[#FF8C00] text-[#007BFF] dark:text-[#007BFF] font-medium shadow-sm" 
              : "bg-[#F8F9FA] dark:bg-[#0A192F] border-[#CCE5FF] dark:border-[#007BFF]/30 text-stone-700 dark:text-[#3395FF]/80 hover:border-[#99CCFF] dark:border-[#007BFF] disabled:opacity-50 disabled:active:scale-100"
          )}
          disabled={!isSelected && values.length >= limit}
        >
          {o}
        </button>
      );
    })}
  </div>
);

// Constants
const KARAKTER_AROMA = ["Fresh", "Citrus", "Woody", "Amber", "Floral", "Gourmand", "Musky", "Aromatic", "Green", "Aquatic", "Powdery", "Fruity", "Spicy", "Leather", "Smoky"];
const GENDER_MARKET = ["Pria", "Wanita", "Unisex"];
const MARKET_LEVEL = ["Low market", "Middle market", "Premium market", "Niche style"];
const STYLE_AROMA = ["Designer style", "Arabian style", "Niche style", "Luxury hotel style", "Fresh office style", "Clubbing style", "Korean clean style", "Middle eastern style", "Minimalist style"];
const LEVEL_UPGRADE = ["Level 1: Bibit + Bibit", "Level 2: Bibit + RAW Material", "Level 3: Bibit + RAW Material + EO/FO", "Level 4: Creative Hybrid Builder", "Level 5: Structure Building System"];
const INTENSITAS = ["Soft & Intimate", "Moderate", "Strong & Loud", "Beast Mode"];

import { parfumDatabase } from './data/parfumDatabase';
import { DYNAMIC_PROBLEM_ENGINE } from './data/dynamicEngine';

const DAFTAR_PARFUM = parfumDatabase.map(p => p.name);

const PARFUM_DATA: Record<string, string> = parfumDatabase.reduce((acc, curr) => {
  acc[curr.name] = `${curr.family} (${curr.character})`;
  return acc;
}, {} as Record<string, string>);

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'panduan' | 'tools'>('landing');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const ThemeToggle = () => (
    <button 
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 shadow-lg shadow-black dark:shadow-black/40 text-stone-800 dark:text-[#3395FF] hover:scale-110 transition-transform"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [showParfumDropdown, setShowParfumDropdown] = useState(false);
  const [showKarakterDropdown, setShowKarakterDropdown] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPackage, setRegisterPackage] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState<{email: string, password: string}[]>([]);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  // History state
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (isAuthenticated && email) {
      const saved = localStorage.getItem(`history_${email}`);
      if (saved) {
        try {
          setHistory(JSON.parse(saved));
        } catch (e) {}
      } else {
        setHistory([]);
      }
    }
  }, [isAuthenticated, email]);

  const saveToHistory = (newForm: any, newResult: any) => {
    const newItem = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      form: newForm,
      result: newResult
    };
    const updatedHistory = [newItem, ...history].slice(0, 50);
    setHistory(updatedHistory);
    localStorage.setItem(`history_${email}`, JSON.stringify(updatedHistory));
  };

  const loadFromHistory = (item: any) => {
    setForm(item.form);
    setResult(item.result);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const saved = localStorage.getItem('savedAccounts');
    if (saved) {
      try {
        setSavedAccounts(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveAccount = (emailToSave: string, passToSave: string) => {
    const existing = savedAccounts.filter(a => a.email !== emailToSave);
    const newAccounts = [{ email: emailToSave, password: passToSave }, ...existing].slice(0, 5); // Keep last 5
    setSavedAccounts(newAccounts);
    localStorage.setItem('savedAccounts', JSON.stringify(newAccounts));
  };

  // Form State
  const [form, setForm] = useState({
    namaBibit: "",
    karakterAroma: "",
    kelompokProblem: "",
    subProblem: "",
    turunanProblem: [] as string[],
    targetHasil: [] as string[],
    genderMarket: "",
    marketLevel: "",
    styleAroma: "",
    levelUpgrade: "",
    intensitasAroma: "",
    tipeHasil: ""
  });
  
  // Dynamic Options
  const subProblemOptions = form.kelompokProblem ? Object.keys(DYNAMIC_PROBLEM_ENGINE[form.kelompokProblem as keyof typeof DYNAMIC_PROBLEM_ENGINE] || {}) : [];
  const currentSubProblemData = form.kelompokProblem && form.subProblem ? DYNAMIC_PROBLEM_ENGINE[form.kelompokProblem as keyof typeof DYNAMIC_PROBLEM_ENGINE]?.[form.subProblem] : null;
  
  const PROBLEM_TURUNAN = currentSubProblemData?.turunan || [];
  const TARGET_HASIL = currentSubProblemData?.target || [];

  const handleKelompokProblemChange = (val: string) => {
    setForm(prev => ({
      ...prev,
      kelompokProblem: val,
      subProblem: "",
      turunanProblem: [],
      targetHasil: []
    }));
  };

  const handleSubProblemChange = (val: string) => {
    setForm(prev => ({
      ...prev,
      subProblem: val,
      turunanProblem: [],
      targetHasil: []
    }));
  };
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleExportPDF = () => {
    if (!result) return;
    
    const doc = new jsPDF();
    
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Hybrid Scent Engineer Upgrade Analysis", 14, 20);
    
    doc.setFontSize(14);
    doc.text("User Input", 14, 30);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`1. Nama Bibit Utama: ${form.namaBibit || '-'}`, 14, 40);
    doc.text(`2. Karakter Aroma: ${form.karakterAroma || '-'}`, 14, 47);
    doc.text(`3. Problem Parfum: ${form.kelompokProblem} - ${form.subProblem}`, 14, 54);
    doc.text(`   Turunan: ${form.turunanProblem.length > 0 ? form.turunanProblem.join(", ") : '-'}`, 14, 61);
    doc.text(`4. Target Hasil: ${form.targetHasil.length > 0 ? form.targetHasil.join(", ") : '-'}`, 14, 68);
    doc.text(`5. Gender Market: ${form.genderMarket || '-'}`, 14, 75);
    doc.text(`6. Market Level: ${form.marketLevel || '-'}`, 14, 82);
    doc.text(`7. Style Aroma: ${form.styleAroma || '-'}`, 14, 89);
    doc.text(`8. Level Upgrade Target: ${form.levelUpgrade || '-'}`, 14, 96);
    doc.text(`9. Intensitas Aroma: ${form.intensitasAroma || '-'}`, 14, 103);
    doc.text(`10. Tipe Hasil: ${form.tipeHasil || '-'}`, 14, 110);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Rekomendasi Formula", 14, 122);
    
    // Table
    autoTable(doc, {
      startY: 127,
      head: [['Material', 'Fungsi', 'Persentase', 'Alasan']],
      body: result.formula.map((item: any) => [item.material, item.fungsi, item.persen, item.alasan]),
      theme: 'grid',
      headStyles: { fillColor: [99, 102, 241] } // indigo-500
    });
    
    let finalY = (doc as any).lastAutoTable.finalY + 10;
    
    const checkPageBreak = (neededSpace: number) => {
      if (finalY + neededSpace > 280) {
        doc.addPage();
        finalY = 20;
      }
    };
    
    checkPageBreak(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Analisis Hasil", 14, finalY);
    
    finalY += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Karakter Aroma: ${result.analisa?.karakterAroma || '-'}`, 14, finalY); finalY += 7;
    doc.text(`Market Style: ${result.analisa?.marketStyle || '-'}`, 14, finalY); finalY += 7;
    doc.text(`Compatibility Score: ${result.analisa?.compatibilityScore || '-'}/100`, 14, finalY); finalY += 10;
    
    checkPageBreak(35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Performance Score", 14, finalY);
    
    finalY += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Projection: ${result.analisa?.projectionScore || '-'}`, 14, finalY); finalY += 7;
    doc.text(`Longevity: ${result.analisa?.longevityScore || '-'}`, 14, finalY); finalY += 7;
    doc.text(`Smoothness: ${result.analisa?.smoothnessScore || '-'}`, 14, finalY); finalY += 10;
    
    if (result.warnings && result.warnings.length > 0) {
      checkPageBreak(25);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(220, 38, 38); // red-600
      doc.text("Warning Blending", 14, finalY);
      doc.setTextColor(0, 0, 0);
      finalY += 8;
      
      doc.setFont("helvetica", "normal");
      result.warnings.forEach((w: string) => {
        const splitW = doc.splitTextToSize(`- ${w}`, 180);
        checkPageBreak(splitW.length * 7);
        doc.text(splitW, 14, finalY);
        finalY += splitW.length * 7;
      });
      finalY += 3;
    }
    
    if (result.smartSuggestion) {
      checkPageBreak(25);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(217, 119, 6); // amber-600
      doc.text("Smart Suggestion (Next Improvement)", 14, finalY);
      doc.setTextColor(0, 0, 0);
      finalY += 8;
      
      doc.setFont("helvetica", "normal");
      const splitText = doc.splitTextToSize(result.smartSuggestion, 180);
      checkPageBreak(splitText.length * 7);
      doc.text(splitText, 14, finalY);
    }
    
    doc.save("formula-upgrade-parfum.pdf");
  };

  const handleLogin = async () => {
    if (!email || !password) { setAuthError("Email dan Password wajib diisi"); return; }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthError("Format email tidak valid");
      return;
    }

    if (email === "user@gmail.com" && password === "123456") { 
      saveAccount(email, password);
      setIsAuthenticated(true); 
      setIsTrialActive(false);
      setCurrentView('panduan');
      return; 
    }

    setIsAuthenticating(true); setAuthError(""); setAuthSuccess("");
    const gasUrl = "https://script.google.com/macros/s/AKfycbxpybFgr2LVDRjOsoShd7_UElhmDgmTU3GrYqTEJioDYNDDiOZyUbluULereSE3SK-9/exec";

    try {
      const response = await fetch(gasUrl, {
        method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "login", email, password })
      });
      const data = await response.json();
      if (data.success) { 
        saveAccount(email, password);
        setIsAuthenticated(true); 
        setIsTrialActive(false);
        setCurrentView('panduan');
      } 
      else { setAuthError(data.message || "Email atau password salah"); }
    } catch (error) { 
      setAuthError("Gagal terhubung ke server. Jika error CORS/Network, buka aplikasi ini di Tab Baru (Open in New Tab) karena preview iFrame sering memblokir Google Apps Script."); 
    } 
    finally { setIsAuthenticating(false); }
  };

  const handleRegister = async () => {
    if (!registerName || !email || !password || !registerPhone || !registerPackage) { setAuthError("Semua kolom (termasuk paket) wajib diisi"); return; }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthError("Format email tidak valid");
      return;
    }

    // Validate WhatsApp number starts with 628
    const cleanPhone = registerPhone.replace(/\D/g, '');
    if (!cleanPhone.startsWith("628")) {
      setAuthError("Format nomor WhatsApp wajib diawali 628 (contoh: 6281234...) bukan 08");
      return;
    }
    
    setIsAuthenticating(true); setAuthError(""); setAuthSuccess("");
    const gasUrl = "https://script.google.com/macros/s/AKfycbxpybFgr2LVDRjOsoShd7_UElhmDgmTU3GrYqTEJioDYNDDiOZyUbluULereSE3SK-9/exec"; 

    try {
      let expDays = 30;
      if (registerPackage.toLowerCase().includes("bulan")) expDays = 30;
      else if (registerPackage.toLowerCase().includes("tahun")) expDays = 365;
      else if (registerPackage.toLowerCase().includes("lifetime")) expDays = 36500;

      const expDate = new Date(); expDate.setDate(expDate.getDate() + expDays);
      
      const response = await fetch(gasUrl, {
        method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ 
          action: "register", email, password, username: registerName, whatsapp: cleanPhone, paket: registerPackage, expired_date: expDate.toISOString() 
        })
      });
      const data = await response.json();
      if (data.success) {
        setAuthSuccess(data.message || "Pendaftaran berhasil! Silakan masuk.");
        setEmail(""); setPassword(""); setRegisterName(""); setRegisterPhone(""); setRegisterPackage("");
        setTimeout(() => setAuthView('login'), 3000);
      } else { setAuthError(data.message || "Gagal melakukan pendaftaran"); }
    } catch (error) { 
      setAuthError("Gagal terhubung ke server/CORS. Buka app di tab baru. (URL: " + gasUrl + ") Log: " + (error instanceof Error ? error.message : String(error))); 
    } 
    finally { setIsAuthenticating(false); }
  };

  // Clean up state changes during render
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A192F] flex flex-col items-center p-4 lg:p-12 font-sans relative overflow-x-hidden pt-20">
        <ThemeToggle />
        <div className="max-w-6xl mx-auto w-full space-y-24 relative z-10">
          
          <div className="w-full flex justify-center pt-4">
            <img src="https://www.image2url.com/r2/default/images/1777915122359-6b7d58b8-6cf4-4e7b-ad71-24c28c82986f.png" alt="Hero Banner" className="w-[400px] h-[200px] rounded-3xl border border-[#CCE5FF] dark:border-[#007BFF]/30 shadow-[0_0_30px_rgba(194,150,75,0.15)] object-cover" />
          </div>

          {/* Hero Section */}
          <div className="text-center space-y-8 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#CCE5FF] dark:border-[#007BFF]/30 bg-[#007BFF]/10 text-[#007BFF] dark:text-[#007BFF] text-sm font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(194,150,75,0.2)]">
              <Sparkles className="w-4 h-4" /> Hybrid Scent Engineering
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold tracking-wider uppercase bg-gradient-to-b from-[#0056B3] dark:from-[#007BFF] via-[#007BFF] dark:via-[#3395FF] to-[#0056B3] dark:to-[#007BFF] bg-clip-text text-transparent drop-shadow-sm filter leading-tight max-w-4xl mx-auto pb-2">
              Upgrade Bibit Refill Jadi Aroma yang Lebih Mahal, Lebih Smooth, dan Lebih Nempel 🔥
            </h1>
            <p className="text-stone-700 dark:text-[#3395FF]/80 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
              Bukan sekadar "campur parfum". Ini tools formulasi Engineering untuk membaca problem aroma, memperbaiki performa, mengupgrade DNA, dan meracik kombinasi material yang lebih harmonis dan premium.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
               <button onClick={() => setCurrentView('auth')} className="px-10 py-5 flex items-center justify-center gap-3 bg-gradient-to-r from-[#007BFF] via-[#3395FF] to-[#007BFF] text-white dark:text-white rounded-xl font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-[#CCE5FF] dark:shadow-[#007BFF]/20 border border-[#99CCFF] dark:border-[#007BFF] hover:-translate-y-0.5">
                 Gunakan Reguler <Zap className="w-5 h-5" />
               </button>
               <button onClick={() => setCurrentView('auth')} className="px-10 py-5 flex items-center justify-center gap-3 bg-transparent text-[#FF8C00] dark:text-[#FF8C00] rounded-xl font-bold uppercase tracking-wider hover:bg-[#FF8C00]/10 transition-all border border-[#FF8C00]/50 dark:border-[#FF8C00]/50">
                 Coba Gratis
               </button>
            </div>
          </div>

          {/* Section 1: Statement */}
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white/50 dark:bg-[#112240]/50 p-8 md:p-12 rounded-3xl border border-[#CCE5FF] dark:border-[#007BFF]/30 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#007BFF]/10 blur-[100px] rounded-full pointer-events-none"></div>
             <div className="space-y-6 relative z-10">
                <h2 className="text-3xl md:text-4xl font-sans font-bold text-stone-900 dark:text-[#FFFFFF] leading-tight">Bibit Sama.<br /><span className="text-[#007BFF] dark:text-[#007BFF]">Hasil Bisa Beda Jauh.</span></h2>
                <div className="space-y-3">
                  <p className="text-stone-700 dark:text-[#3395FF]/80">Banyak penjual refill yang mengalami problem:</p>
                  <ul className="space-y-2 text-stone-800 dark:text-[#3395FF] font-light">
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> wanginya terlalu tajam</li>
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> cepat hilang</li>
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> terlalu synthetic & over manis</li>
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> projection lemah</li>
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> drydown kosong & aroma tabrakan</li>
                  </ul>
                </div>
             </div>
             <div className="bg-[#F8F9FA] dark:bg-[#0A192F] p-8 rounded-2xl border border-[#CCE5FF] dark:border-[#007BFF]/30 relative z-10 shadow-2xl shadow-stone-200 dark:shadow-black/50">
                <h3 className="text-xl font-bold text-[#007BFF] dark:text-[#007BFF] font-sans mb-4">Masalahnya bukan di bibit saja.</h3>
                <p className="text-stone-700 dark:text-[#3395FF]/80 mb-4 font-light">Tapi karena tidak tahu:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['struktur aroma', 'balancing', 'layering', 'fungsi RAW material', 'logika blending'].map(item => (
                    <div key={item} className="bg-white dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 px-4 py-3 rounded-lg text-sm text-stone-800 dark:text-[#3395FF] flex items-center gap-2">
                       <AlertCircle className="w-4 h-4 text-[#007BFF] dark:text-[#007BFF]" /> {item}
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* Section 2: Benefits */}
          <div className="space-y-12">
            <h2 className="text-3xl font-sans font-bold text-center text-stone-900 dark:text-[#FFFFFF]">Hybrid Scent Engineering Membantu Kamu:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Upgrade', desc: 'Upgrade parfum refill lebih premium' },
                { title: 'Kombinasi', desc: 'Mencari kombinasi material yang cocok' },
                { title: 'Performa', desc: 'Memperbaiki projection & longevity' },
                { title: 'Modern', desc: 'Membuat aroma lebih smooth & modern' },
                { title: 'Natural', desc: 'Mengurangi kesan synthetic' },
                { title: 'Vibes Mahal', desc: 'Membuat parfum lebih "niat" dan mahal vibesnya' }
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-white/50 dark:bg-[#112240]/50 rounded-2xl border border-[#CCE5FF] dark:border-[#007BFF]/30 hover:border-[#CCE5FF] dark:border-[#007BFF]/30 transition-colors">
                  <div className="bg-[#007BFF]/20 p-2 rounded-full mt-1"><Check className="w-5 h-5 text-[#007BFF] dark:text-[#007BFF]" /></div>
                  <p className="text-stone-800 dark:text-[#3395FF] md:text-lg font-light leading-snug">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Fitur Utama */}
          <div className="space-y-12 pt-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white dark:bg-[#112240] rounded-2xl border border-[#CCE5FF] dark:border-[#007BFF]/30 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#CCE5FF] dark:shadow-[#007BFF]/20">
                <Microscope className="w-8 h-8 text-[#007BFF] dark:text-[#007BFF]" />
              </div>
              <h2 className="text-3xl font-sans font-bold text-stone-900 dark:text-[#FFFFFF]">Fitur Utama 🔬</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-[#F8F9FA]/80 dark:bg-[#0A192F]/80 border border-[#CCE5FF] dark:border-[#007BFF]/30 p-8 space-y-4 hover:border-[#CCE5FF] dark:border-[#007BFF]/30 transition-all rounded-3xl">
                <Activity className="w-8 h-8 text-[#007BFF] dark:text-[#007BFF]" />
                <h3 className="text-2xl font-bold text-stone-800 dark:text-[#3395FF] font-sans">DNA Parfum Analyzer</h3>
                <p className="text-stone-600 dark:text-[#3395FF]/70 font-light text-sm">Membaca karakter DNA parfum populer:</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Sauvage', 'Aventus', 'BR540', 'Eros', 'YSL Y', 'Another 13', '+ Lainnya'].map(tag => (
                     <span key={tag} className="px-3 py-1 bg-white dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 rounded-full text-xs text-[#007BFF] dark:text-[#007BFF]">{tag}</span>
                  ))}
                </div>
              </Card>

              <Card className="bg-[#F8F9FA]/80 dark:bg-[#0A192F]/80 border border-[#CCE5FF] dark:border-[#007BFF]/30 p-8 space-y-4 hover:border-[#CCE5FF] dark:border-[#007BFF]/30 transition-all rounded-3xl">
                <TrendingUp className="w-8 h-8 text-[#007BFF] dark:text-[#007BFF]" />
                <h3 className="text-2xl font-bold text-stone-800 dark:text-[#3395FF] font-sans">SPL Performance Engine</h3>
                <p className="text-stone-600 dark:text-[#3395FF]/70 font-light text-sm">Analisa struktur Projection, Sillage & Longevity. Cari tahu kenapa parfum cepat hilang atau tidak nembak.</p>
              </Card>

              <Card className="bg-[#F8F9FA]/80 dark:bg-[#0A192F]/80 border border-[#CCE5FF] dark:border-[#007BFF]/30 p-8 space-y-4 hover:border-[#CCE5FF] dark:border-[#007BFF]/30 transition-all rounded-3xl">
                <AlertCircle className="w-8 h-8 text-[#007BFF] dark:text-[#007BFF]" />
                <h3 className="text-2xl font-bold text-stone-800 dark:text-[#3395FF] font-sans">Aroma Problem Solver</h3>
                <p className="text-stone-600 dark:text-[#3395FF]/70 font-light text-sm">Deteksi problem secara akurat:</p>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {['Terlalu tajam', 'Terlalu manis', 'Terlalu smoky', 'Muddy', 'Terlalu synthetic', 'Tidak smooth'].map(tag => (
                     <span key={tag} className="flex items-center gap-1 text-xs text-stone-800 dark:text-[#3395FF]"><X className="w-3 h-3 text-[#007BFF] dark:text-[#007BFF]" /> {tag}</span>
                  ))}
                </div>
              </Card>

              <Card className="bg-[#F8F9FA]/80 dark:bg-[#0A192F]/80 border border-[#CCE5FF] dark:border-[#007BFF]/30 p-8 space-y-4 hover:border-[#CCE5FF] dark:border-[#007BFF]/30 transition-all rounded-3xl">
                <TestTube className="w-8 h-8 text-[#007BFF] dark:text-[#007BFF]" />
                <h3 className="text-2xl font-bold text-stone-800 dark:text-[#3395FF] font-sans">Upgrade Formula Builder & Hybrid System</h3>
                <p className="text-stone-600 dark:text-[#3395FF]/70 font-light text-sm">Rekomendasi RAW Material, EO, FO & blend DNA parfum lain berdasarkan target hasil yang kamu inginkan untuk signature blend unik.</p>
              </Card>
            </div>
          </div>

          {/* Section 4: Target & Example */}
          <div className="grid lg:grid-cols-2 gap-12 pt-8">
             <div className="bg-white/60 dark:bg-[#112240]/60 p-8 rounded-3xl border border-[#CCE5FF] dark:border-[#007BFF]/30">
                <h2 className="text-2xl font-sans font-bold text-stone-900 dark:text-[#FFFFFF] mb-8">Cocok Untuk 🔥</h2>
                <div className="space-y-4">
                  {['Penjual parfum refill', 'Seller Shopee/TikTok parfum', 'Semi formulator', 'Pengoprek parfum', 'Owner brand parfum lokal', 'Penjual bibit parfum', 'Konten edukasi parfum'].map(item => (
                    <div key={item} className="flex items-center gap-3 border-b border-[#CCE5FF] dark:border-[#007BFF]/30 pb-3">
                      <CheckCircle2 className="w-5 h-5 text-[#007BFF] dark:text-[#007BFF]" />
                      <span className="text-stone-800 dark:text-[#3395FF] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="space-y-6">
                <h2 className="text-2xl font-sans font-bold text-stone-900 dark:text-[#FFFFFF] mb-8">Contoh Problem yang Bisa Dibantu</h2>
                
                <div className="flex flex-col gap-4">
                   <div className="bg-[#F8F9FA] dark:bg-[#0A192F] p-5 rounded-2xl border border-[#CCE5FF] dark:border-[#007BFF]/30 relative shadow-lg">
                      <p className="italic text-stone-700 dark:text-[#3395FF]/80 text-sm mb-3 font-sans">"Sauvage saya terlalu tajam."</p>
                      <div className="bg-[#007BFF]/10 px-4 py-3 rounded-lg border-l-4 border-[#99CCFF] dark:border-[#007BFF]">
                        <p className="text-sm font-bold text-stone-800 dark:text-[#3395FF] flex items-center gap-2"><Zap className="w-4 h-4 text-[#007BFF] dark:text-[#007BFF]" /> Engineering merekomendasikan:</p>
                        <p className="text-[#007BFF] dark:text-[#007BFF] font-mono text-xs mt-2">Hedione + Galaxolide + Lavender EO</p>
                      </div>
                   </div>

                   <div className="bg-[#F8F9FA] dark:bg-[#0A192F] p-5 rounded-2xl border border-[#CCE5FF] dark:border-[#007BFF]/30 relative shadow-lg">
                      <p className="italic text-stone-700 dark:text-[#3395FF]/80 text-sm mb-3 font-sans">"BR540 saya terlalu manis."</p>
                      <div className="bg-[#007BFF]/10 px-4 py-3 rounded-lg border-l-4 border-[#99CCFF] dark:border-[#007BFF]">
                        <p className="text-sm font-bold text-stone-800 dark:text-[#3395FF] flex items-center gap-2"><Zap className="w-4 h-4 text-[#007BFF] dark:text-[#007BFF]" /> Sistem menyarankan:</p>
                        <p className="text-[#007BFF] dark:text-[#007BFF] font-mono text-xs mt-2">Cedarwood + Iso E Super</p>
                      </div>
                   </div>

                   <div className="bg-[#F8F9FA] dark:bg-[#0A192F] p-5 rounded-2xl border border-[#CCE5FF] dark:border-[#007BFF]/30 relative shadow-lg">
                      <p className="italic text-stone-700 dark:text-[#3395FF]/80 text-sm mb-3 font-sans">"Parfum cepat hilang."</p>
                      <div className="bg-[#007BFF]/10 px-4 py-3 rounded-lg border-l-4 border-[#99CCFF] dark:border-[#007BFF]">
                        <p className="text-sm font-bold text-stone-800 dark:text-[#3395FF] flex items-center gap-2"><Zap className="w-4 h-4 text-[#007BFF] dark:text-[#007BFF]" /> Sistem fokus:</p>
                        <p className="text-[#007BFF] dark:text-[#007BFF] font-mono text-xs mt-2">Ambroxan + woody amber + musk balancing</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Section: Hybrid Inspiration Gallery */}
          <div className="py-16 space-y-12 w-full max-w-6xl mx-auto border-t border-[#CCE5FF] dark:border-[#007BFF]/30 mt-16 pt-16">
              <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-5xl font-sans font-bold text-stone-900 dark:text-[#FFFFFF] tracking-wide">Hybrid Scent Gallery</h2>
                  <p className="text-stone-700 dark:text-[#3395FF]/80 max-w-2xl mx-auto text-lg font-light">Visualisasi high-resolution perbaikan problem parfum dengan penambahan RAW Material & Essential Oil.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="group rounded-3xl overflow-hidden border border-[#CCE5FF] dark:border-[#007BFF]/30 bg-[#F8F9FA] dark:bg-[#0A192F] hover:border-[#99CCFF] dark:border-[#007BFF] transition-all duration-500 shadow-xl shadow-stone-200 dark:shadow-black/50">
                      <div className="relative h-72 overflow-hidden">
                          <img src="https://www.image2url.com/r2/default/images/1777912459653-9fa9909c-fb63-4dfb-8191-eaf1af6afd52.jfif" alt="Ambroxan Fixative" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf9] dark:from-[#0A192F] via-[#fafaf9]/40 dark:via-[#0A192F]/40 to-transparent opacity-90"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                              <span className="inline-block px-3 py-1 bg-white/50 dark:bg-[#112240]/50 backdrop-blur-md border border-[#CCE5FF] dark:border-[#007BFF]/30 rounded-full text-xs text-stone-900 dark:text-[#FFFFFF] mb-2 font-mono tracking-wider shadow-lg shadow-stone-200 dark:shadow-black/50">PROBLEM: CEPAT HILANG</span>
                          </div>
                      </div>
                      <div className="p-6 space-y-3">
                          <h3 className="text-2xl font-bold text-stone-800 dark:text-[#3395FF] font-sans">Longevity Booster</h3>
                          <div className="bg-white dark:bg-[#112240] rounded-lg p-3 border border-[#CCE5FF] dark:border-[#007BFF]/30">
                            <p className="text-xs font-mono text-[#007BFF]/80 mb-1">RECOMMENDED FORMULA:</p>
                            <p className="text-sm font-mono text-stone-900 dark:text-[#FFFFFF] leading-relaxed">Base Bibit + Ambroxan + Cetalox + Musk Ketone</p>
                          </div>
                          <p className="text-sm text-stone-600 dark:text-[#3395FF]/70 font-light mt-3 leading-relaxed">Meningkatkan sillage dan umur parfum menjadi beast mode dengan menambahkan kristal ambroxan dosis 2-5% untuk mengikat base notes.</p>
                      </div>
                  </div>

                  <div className="group rounded-3xl overflow-hidden border border-[#CCE5FF] dark:border-[#007BFF]/30 bg-[#F8F9FA] dark:bg-[#0A192F] hover:border-[#99CCFF] dark:border-[#007BFF] transition-all duration-500 shadow-xl shadow-stone-200 dark:shadow-black/50">
                      <div className="relative h-72 overflow-hidden">
                          <img src="https://www.image2url.com/r2/default/images/1777912380245-a57d47db-7d63-4c4d-8740-5bff4f78fdc2.jfif" alt="Hedione Projection" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf9] dark:from-[#0A192F] via-[#fafaf9]/40 dark:via-[#0A192F]/40 to-transparent opacity-90"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                              <span className="inline-block px-3 py-1 bg-white/50 dark:bg-[#112240]/50 backdrop-blur-md border border-[#CCE5FF] dark:border-[#007BFF]/30 rounded-full text-xs text-stone-900 dark:text-[#FFFFFF] mb-2 font-mono tracking-wider shadow-lg shadow-stone-200 dark:shadow-black/50">PROBLEM: PROJECTION LEMAH</span>
                          </div>
                      </div>
                      <div className="p-6 space-y-3">
                          <h3 className="text-2xl font-bold text-stone-800 dark:text-[#3395FF] font-sans">Aura Expander</h3>
                          <div className="bg-white dark:bg-[#112240] rounded-lg p-3 border border-[#CCE5FF] dark:border-[#007BFF]/30">
                            <p className="text-xs font-mono text-[#007BFF]/80 mb-1">RECOMMENDED FORMULA:</p>
                            <p className="text-sm font-mono text-stone-900 dark:text-[#FFFFFF] leading-relaxed">Base Bibit + Hedione + Iso E Super</p>
                          </div>
                          <p className="text-sm text-stone-600 dark:text-[#3395FF]/70 font-light mt-3 leading-relaxed">Membuka dimensi aroma dan memberikan efek "halo" atau angin di sekitar pengguna. Sangat efektif untuk Fresh / Floral / Citrus.</p>
                      </div>
                  </div>

                  <div className="group rounded-3xl overflow-hidden border border-[#CCE5FF] dark:border-[#007BFF]/30 bg-[#F8F9FA] dark:bg-[#0A192F] hover:border-[#99CCFF] dark:border-[#007BFF] transition-all duration-500 shadow-xl shadow-stone-200 dark:shadow-black/50 sm:col-span-2 lg:col-span-1">
                      <div className="relative h-72 overflow-hidden">
                          <img src="https://www.image2url.com/r2/default/images/1777911264378-ee7a4ee6-6220-4ea8-aa95-b0ca3b95eb03.jfif" alt="Smooth Blending" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 saturate-50 contrast-125" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf9] dark:from-[#0A192F] via-[#fafaf9]/40 dark:via-[#0A192F]/40 to-transparent opacity-90"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                              <span className="inline-block px-3 py-1 bg-white/50 dark:bg-[#112240]/50 backdrop-blur-md border border-[#CCE5FF] dark:border-[#007BFF]/30 rounded-full text-xs text-stone-900 dark:text-[#FFFFFF] mb-2 font-mono tracking-wider shadow-lg shadow-stone-200 dark:shadow-black/50">PROBLEM: TERLALU SYNTHETIC</span>
                          </div>
                      </div>
                      <div className="p-6 space-y-3">
                          <h3 className="text-2xl font-bold text-stone-800 dark:text-[#3395FF] font-sans">Synthetic Smoother</h3>
                          <div className="bg-white dark:bg-[#112240] rounded-lg p-3 border border-[#CCE5FF] dark:border-[#007BFF]/30">
                            <p className="text-xs font-mono text-[#007BFF]/80 mb-1">RECOMMENDED FORMULA:</p>
                            <p className="text-sm font-mono text-stone-900 dark:text-[#FFFFFF] leading-relaxed">Base Bibit + Galaxolide + Sandela</p>
                          </div>
                          <p className="text-sm text-stone-600 dark:text-[#3395FF]/70 font-light mt-3 leading-relaxed">Meredam ujung notes yang terlalu menusuk (harsh) akibat bibit kualitas rendah. Mengisi kekosongan heart notes dengan white musk lembut.</p>
                      </div>
                  </div>
              </div>
          </div>

          {/* Section 5: Logika & What you get */}
          <div className="text-center max-w-4xl mx-auto space-y-12 py-12">
            <h2 className="text-4xl font-sans font-bold text-stone-900 dark:text-[#FFFFFF] leading-tight">Bukan Sekadar Formula.<br /><span className="text-[#007BFF] dark:text-[#007BFF]">Tapi Logika Peracikan.</span></h2>
            <p className="text-stone-700 dark:text-[#3395FF]/80 text-lg font-light pb-4">Hybrid Scent Engineering membantu kamu memahami kenapa aroma terasa mahal, kenapa parfum bisa smooth, projection kuat, dan blend yang harmonis.</p>
            
            <div className="bg-white/50 dark:bg-[#112240]/50 p-8 rounded-3xl border border-[#CCE5FF] dark:border-[#007BFF]/30 text-left">
              <h3 className="text-2xl font-bold text-[#007BFF] dark:text-[#007BFF] font-sans mb-6 text-center">Yang Didapatkan 🚀</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Formula upgrade otomatis', 'Analisa karakter parfum', 'Rekomendasi RAW material', 'Compatibility score', 'Warning aroma clash', 'Target hasil sesuai market', 'Formula leveling 1–5', 'Smart blending suggestion'].map(item => (
                  <div key={item} className="flex items-center gap-3 bg-[#F8F9FA] dark:bg-[#0A192F] px-4 py-3 rounded-xl border border-[#CCE5FF] dark:border-[#007BFF]/30">
                     <CheckCircle2 className="w-5 h-5 text-[#007BFF] dark:text-[#007BFF]" />
                     <span className="text-stone-800 dark:text-[#3395FF] text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center py-8">
             <h2 className="text-3xl md:text-5xl font-sans font-bold text-stone-900 dark:text-[#FFFFFF] mb-4">Dari Bibit Pasaran<br/><span className="text-[#007BFF] dark:text-[#007BFF] block mt-2">Jadi Aroma Lebih Berkelas.</span></h2>
             <p className="text-stone-700 dark:text-[#3395FF]/80 max-w-2xl mx-auto mb-10 text-lg font-light">Karena parfum refill yang enak bukan cuma wangi. Tapi smooth, balance, readable, punya texture, dan punya karakter.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
               <button onClick={() => setCurrentView('auth')} className="px-12 py-6 bg-gradient-to-r from-[#007BFF] via-[#3395FF] to-[#007BFF] text-white dark:text-white rounded-xl font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-[#CCE5FF] dark:shadow-[#007BFF]/20 border border-[#99CCFF] dark:border-[#007BFF] hover:-translate-y-1 text-lg">
                 Gunakan Reguler 🔥
               </button>
               <button onClick={() => setCurrentView('auth')} className="px-12 py-6 bg-transparent text-[#FF8C00] dark:text-[#FF8C00] rounded-xl font-bold uppercase tracking-widest hover:bg-[#FF8C00]/10 transition-all border border-[#FF8C00]/50 dark:border-[#FF8C00]/50 text-lg">
                 Coba Gratis
               </button>
             </div>
             <p className="text-[#007BFF] dark:text-[#007BFF] font-sans font-bold tracking-widest uppercase mt-6 opacity-80 text-sm">"Ngulik DNA aroma tanpa batas."</p>
          </div>

          <div className="pt-24 pb-16 border-t border-[#CCE5FF] dark:border-[#007BFF]/30">
            <div className="text-center mb-12"><h2 className="text-3xl font-sans font-bold text-[#007BFF] dark:text-[#007BFF] uppercase tracking-widest mb-3">Pilih Paket Profesional</h2><p className="text-stone-600 dark:text-[#3395FF]/80 uppercase tracking-widest text-sm font-medium">Anda juga bisa mencoba secara gratis dengan fitur terbatas.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-[#F8F9FA]/80 dark:bg-[#0A192F]/80 border border-[#CCE5FF] dark:border-[#007BFF]/30 p-8 text-center space-y-6 hover:border-[#99CCFF] dark:border-[#007BFF] transition-all rounded-2xl shadow-xl shadow-stone-200 dark:shadow-black/50 flex flex-col">
                <h3 className="text-xl font-bold text-stone-800 dark:text-[#3395FF] uppercase tracking-wider">Bulanan</h3>
                <div className="text-4xl font-sans font-bold text-stone-900 dark:text-[#FFFFFF]">Rp 49rb<span className="text-sm text-stone-600 dark:text-[#3395FF]/60 font-sans block mt-1 font-normal tracking-normal lowercase">/ bulan</span></div>
                <ul className="text-stone-700 dark:text-[#3395FF]/80 space-y-4 text-sm text-left pb-6 flex-1">
                  <li className="flex items-center gap-3"><span className="text-[#007BFF] dark:text-[#007BFF] w-4 text-center">✓</span> Akses semua fitur Engineering</li>
                  <li className="flex items-center gap-3"><span className="text-[#007BFF] dark:text-[#007BFF] w-4 text-center">✓</span> Upgrade formulasi tanpa batas</li>
                  <li className="flex items-center gap-3"><span className="text-[#007BFF] dark:text-[#007BFF] w-4 text-center">✓</span> Dukungan teknis</li>
                </ul>
                <a href="https://wa.link/tivn31" target="_blank" rel="noreferrer" className="block w-full py-4 border border-[#99CCFF] dark:border-[#007BFF] text-[#007BFF] dark:text-[#007BFF] rounded-xl hover:bg-[#007BFF] hover:text-white dark:text-white transition-colors font-bold tracking-wider">
                  Checkout via WhatsApp
                </a>
              </Card>
              
              <Card className="bg-[#F8F9FA]/80 dark:bg-[#0A192F]/80 border border-[#99CCFF] dark:border-[#007BFF] p-8 text-center space-y-6 relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(194,150,75,0.2)] rounded-2xl flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF8C00] to-[#FFAA33] text-white dark:text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-200 dark:shadow-orange-900/20 whitespace-nowrap">TERPOPULER</div>
                <h3 className="text-xl font-bold text-stone-800 dark:text-[#3395FF] uppercase tracking-wider pt-2">Tahunan</h3>
                <div className="text-4xl font-sans font-bold text-stone-900 dark:text-[#FFFFFF]">Rp 199rb<span className="text-sm text-stone-600 dark:text-[#3395FF]/60 font-sans block mt-1 font-normal tracking-normal lowercase">/ tahun</span></div>
                <ul className="text-stone-700 dark:text-[#3395FF]/80 space-y-4 text-sm text-left pb-6 flex-1">
                  <li className="flex items-center gap-3"><span className="text-[#007BFF] dark:text-[#007BFF] w-4 text-center">✓</span> Akses semua fitur Engineering</li>
                  <li className="flex items-center gap-3"><span className="text-[#007BFF] dark:text-[#007BFF] w-4 text-center">✓</span> Upgrade formulasi tanpa batas</li>
                  <li className="flex items-center gap-3"><span className="text-[#007BFF] dark:text-[#007BFF] w-4 text-center">✓</span> Prioritas dukungan teknis</li>
                  <li className="flex items-center gap-3"><span className="text-[#007BFF] dark:text-[#007BFF] w-4 text-center">✓</span> Update fitur baru</li>
                </ul>
                <a href="https://wa.link/gmvo4r" target="_blank" rel="noreferrer" className="block w-full py-4 bg-gradient-to-r from-[#007BFF] to-[#3395FF] text-white dark:text-white rounded-xl hover:opacity-90 transition-opacity font-bold tracking-wider shadow-lg shadow-[#CCE5FF] dark:shadow-[#007BFF]/20">
                  Checkout via WhatsApp
                </a>
              </Card>
              
              <Card className="bg-[#F8F9FA]/80 dark:bg-[#0A192F]/80 border border-[#CCE5FF] dark:border-[#007BFF]/30 p-8 text-center space-y-6 hover:border-[#99CCFF] dark:border-[#007BFF] transition-all rounded-2xl shadow-xl shadow-stone-200 dark:shadow-black/50 flex flex-col">
                <h3 className="text-xl font-bold text-stone-800 dark:text-[#3395FF] uppercase tracking-wider">Lifetime</h3>
                <div className="text-4xl font-sans font-bold text-stone-900 dark:text-[#FFFFFF]">Rp 299rb<span className="text-sm text-stone-600 dark:text-[#3395FF]/60 font-sans block mt-1 font-normal tracking-normal lowercase">/ sekali bayar</span></div>
                <ul className="text-stone-700 dark:text-[#3395FF]/80 space-y-4 text-sm text-left pb-6 flex-1">
                  <li className="flex items-center gap-3"><span className="text-[#007BFF] dark:text-[#007BFF] w-4 text-center">✓</span> Akses seumur hidup</li>
                  <li className="flex items-center gap-3"><span className="text-[#007BFF] dark:text-[#007BFF] w-4 text-center">✓</span> Lisensi permanen</li>
                  <li className="flex items-center gap-3"><span className="text-[#007BFF] dark:text-[#007BFF] w-4 text-center">✓</span> VIP WhatsApp Support</li>
                  <li className="flex items-center gap-3"><span className="text-[#007BFF] dark:text-[#007BFF] w-4 text-center">✓</span> Free all future updates</li>
                </ul>
                <a href="https://wa.link/pprivw" target="_blank" rel="noreferrer" className="block w-full py-4 border border-[#99CCFF] dark:border-[#007BFF] text-[#007BFF] dark:text-[#007BFF] rounded-xl hover:bg-[#007BFF] hover:text-white dark:text-white transition-colors font-bold tracking-wider">
                  Checkout via WhatsApp
                </a>
              </Card>
            </div>
          </div>
        </div>
        <CreatorFooter />
      </div>
    );
  }

  if (currentView === 'auth' || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#112240] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
        <ThemeToggle />
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#007BFF] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        
        <Card className="max-w-md w-full p-8 text-center space-y-6 border border-[#CCE5FF] dark:border-[#007BFF]/30 bg-[#F8F9FA]/80 dark:bg-[#0A192F]/80 backdrop-blur-md shadow-2xl shadow-stone-200 dark:shadow-black/50 z-10">
          <div className="w-32 h-32 mx-auto flex items-center justify-center">
             <img src="https://www.image2url.com/r2/default/images/1777833488398-91dbf660-0ed0-45bb-96de-fa3a354cd02a.jpg" alt="Logo Aplikasi" className="w-full h-full object-contain invert dark:invert-0 mix-blend-multiply dark:mix-blend-screen" />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-[22px] sm:text-2xl font-sans font-medium tracking-widest uppercase bg-gradient-to-b from-[#0056B3] dark:from-[#007BFF] via-[#007BFF] dark:via-[#3395FF] to-[#0056B3] dark:to-[#007BFF] bg-clip-text text-transparent drop-shadow-sm filter">Hybrid Scent Engineer</h1>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-[#3395FF]/80 mt-1.5 font-light tracking-wide">Ngulik DNA aroma tanpa batas.</p>
          </div>
          
          <div className="flex bg-white dark:bg-[#112240] p-1 rounded-xl border border-[#CCE5FF] dark:border-[#007BFF]/30">
            <button onClick={() => { setAuthView('login'); setAuthError(''); setAuthSuccess(''); }} className={cn("flex-1 py-2 rounded-lg text-sm font-bold transition-all", authView === 'login' ? "bg-gradient-to-r from-[#007BFF] to-[#3395FF] text-white dark:text-white shadow-md shadow-[#CCE5FF] dark:shadow-[#007BFF]/20" : "text-stone-600 dark:text-[#3395FF]/60 hover:text-[#007BFF] dark:text-[#007BFF]")}>Masuk</button>
            <button onClick={() => { setAuthView('register'); setAuthError(''); setAuthSuccess(''); setEmail(''); setPassword(''); }} className={cn("flex-1 py-2 rounded-lg text-sm font-bold transition-all", authView === 'register' ? "bg-gradient-to-r from-[#007BFF] to-[#3395FF] text-white dark:text-white shadow-md shadow-[#CCE5FF] dark:shadow-[#007BFF]/20" : "text-stone-600 dark:text-[#3395FF]/60 hover:text-[#007BFF] dark:text-[#007BFF]")}>Daftar</button>
          </div>

          <div className="space-y-4 pt-2 text-left">
            {authSuccess && <p className="text-sm font-medium text-green-400 bg-green-400/10 p-3 rounded-xl border border-green-400/20 text-center">{authSuccess}</p>}
            {authView === 'register' && (
              <>
                <input type="text" value={registerName} onChange={(e) => { setRegisterName(e.target.value); setAuthError(""); }} placeholder="Nama Lengkap" className="w-full px-4 py-3 text-center bg-white dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 text-stone-800 dark:text-[#3395FF] placeholder:text-stone-400 dark:placeholder:text-[#3395FF]/40 rounded-xl focus:ring-2 focus:ring-[#007BFF] outline-none transition-all focus:border-[#99CCFF] dark:border-[#007BFF]" />
                <input type="text" value={registerPhone} onChange={(e) => { setRegisterPhone(e.target.value); setAuthError(""); }} placeholder="No WhatsApp" className="w-full px-4 py-3 text-center bg-white dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 text-stone-800 dark:text-[#3395FF] placeholder:text-stone-400 dark:placeholder:text-[#3395FF]/40 rounded-xl focus:ring-2 focus:ring-[#007BFF] outline-none transition-all focus:border-[#99CCFF] dark:border-[#007BFF]" />
                <Select 
                  value={registerPackage} 
                  onChange={(v) => { setRegisterPackage(v); setAuthError(""); }} 
                  options={["Paket Bulanan", "Paket Tahunan", "Paket Lifetime"]} 
                  placeholder="Pilih Paket Layanan" 
                />
              </>
            )}
            <div className="relative">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => { 
                  setEmail(e.target.value); 
                  setAuthError(""); 
                  setShowAccountDropdown(e.target.value.length > 0);
                }} 
                onFocus={() => setShowAccountDropdown(email.length > 0)}
                onBlur={() => setTimeout(() => setShowAccountDropdown(false), 200)}
                placeholder="Email Anda" 
                className="w-full px-4 py-3 text-center bg-white dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 text-stone-800 dark:text-[#3395FF] placeholder:text-stone-400 dark:placeholder:text-[#3395FF]/40 rounded-xl focus:ring-2 focus:ring-[#007BFF] outline-none relative z-20 transition-all focus:border-[#99CCFF] dark:border-[#007BFF]" 
              />
              {authView === 'login' && showAccountDropdown && savedAccounts.filter(a => a.email.toLowerCase().includes(email.toLowerCase())).length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#F8F9FA] dark:bg-[#0A192F] border border-[#CCE5FF] dark:border-[#007BFF]/30 rounded-xl shadow-xl z-30 overflow-hidden max-h-48 overflow-y-auto">
                  {savedAccounts.filter(a => a.email.toLowerCase().includes(email.toLowerCase())).map((account, idx) => (
                    <div 
                      key={idx} 
                      className="px-4 py-3 text-sm text-stone-800 dark:text-[#3395FF] hover:bg-[#007BFF]/10 cursor-pointer text-left border-b border-[#CCE5FF] dark:border-[#007BFF]/30 last:border-0 transition-colors"
                      onClick={() => {
                        setEmail(account.email);
                        setPassword(account.password);
                        setShowAccountDropdown(false);
                      }}
                    >
                      {account.email}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setAuthError(""); }} placeholder="Password / Kode Akses" onKeyDown={(e)=>{if(e.key==='Enter') authView==='login'?handleLogin():handleRegister()}} className="w-full px-4 py-3 text-center bg-white dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 text-stone-800 dark:text-[#3395FF] placeholder:text-stone-400 dark:placeholder:text-[#3395FF]/40 rounded-xl focus:ring-2 focus:ring-[#007BFF] outline-none transition-all focus:border-[#99CCFF] dark:border-[#007BFF]" />
            {authError && <p className="text-xs font-medium text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20 text-center">{authError}</p>}
            <button onClick={authView === 'login' ? handleLogin : handleRegister} disabled={isAuthenticating} className="w-full py-4 mt-2 bg-gradient-to-r from-[#007BFF] via-[#3395FF] to-[#007BFF] text-white dark:text-white rounded-xl font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-[#CCE5FF] dark:shadow-[#007BFF]/20 disabled:opacity-70 disabled:shadow-none hover:-translate-y-0.5 border border-[#99CCFF] dark:border-[#007BFF]">
              {isAuthenticating ? "Memproses..." : (authView === 'login' ? "Masuk" : "Daftar Sekarang")}
            </button>
            
            <div className="relative pt-4 pb-2 flex items-center justify-center">
              <div className="border-t border-[#CCE5FF] dark:border-[#007BFF]/30 absolute w-full"></div>
              <span className="bg-[#F8F9FA] dark:bg-[#0A192F] px-3 border border-[#CCE5FF] dark:border-[#007BFF]/30 rounded-full text-xs text-stone-500 dark:text-[#3395FF]/60 relative z-10">ATAU</span>
            </div>
            
            <button onClick={() => { setIsTrialActive(true); setIsAuthenticated(true); setCurrentView('tools'); }} disabled={isAuthenticating} className="w-full py-3 bg-transparent text-[#007BFF] dark:text-[#007BFF] rounded-xl font-bold uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-[#007BFF]/10 transition-all border border-[#CCE5FF] dark:border-[#007BFF]/30">
              Coba Gratis
            </button>
          </div>
        </Card>
        <CreatorFooter />
      </div>
    );
  }

  const handleOptimize = async () => {
    setIsAnalyzing(true);
    setResult(null);
    try {
      const payload = { ...form };
      if (isTrialActive) {
         payload.levelUpgrade = "Level 1: Bibit + Bibit (Mode Trial)";
      }
      const res = await generateUpgradeFormulation(payload);
      setResult(res);
      saveToHistory(payload, res);
    } catch (e: any) {
      console.error(e);
      alert("Terjadi kesalahan atau koneksi bermasalah.\n\nDetail: " + (e.message || String(e)));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isFormValid = Object.entries(form)
    .filter(([k]) => k !== 'tipeHasil' && !(isTrialActive && k === 'levelUpgrade'))
    .every(([, v]) => {
      if (Array.isArray(v)) return v.length > 0;
      return typeof v === 'string' && v.trim() !== "";
    });

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A192F] text-stone-800 dark:text-[#3395FF] font-sans pb-24 relative">
      <ThemeToggle />
            <AnimatePresence>
        {showHistory && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#007BFF]/50 backdrop-blur-sm z-50"
              onClick={() => setShowHistory(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F8F9FA] dark:bg-[#0A192F] shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-[#CCE5FF] dark:border-[#007BFF]/30 flex items-center justify-between bg-white dark:bg-[#112240]">
                <h2 className="font-bold text-lg text-[#007BFF] dark:text-[#007BFF] flex items-center gap-2">
                  <History className="w-5 h-5 text-stone-900 dark:text-white" /> History Formulasi
                </h2>
                <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-600 dark:text-[#3395FF]/70">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {history.length === 0 ? (
                  <div className="text-center text-stone-600 dark:text-[#3395FF]/60 py-12">
                    <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>Belum ada history formulasi.</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-[#007BFF] dark:text-[#007BFF]">{item.form.namaBibit || 'Tanpa Nama'}</h3>
                        <span className="text-xs text-stone-600 dark:text-[#3395FF]/60 font-medium">{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-sm text-stone-600 dark:text-[#3395FF]/70 mb-3 truncate">Target: {item.form.targetHasil?.join(', ') || '-'}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-1 bg-[#FFFFFF] dark:bg-[#112240] text-stone-700 dark:text-[#3395FF]/80 rounded">Skor: {item.result?.analisa?.compatibilityScore || '-'}/100</span>
                        <button 
                          onClick={() => loadFromHistory(item)}
                          className="text-xs font-bold text-[#FF8C00] hover:text-[#007BFF] hover:underline"
                        >
                          Buka Detail
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white dark:bg-[#0f0107] text-stone-800 dark:text-[#3395FF] sticky top-0 z-40 shadow-md border-b border-[#CCE5FF] dark:border-[#007BFF]/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('panduan')}>
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="https://www.image2url.com/r2/default/images/1777833488398-91dbf660-0ed0-45bb-96de-fa3a354cd02a.jpg" alt="Logo Aplikasi" className="w-full h-full object-contain invert dark:invert-0 mix-blend-multiply dark:mix-blend-screen" />
            </div>
            <div>
              <h1 className="font-sans font-medium text-base leading-tight tracking-widest uppercase bg-gradient-to-b from-[#0056B3] dark:from-[#007BFF] via-[#007BFF] dark:via-[#3395FF] to-[#0056B3] dark:to-[#007BFF] bg-clip-text text-transparent drop-shadow-sm filter">Hybrid Scent Engineer</h1>
              <p className="text-[9px] text-stone-700 dark:text-[#3395FF]/80 font-light tracking-wide">Ngulik DNA aroma tanpa batas.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowHistory(true)} className="text-stone-600 dark:text-[#3395FF]/60 hover:text-[#007BFF] dark:text-[#007BFF] flex items-center gap-2 text-sm font-medium transition-colors">
              <History className="w-4 h-4" /> History
            </button>
            <button onClick={() => { setIsAuthenticated(false); setCurrentView('landing'); }} className="text-stone-600 dark:text-[#3395FF]/60 hover:text-[#007BFF] dark:text-[#007BFF] text-sm font-medium transition-colors">Logout</button>
          </div>
        </div>
      </header>

      {currentView === 'panduan' ? (
        <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="space-y-8 mb-16">
            <div className="space-y-4 text-center">
              <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-widest uppercase bg-gradient-to-b from-[#0056B3] dark:from-[#007BFF] via-[#007BFF] dark:via-[#3395FF] to-[#0056B3] dark:to-[#007BFF] bg-clip-text text-transparent drop-shadow-sm filter leading-tight">Panduan Aplikasi</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#007BFF] to-transparent mx-auto"></div>
            </div>
            <p className="text-lg text-stone-700 dark:text-[#3395FF]/80 font-light leading-relaxed text-center max-w-3xl mx-auto">
              Hybrid Scent Engineer membantu Anda merumuskan upgrade formula parfum dengan analisa komputasi Engineering tingkat tinggi. Berikut adalah panduan opsi parameter yang ada di dalam aplikasi:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
             <Card className="bg-[#F8F9FA]/80 dark:bg-[#0A192F]/80 border border-[#CCE5FF] dark:border-[#007BFF]/30 p-6 space-y-4 hover:border-[#CCE5FF] dark:border-[#007BFF]/30 transition-colors">
               <h3 className="text-xl font-bold text-[#007BFF] dark:text-[#007BFF] font-sans">1. Karakter Aroma</h3>
               <p className="text-sm text-stone-700 dark:text-[#3395FF]/80">Menentukan DNA utama parfum Anda. (Fresh, Woody, Floral, Gourmand, dll.) Pilih sesuai dengan keluarga aroma bibit utama Anda.</p>
             </Card>
             <Card className="bg-[#F8F9FA]/80 dark:bg-[#0A192F]/80 border border-[#CCE5FF] dark:border-[#007BFF]/30 p-6 space-y-4 hover:border-[#CCE5FF] dark:border-[#007BFF]/30 transition-colors">
               <h3 className="text-xl font-bold text-[#007BFF] dark:text-[#007BFF] font-sans">2. Kelompok Problem</h3>
               <p className="text-sm text-stone-700 dark:text-[#3395FF]/80">Pilih "SPL Performance" jika Anda punya masalah dengan ketahanan/sebaran wangi. Pilih "Aroma Character" jika wanginya terlalu tajam, manis, atau synthetic.</p>
             </Card>
             <Card className="bg-[#F8F9FA]/80 dark:bg-[#0A192F]/80 border border-[#CCE5FF] dark:border-[#007BFF]/30 p-6 space-y-4 hover:border-[#CCE5FF] dark:border-[#007BFF]/30 transition-colors">
               <h3 className="text-xl font-bold text-[#007BFF] dark:text-[#007BFF] font-sans">3. Target & Market</h3>
               <p className="text-sm text-stone-700 dark:text-[#3395FF]/80">Tentukan tingkat market (Low, Premium, Niche) dan gender agar Engineering menyesuaikan persentase material yang paling pas.</p>
             </Card>
             <Card className="bg-[#F8F9FA]/80 dark:bg-[#0A192F]/80 border border-[#CCE5FF] dark:border-[#007BFF]/30 p-6 space-y-4 hover:border-[#CCE5FF] dark:border-[#007BFF]/30 transition-colors">
               <h3 className="text-xl font-bold text-[#007BFF] dark:text-[#007BFF] font-sans">4. Level Upgrade</h3>
               <p className="text-sm text-stone-700 dark:text-[#3395FF]/80">Tentukan seberapa kompleks campurannya, mulai dari sekadar mencampur 2 bibit (Level 1), hingga Structure Building System profesional (Level 5).</p>
             </Card>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => setCurrentView('tools')} 
              className="px-10 py-5 flex items-center gap-3 bg-gradient-to-r from-[#007BFF] via-[#3395FF] to-[#007BFF] text-white dark:text-white rounded-xl font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[#CCE5FF] dark:shadow-[#007BFF]/20 border border-[#99CCFF] dark:border-[#007BFF] hover:-translate-y-0.5"
            >
              Mulai Gunakan Tools <Zap className="w-5 h-5" />
            </button>
          </div>
        </main>
      ) : (
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Form Input */}
        <div className="lg:w-1/3 flex-shrink-0 space-y-6">
          <Card className="border-t-4 border-t-amber-500">
            <h2 className="text-xl font-bold tracking-tight text-[#007BFF] dark:text-[#007BFF] flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-stone-900 dark:text-white" />
              Profil Project
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <Label>Nama Bibit Utama</Label>
                <input 
                  type="text" 
                  value={form.namaBibit} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm(prev => {
                      const newState = { ...prev, namaBibit: val };
                      if (PARFUM_DATA[val]) {
                        newState.karakterAroma = PARFUM_DATA[val];
                      }
                      return newState;
                    });
                    setShowParfumDropdown(true);
                  }}
                  onFocus={() => setShowParfumDropdown(true)}
                  onBlur={() => setTimeout(() => setShowParfumDropdown(false), 200)}
                  placeholder="Ketik atau pilih (Misal: Baccarat Rouge 540)" 
                  className="w-full px-4 py-3 bg-white dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 rounded-xl focus:ring-2 focus:ring-[#FF8C00] outline-none transition-all"
                />
                {showParfumDropdown && (
                  <div className="absolute top-[80px] left-0 w-full bg-[#F8F9FA] dark:bg-[#0A192F] border border-[#CCE5FF] dark:border-[#007BFF]/30 shadow-xl rounded-xl z-50 max-h-60 overflow-y-auto">
                    {[...DAFTAR_PARFUM]
                      .sort((a, b) => a.localeCompare(b))
                      .filter(p => p.toLowerCase().includes(form.namaBibit.toLowerCase()))
                      .map(p => (
                        <div 
                          key={p} 
                          className="px-4 py-3 hover:bg-[#007BFF]/10 cursor-pointer text-sm border-b border-[#CCE5FF] dark:border-[#007BFF]/30 last:border-0"
                          onClick={() => {
                             setForm(prev => ({ ...prev, namaBibit: p, karakterAroma: PARFUM_DATA[p] || prev.karakterAroma }));
                             setShowParfumDropdown(false);
                          }}
                        >
                          {p}
                        </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <Label>Karakter Aroma</Label>
                <input 
                  type="text" 
                  value={form.karakterAroma} 
                  onChange={e => {
                    setForm({...form, karakterAroma: e.target.value});
                    setShowKarakterDropdown(true);
                  }}
                  onFocus={() => setShowKarakterDropdown(true)}
                  onBlur={() => setTimeout(() => setShowKarakterDropdown(false), 200)}
                  placeholder="Ketik atau pilih karakter dominan..." 
                  className="w-full px-4 py-3 bg-white dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 rounded-xl focus:ring-2 focus:ring-[#FF8C00] outline-none transition-all"
                />
                {showKarakterDropdown && (
                  <div className="absolute top-[80px] left-0 w-full bg-[#F8F9FA] dark:bg-[#0A192F] border border-[#CCE5FF] dark:border-[#007BFF]/30 shadow-xl rounded-xl z-50 max-h-60 overflow-y-auto">
                    {KARAKTER_AROMA
                      .filter(k => k.toLowerCase().includes(form.karakterAroma.toLowerCase()))
                      .map(o => (
                        <div 
                          key={o} 
                          className="px-4 py-3 hover:bg-[#007BFF]/10 cursor-pointer text-sm border-b border-[#CCE5FF] dark:border-[#007BFF]/30 last:border-0"
                          onClick={() => {
                             setForm(prev => ({ ...prev, karakterAroma: o }));
                             setShowKarakterDropdown(false);
                          }}
                        >
                          {o}
                        </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <Label>Kelompok Problem</Label>
                <Select 
                  value={form.kelompokProblem} 
                  onChange={handleKelompokProblemChange} 
                  options={filterTrialOptions(["SPL Performance", "Aroma Character"], ["SPL Performance"], isTrialActive)} 
                  placeholder="Pilih Kelompok Problem..." 
                />
              </div>

              {form.kelompokProblem && (
                <div>
                  <Label>Sub Problem</Label>
                  <Select 
                    value={form.subProblem} 
                    onChange={handleSubProblemChange} 
                    options={subProblemOptions} 
                    placeholder="Pilih Sub Problem..." 
                  />
                  {currentSubProblemData && (
                    <p className="text-xs text-stone-600 dark:text-[#3395FF]/60 mt-1 italic">{currentSubProblemData.description}</p>
                  )}
                </div>
              )}

              {form.subProblem && (
                <>
                  <div>
                    <Label>Turunan Problem (Maksimal 3)</Label>
                    <MultiSelectPills 
                      values={form.turunanProblem} 
                      onChange={v => setForm({...form, turunanProblem: v})} 
                      options={PROBLEM_TURUNAN} 
                      limit={3} 
                    />
                  </div>
                  <div>
                    <Label>Target Hasil (Maksimal 3)</Label>
                    <MultiSelectPills 
                      values={form.targetHasil} 
                      onChange={v => setForm({...form, targetHasil: v})} 
                      options={TARGET_HASIL} 
                      limit={3} 
                    />
                  </div>
                </>
              )}
              <div><Label>Gender Market</Label><Select value={form.genderMarket} onChange={v => setForm({...form, genderMarket: v})} options={GENDER_MARKET} placeholder="Pilih gender..." /></div>
              <div><Label>Market Level</Label><Select value={form.marketLevel} onChange={v => setForm({...form, marketLevel: v})} options={filterTrialOptions(MARKET_LEVEL, ["Low market", "Middle market"], isTrialActive)} placeholder="Pilih target market..." /></div>
              <div><Label>Style Aroma</Label><Select value={form.styleAroma} onChange={v => setForm({...form, styleAroma: v})} options={filterTrialOptions(STYLE_AROMA, ["Fresh office style", "Clubbing style"], isTrialActive)} placeholder="Pilih style parfum..." /></div>
              <div><Label>Level Upgrade System</Label><Select value={form.levelUpgrade} onChange={v => setForm({...form, levelUpgrade: v})} options={filterTrialOptions(LEVEL_UPGRADE, ["Level 1: Bibit + Bibit"], isTrialActive)} placeholder="Pilih kompleksitas formulasi..." /></div>
              <div><Label>Intensitas Aroma</Label><Select value={form.intensitasAroma} onChange={v => setForm({...form, intensitasAroma: v})} options={filterTrialOptions(INTENSITAS, ["Moderate", "Strong & Loud"], isTrialActive)} placeholder="Seberapa kuat aromanya?" /></div>
              
              <div>
                <Label>Tipe Hasil Spesifik (Opsional)</Label>
                <textarea 
                  value={form.tipeHasil} 
                  onChange={(e) => setForm(prev => ({...prev, tipeHasil: e.target.value}))}
                  placeholder="Deskripsikan lebih detail misal: 'Saya ingin aromanya lebih woody di akhir tapi fresh di awal...'" 
                  className="w-full px-4 py-3 bg-white dark:bg-[#112240] border border-[#CCE5FF] dark:border-[#007BFF]/30 rounded-xl focus:ring-2 focus:ring-[#FF8C00] outline-none min-h-[100px] resize-none"
                />
              </div>

              <button 
                onClick={handleOptimize}
                disabled={!isFormValid || isAnalyzing}
                className="w-full py-4 mt-4 bg-[#007BFF] text-white dark:text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><PremiumBottle className="w-5 h-5" /></motion.div> Menganalisis...</>
                ) : (
                  <><Zap className="w-5 h-5" /> Generate Upgrade Formula</>
                )}
              </button>
            </div>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="lg:w-2/3 space-y-6">
          {!result && !isAnalyzing && (
             <div className="h-[400px] flex flex-col items-center justify-center text-stone-600 dark:text-[#3395FF]/60 bg-[#FFFFFF] dark:bg-[#112240] rounded-2xl border-2 border-dashed border-[#CCE5FF] dark:border-[#007BFF]/30">
               <PremiumBottle className="w-16 h-16 mb-4 text-stone-400 dark:text-[#3395FF]/50" />
               <p className="text-lg font-medium">Beri tahu sistem masalah parfum Anda.</p>
               <p className="text-sm">Lengkapi form di samping untuk mulai formulasi.</p>
             </div>
          )}

          {isAnalyzing && (
            <Card className="h-[400px] flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                 <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-[#007BFF]/30 rounded-full blur-xl" />
                 <PremiumBottle className="w-16 h-16 text-stone-900 dark:text-white relative z-10" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#007BFF] dark:text-[#007BFF]">Sistem Sedang Meracik Formula</h3>
                <p className="text-stone-600 dark:text-[#3395FF]/70 mt-2">Menganalisis molekul dan mencocokkan bahan...</p>
              </div>
            </Card>
          )}

          {result && !isAnalyzing && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Formula Table */}
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#007BFF] dark:text-[#007BFF] flex items-center gap-2">
                    <Droplets className="w-6 h-6 text-indigo-500" /> Rekomendasi Formula
                  </h2>
                  <button onClick={() => { if (isTrialActive) { alert("Fitur Export PDF hanya tersedia untuk Akun Premium (Berbayar). Silakan upgrade."); return; } handleExportPDF(); }} className="flex items-center gap-2 px-4 py-2 bg-[#007BFF] text-white dark:text-white hover:text-[#FF8C00] rounded-xl font-medium text-sm transition-colors shadow-sm">
                    {isTrialActive ? <Lock className="w-4 h-4" /> : <Download className="w-4 h-4" />} 
                    Export PDF
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#CCE5FF] dark:border-[#007BFF]/30 text-stone-600 dark:text-[#3395FF]/70 text-sm">
                        <th className="pb-3 font-medium">Material</th>
                        <th className="pb-3 font-medium">Fungsi</th>
                        <th className="pb-3 font-medium">Persentase</th>
                        <th className="pb-3 font-medium">Alasan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {result.formula.map((item: any, i: number) => (
                        <tr key={i}>
                          <td className="py-4 font-bold text-[#007BFF] dark:text-[#007BFF]">{item.material}</td>
                          <td className="py-4 text-stone-700 dark:text-[#3395FF]/80 text-sm">{item.fungsi}</td>
                          <td className="py-4 text-indigo-600 font-bold">{item.persen}</td>
                          <td className="py-4 text-stone-600 dark:text-[#3395FF]/70 text-sm max-w-sm">{item.alasan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Analysis Results */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <h3 className="font-bold text-[#007BFF] dark:text-[#007BFF] mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-500"/> Analisis Hasil</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between border-b border-[#CCE5FF] dark:border-[#007BFF]/30 pb-2 flex-col md:flex-row md:items-center">
                       <span className="text-stone-600 dark:text-[#3395FF]/70">Karakter Aroma</span>
                       <span className="font-semibold text-[#007BFF] dark:text-[#007BFF] md:text-right">{result.analisa.karakterAroma}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#CCE5FF] dark:border-[#007BFF]/30 pb-2 flex-col md:flex-row md:items-center">
                       <span className="text-stone-600 dark:text-[#3395FF]/70">Market Style</span>
                       <span className="font-semibold text-[#007BFF] dark:text-[#007BFF] md:text-right">{result.analisa.marketStyle}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#CCE5FF] dark:border-[#007BFF]/30 pb-2 flex-col md:flex-row md:items-center">
                       <span className="text-stone-600 dark:text-[#3395FF]/70">Compatibility Score</span>
                       <span className={cn("font-bold", 
                         parseInt(result.analisa.compatibilityScore) >= 90 ? "text-emerald-600" : 
                         parseInt(result.analisa.compatibilityScore) >= 70 ? "text-emerald-400" : 
                         parseInt(result.analisa.compatibilityScore) >= 50 ? "text-stone-900 dark:text-white" : "text-red-500"
                       )}>
                         {result.analisa.compatibilityScore} / 100
                       </span>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className="font-bold text-[#007BFF] dark:text-[#007BFF] mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-500"/> Performance Score</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center bg-white dark:bg-[#112240] p-2 rounded-lg">
                       <span className="text-stone-700 dark:text-[#3395FF]/80 font-medium">Projection</span>
                       <span className="font-bold text-[#007BFF] dark:text-[#007BFF]">{result.analisa.projectionScore}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white dark:bg-[#112240] p-2 rounded-lg">
                       <span className="text-stone-700 dark:text-[#3395FF]/80 font-medium">Longevity</span>
                       <span className="font-bold text-[#007BFF] dark:text-[#007BFF]">{result.analisa.longevityScore}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white dark:bg-[#112240] p-2 rounded-lg">
                       <span className="text-stone-700 dark:text-[#3395FF]/80 font-medium">Smoothness</span>
                       <span className="font-bold text-[#007BFF] dark:text-[#007BFF]">{result.analisa.smoothnessScore}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Warnings and Suggestions */}
              {result.warnings && result.warnings.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                  <h3 className="font-bold text-red-800 flex items-center gap-2 mb-3"><AlertCircle className="w-5 h-5" /> Warning Blending</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                    {result.warnings.map((w: string, i: number) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
              )}

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6">
                <h3 className="font-bold text-[#0A192F] flex items-center gap-2 mb-3"><CheckCircle2 className="w-5 h-5 text-[#007BFF]" /> Smart Suggestion (Next Improvement)</h3>
                <p className="text-amber-800 text-sm leading-relaxed">{result.smartSuggestion}</p>
              </div>

            </motion.div>
          )}

        </div>
      </main>
      )}
      <CreatorFooter />
    </div>
  );
}

import { GoogleGenAI, Type } from "@google/genai";

const getApiKey = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY || "dummy";
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env.GEMINI_API_KEY || "dummy";
  }
  return "dummy";
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export async function analyzePerfumeEvaluation(input: {
  fileContent: string;
  realSPL: { sillage: number; projection: number; longevity: number };
  newProblems: string[];
}) {
  const prompt = `Kamu adalah Perfumer AI Expert. Lakukan Evaluasi Setelah Maserasi berdasarkan data berikut:
    
    1. DATA LAMA (Laporan Sebelumnya):
    ${input.fileContent}
    
    2. HASIL REAL SETELAH MASERASI:
    - Sillage: ${input.realSPL.sillage}/5
    - Projection: ${input.realSPL.projection}/5
    - Longevity: ${input.realSPL.longevity}/5
    
    3. PROBLEM BARU YANG DIRASAKAN:
    ${input.newProblems.join(", ")}
    
    INSTRUKSI EVALUASI:
    STEP 1: Ekstrak data lama (DNA, bahan, dosis, tujuan awal).
    STEP 2: Bandingkan estimasi lama vs hasil real. Deteksi bagian mana yang meleset.
    STEP 3: Analisis masalah baru digabung dengan SPL real dan formula lama.
    STEP 4: Deteksi penyebab (misal: longevity rendah -> fixative kurang/tidak cocok).
    STEP 5: Buat strategi perbaikan menggunakan 3 jenis revisi:
      - ADJUST DOSIS (naikkan/turunkan bahan lama)
      - ADD MATERIAL (tambah bahan baru jika perlu)
      - REMOVE/REDUCE (kurangi bahan penyebab masalah)
    
    ATURAN REVISI:
    - Jangan ulangi formula lama tanpa perubahan.
    - Revisi harus jelas (bahan berubah / dosis berubah).
    - Prioritaskan data REAL dibanding estimasi lama.
    - Jika meleset jauh -> rombak (tapi tetap masuk akal).
    - Jika sedikit meleset -> micro-adjustment.
    - Hindari menambah terlalu banyak bahan baru.
    
    Berikan output dalam format JSON sesuai struktur berikut:
    {
      "analisis": {
        "kejadian": "Apa yang terjadi setelah maserasi",
        "penyebab": "Kenapa hasil berbeda dari estimasi"
      },
      "masalahUtama": ["masalah 1", "masalah 2"],
      "revisiFormula": {
        "LOW": {
          "deskripsi": "Perbaikan minimal",
          "tindakan": [
            { "jenis": "ADJUST_DOSIS" | "ADD_MATERIAL" | "REMOVE_REDUCE", "bahan": "nama bahan", "dosisBaru": 1.5, "alasan": "alasan" }
          ]
        },
        "MIDDLE": {
          "deskripsi": "Perbaikan seimbang",
          "tindakan": [ ... ]
        },
        "HIGH": {
          "deskripsi": "Perbaikan optimal",
          "tindakan": [ ... ]
        }
      },
      "simulasiHasil": {
        "sebelum": { "sillage": ${input.realSPL.sillage}, "projection": ${input.realSPL.projection}, "longevity": ${input.realSPL.longevity} },
        "sesudah": { "sillage": 4, "projection": 4.5, "longevity": 4.5 }
      },
      "catatanMaserasi": {
        "tambahanHari": 7,
        "alasan": "alasan"
      }
    }`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      analisis: {
        type: Type.OBJECT,
        properties: {
          kejadian: { type: Type.STRING },
          penyebab: { type: Type.STRING }
        },
        required: ["kejadian", "penyebab"]
      },
      masalahUtama: { type: Type.ARRAY, items: { type: Type.STRING } },
      revisiFormula: {
        type: Type.OBJECT,
        properties: {
          LOW: {
            type: Type.OBJECT,
            properties: {
              deskripsi: { type: Type.STRING },
              tindakan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    jenis: { type: Type.STRING, enum: ["ADJUST_DOSIS", "ADD_MATERIAL", "REMOVE_REDUCE"] },
                    bahan: { type: Type.STRING },
                    dosisBaru: { type: Type.NUMBER },
                    alasan: { type: Type.STRING }
                  },
                  required: ["jenis", "bahan", "dosisBaru", "alasan"]
                }
              }
            },
            required: ["deskripsi", "tindakan"]
          },
          MIDDLE: {
            type: Type.OBJECT,
            properties: {
              deskripsi: { type: Type.STRING },
              tindakan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    jenis: { type: Type.STRING, enum: ["ADJUST_DOSIS", "ADD_MATERIAL", "REMOVE_REDUCE"] },
                    bahan: { type: Type.STRING },
                    dosisBaru: { type: Type.NUMBER },
                    alasan: { type: Type.STRING }
                  },
                  required: ["jenis", "bahan", "dosisBaru", "alasan"]
                }
              }
            },
            required: ["deskripsi", "tindakan"]
          },
          HIGH: {
            type: Type.OBJECT,
            properties: {
              deskripsi: { type: Type.STRING },
              tindakan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    jenis: { type: Type.STRING, enum: ["ADJUST_DOSIS", "ADD_MATERIAL", "REMOVE_REDUCE"] },
                    bahan: { type: Type.STRING },
                    dosisBaru: { type: Type.NUMBER },
                    alasan: { type: Type.STRING }
                  },
                  required: ["jenis", "bahan", "dosisBaru", "alasan"]
                }
              }
            },
            required: ["deskripsi", "tindakan"]
          }
        },
        required: ["LOW", "MIDDLE", "HIGH"]
      },
      simulasiHasil: {
        type: Type.OBJECT,
        properties: {
          sebelum: {
            type: Type.OBJECT,
            properties: {
              sillage: { type: Type.NUMBER },
              projection: { type: Type.NUMBER },
              longevity: { type: Type.NUMBER }
            },
            required: ["sillage", "projection", "longevity"]
          },
          sesudah: {
            type: Type.OBJECT,
            properties: {
              sillage: { type: Type.NUMBER },
              projection: { type: Type.NUMBER },
              longevity: { type: Type.NUMBER }
            },
            required: ["sillage", "projection", "longevity"]
          }
        },
        required: ["sebelum", "sesudah"]
      },
      catatanMaserasi: {
        type: Type.OBJECT,
        properties: {
          tambahanHari: { type: Type.NUMBER },
          alasan: { type: Type.STRING }
        },
        required: ["tambahanHari", "alasan"]
      }
    },
    required: ["analisis", "masalahUtama", "revisiFormula", "simulasiHasil", "catatanMaserasi"]
  };

  const gasUrl = "https://script.google.com/macros/s/AKfycbxpybFgr2LVDRjOsoShd7_UElhmDgmTU3GrYqTEJioDYNDDiOZyUbluULereSE3SK-9/exec";
  try {
    const res = await fetch(gasUrl, {
      method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "gemini_proxy", prompt, schema })
    });
    const d = await res.json();
    if (d.success) return d.data;
  } catch (e) { console.warn("Failed to use GAS Proxy", e); }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return JSON.parse(response.text || "{}");
}

import { DYNAMIC_PROBLEM_ENGINE } from '../data/dynamicEngine';

export async function generateUpgradeFormulation(input: {
  namaBibit: string;
  karakterAroma: string;
  kelompokProblem?: string;
  subProblem?: string;
  turunanProblem?: string | string[];
  targetHasil: string | string[];
  genderMarket: string;
  marketLevel: string;
  styleAroma: string;
  levelUpgrade: string;
  intensitasAroma: string;
  tipeHasil: string;
}) {
  const turunanProblemStr = Array.isArray(input.turunanProblem) ? input.turunanProblem.join(', ') : input.turunanProblem || '';
  const targetHasilStr = Array.isArray(input.targetHasil) ? input.targetHasil.join(', ') : input.targetHasil;

  const kelompokStr = input.kelompokProblem ? `Kelompok Problem: ${input.kelompokProblem}` : '';
  const subStr = input.subProblem ? `Sub Problem Utama: ${input.subProblem}` : '';
  
  // Ambil prioritas AI berdasarkan engine logic jika ada input subProblem
  let priorityLogic = "";
  if (input.kelompokProblem && input.subProblem) {
    const pData = DYNAMIC_PROBLEM_ENGINE[input.kelompokProblem]?.[input.subProblem];
    if (pData) {
      priorityLogic = `Prioritas Solusi Berdasarkan Pilihan User: ${pData.priority.join(', ')}`;
    }
  }

  const gasUrl = "https://script.google.com/macros/s/AKfycbxpybFgr2LVDRjOsoShd7_UElhmDgmTU3GrYqTEJioDYNDDiOZyUbluULereSE3SK-9/exec";
  
  const prompt = `Kamu adalah "Hybrid Scent Engineer", sistem rekomendasi formula upgrade parfum refill otomatis.

Tugasmu merespons input dan menghasilkan formula upgrade sesuai RULES dan DATABASE yang diberikan di bawah ini.

# STRUKTUR DATABASE ENGINE

## 1. DNA DATABASE
Gunakan pengetahuan luasmu tentang ratusan DNA parfum populer untuk menyesuaikan karakter dari "Nama Bibit Utama".

## 2. RAW MATERIALS DATABASE
- Hedione: smoother | airy smooth
- Iso E Super: diffuser | woody transparent
- Ambroxan: booster | projection longevity
- Galaxolide: blender | smooth musk
- Cashmeran: luxury booster | warm woody luxury

## 3. ESSENTIAL OILS (EO) DATABASE
- Bergamot EO: citrus | natural freshness | danger: unstable top
- Cedarwood EO: woody | dry woody luxury | danger: too dry
- Lavender EO: aromatic | relaxing clean | danger: herbal sharp

## 4. FRAGRANCE OILS (FO) DATABASE
- Vanilla FO: creamy sweet | gourmand effect | danger: candle vibe
- Cotton Candy FO: sugary sweet | playful sweetness | danger: over sweet

## 5. DYNAMIC PROBLEM ENGINE LOGIC
Membaca kondisi kelompok problem, mengevaluasi target yang tepat, dan memberikan solusi yang difokuskan.
- Projection Problem -> Iso E Super, Hedione, Ambroxan, Dihydromyrcenol
- Sillage Problem -> Hedione, White Musk, Ambroxan, Floral transparent molecule
- Longevity Problem -> Ambroxan, Cashmeran, Galaxolide, Woody amber
- Sharpness Problem -> Hedione, Galaxolide, Lavender EO, White Musk
- Sweetness Problem -> Cedarwood EO, Iso E Super, Vetiver accord
- Smoky Problem -> Hedione, Bergamot EO, White Musk
- Flat Aroma Problem -> Hedione, Citrus top accord, Transparent floral molecule
- Synthetic Problem -> Bergamot EO, Lavender EO, Natural citrus accord
- Muddy Problem -> Iso E Super, Hedione, Reset structure logic

# RULES ENGINE (WAJIB DIPATUHI)

## R1. ATURAN MULTI-LEVEL UPGRADE

LEVEL 1 (Bibit Refill + Bibit Refill)
- Tujuan: Membuat aroma baru, karakter lebih kompleks, dupe hybrid, masking kekurangan bibit tertentu.
- Logika: Pilih role masing-masing bibit. Main DNA : 70-80%. Modifier : 10-20%. Support : 5-10%.
- Hindari: Mencampur 2 bibit sama-sama super manis, super tajam citrus, atau smoky berat agar tidak muddy/tabrakan.

LEVEL 2 (Bibit Refill + RAW Material)
- Tujuan: Meningkatkan performa, memperbaiki struktur, membuat aroma lebih profesional.
- Logika: Identifikasi problem -> Tentukan target -> Pilih 1-3 RAW Material SAJA.

LEVEL 3 (Bibit Refill + RAW Material + EO/FO)
- EO: memberi natural nuance, realism, depth. Gunakan 0.1-2%.
- FO: memberi gourmand effect, commercial smell. Gunakan sebagai aksen saja.

LEVEL 4 (Creative Hybrid System: Bibit Refill + RAW Material + Bibit Refill + EO/FO)
- Logika Besar: Bibit utama (DNA utama), Bibit kedua (pembentuk arah), RAW Material (struktur & performa), EO/FO (emosi & texture).
- Formula Struktur Ideal: Bibit utama (60-75%), Bibit kedua (10-25%), RAW Material (3-10%), EO/FO (0.5-3%).

LEVEL 5 (Structure Building System: Bibit Refill + RAW Material + EO + Bibit Refill)
- Logika Besar: EO masuk sebelum blend akhir karena sangat dominan. Bangun "fondasi aroma" dulu.

## R2. HUBUNGAN PROBLEM - TARGET - SOLUSI
AI TIDAK BOLEH menampilkan target yang tidak relevan. Output analisis harus berkorelasi lurus dengan input Kelompok Problem dan Sub Problem dari User. Jangan merekomendasikan solusi yang merusak balancing.

# INPUT USER
- Nama Bibit Utama: ${input.namaBibit}
- Karakter Aroma: ${input.karakterAroma}
- ${kelompokStr}
- ${subStr}
- Gejala Turunan: ${turunanProblemStr}
- Target Hasil: ${targetHasilStr}
- ${priorityLogic}
- Gender Market: ${input.genderMarket}
- Market Level: ${input.marketLevel}
- Style Aroma: ${input.styleAroma}
- Level Upgrade: ${input.levelUpgrade}
- Intensitas Aroma: ${input.intensitasAroma}
- Tipe Hasil: ${input.tipeHasil}

WARNING SYSTEM:
Jika formula over sweet, terlalu woody, metallic risk, atau muddy risk, berikan array peringatan.

Keluarkan hasil TANPA MARKDOWN (HANYA JSON) dengan format persis:
{
  "formula": [
    { "material": "string", "fungsi": "string", "persen": "string", "alasan": "string" }
  ],
  "analisa": {
    "karakterAroma": "string",
    "projectionScore": "number (skala 1-10 string ex: '8.5/10')",
    "longevityScore": "string",
    "smoothnessScore": "string",
    "marketStyle": "string",
    "compatibilityScore": "string (1-100)"
  },
  "warnings": ["string"],
  "smartSuggestion": "string"
}`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      formula: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            material: { type: Type.STRING },
            fungsi: { type: Type.STRING },
            persen: { type: Type.STRING },
            alasan: { type: Type.STRING }
          },
          required: ["material", "fungsi", "persen", "alasan"]
        }
      },
      analisa: {
        type: Type.OBJECT,
        properties: {
          karakterAroma: { type: Type.STRING },
          projectionScore: { type: Type.STRING },
          longevityScore: { type: Type.STRING },
          smoothnessScore: { type: Type.STRING },
          marketStyle: { type: Type.STRING },
          compatibilityScore: { type: Type.STRING }
        },
        required: ["karakterAroma", "projectionScore", "longevityScore", "smoothnessScore", "marketStyle", "compatibilityScore"]
      },
      warnings: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      smartSuggestion: { type: Type.STRING }
    },
    required: ["formula", "analisa", "warnings", "smartSuggestion"]
  };

  try {
    const gRes = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "gemini_proxy",
        prompt,
        schema
      })
    });
    const gData = await gRes.json();
    if (gData.success && gData.data) {
      return gData.data;
    }
  } catch (e) {
    console.warn("GAS Proxy failed, falling back to local Gemini", e);
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function interpretManualDNA(input: {
  kategoriUtama: string;
  karakterDominan: string;
  secondaryNotes: string;
  feelingAroma: string;
  targetHasil: string;
}) {
  const prompt = `Analisis input DNA parfum manual berikut:
    - Kategori Utama: ${input.kategoriUtama}
    - Karakter Dominan: ${input.karakterDominan}
    - Secondary Notes: ${input.secondaryNotes || "-"}
    - Feeling Aroma: ${input.feelingAroma || "-"}
    - Target Hasil: ${input.targetHasil || "-"}
    
    LANGKAH 1: INTERPRETASI KARAKTER MOLEKUL
    - Fresh Citrus / Aquatic / Green -> Molekul: Ringan, Sifat: Cepat naik, cepat hilang
    - Floral / Fruity -> Molekul: Medium, Sifat: Seimbang
    - Woody / Amber / Gourmand -> Molekul: Berat, Sifat: Tahan lama, sulit menyebar
    
    LANGKAH 2: IDENTIFIKASI MASALAH POTENSIAL
    - Molekul ringan -> Longevity lemah
    - Molekul berat -> Projection lemah
    - Feeling "tipis" -> Sillage lemah
    - Feeling "terlalu tajam" -> Harsh
    
    LANGKAH 3 & 4 & 5: PEMILIHAN BAHAN DARI DATABASE BERIKUT
    - Ambroxan: Fungsi (Fixative, Booster), Karakter (Amber woody), Strength (Medium), Volatilitas (Base), Efek (meningkatkan longevity + sedikit projection), Cocok (Woody, Amber, Fresh low dose), Hindari (over pada sweet), Dosis (1%-3%)
    - Iso E Super: Fungsi (Diffusion Booster), Karakter (Woody airy), Strength (Medium), Volatilitas (Middle), Efek (meningkatkan projection & sillage), Cocok (Woody, Fresh, Aromatic), Dosis (1%-4%)
    - Hedione: Fungsi (Diffusion + Sillage Booster), Karakter (Floral fresh), Strength (Low-Medium), Volatilitas (Middle), Efek (membuat aroma lebih hidup & menyebar), Cocok (Floral, Fresh Citrus), Dosis (1%-3%)
    - White Musk: Fungsi (Fixative, Smoothing), Karakter (Clean soft), Strength (Low), Volatilitas (Base), Efek (menghaluskan & menahan aroma), Cocok (semua DNA), Dosis (1%-3%)
    - Cashmeran: Fungsi (Signature + Booster), Karakter (Woody musky), Strength (Medium), Volatilitas (Middle-Base), Efek (menambah karakter & depth), Cocok (Woody, Amber), Dosis (0.5%-2%)
    - Bergamot (synthetic note): Fungsi (Complexity enhancer), Karakter (Citrus fresh), Volatilitas (Top), Efek (memberi brightness), Cocok (Fresh Citrus), Dosis (0.5%-2%)
    - Green Note: Fungsi (Complexity enhancer), Karakter (Green natural), Efek (memberi dimensi segar), Dosis (0.5%-1.5%)
    - Powdery Note: Fungsi (Smoothing), Karakter (Soft powdery), Efek (mengurangi ketajaman), Dosis (0.5%-2%)
    - Spicy Note (light): Fungsi (Signature enhancer), Karakter (warm spicy), Efek (memberi karakter unik), Cocok (Woody, Amber), Dosis (0.2%-1%)
    
    ATURAN PEMILIHAN:
    - WAJIB memilih HANYA dari database di atas.
    - Maksimal 4 bahan, total dosis tidak lebih dari 10%.
    - Prioritaskan bahan dengan multi-fungsi.
    - Jangan gunakan kombinasi bahan yang sama berulang untuk input berbeda.
    - Jika Secondary = Musky -> kurangi fixative tambahan.
    - Jika Secondary = Woody -> kurangi booster berat.
    - Jika Secondary = Citrus -> hindari over diffusion.
    - Jika Target = tahan lama -> prioritas fixative.
    - Jika Target = menyebar -> prioritas booster.
    - Jika Target = kompleks -> tambahkan enhancer.
    
    Interpretasikan menjadi:
    1. Tipe Molekul (Ringan / Berat / Campuran) dan sifatnya
    2. Masalah Utama
    3. Kategori Bahan Terpilih beserta contoh bahan dari database
    4. Alasan pemilihan secara sederhana
    
    Berikan analisis dalam format JSON.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      interpretasiDNA: {
        type: Type.OBJECT,
        properties: {
          tipeMolekul: { type: Type.STRING },
          sifat: { type: Type.STRING }
        },
        required: ["tipeMolekul", "sifat"]
      },
      masalahUtama: { type: Type.ARRAY, items: { type: Type.STRING } },
      kategoriBahanTerpilih: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            kategori: { type: Type.STRING },
            contohBahan: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["kategori", "contohBahan"]
        }
      },
      alasanPemilihan: { type: Type.STRING }
    },
    required: ["interpretasiDNA", "masalahUtama", "kategoriBahanTerpilih", "alasanPemilihan"]
  };

  const gasUrl = "https://script.google.com/macros/s/AKfycbxpybFgr2LVDRjOsoShd7_UElhmDgmTU3GrYqTEJioDYNDDiOZyUbluULereSE3SK-9/exec";
  try {
    const res = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "gemini_proxy",
        prompt,
        schema
      })
    });
    const d = await res.json();
    if (d.success && d.data) return d.data;
  } catch (e) { console.warn("Failed GAS proxy", e); }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return JSON.parse(response.text || "{}");
}

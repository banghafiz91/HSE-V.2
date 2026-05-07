export interface Perfume {
  id: number;
  name: string;
  brand: string;
  dna: string;
  primaryNotes: string;
  secondaryNotes: string;
  character: string;
  targetHasil?: string;
}

export type Ratio = "30:70" | "40:60" | "50:50" | "60:40" | "70:30";

export interface SPL {
  sillage: number;
  projection: number;
  longevity: number;
}

export interface OptimizationResult {
  experimentType: "LOW" | "MIDDLE" | "HIGH";
  ingredients: {
    name: string;
    function: string;
    dosage: number; // percentage of total
  }[];
  layeringEffect?: string;
  professionalEstimation?: string;
  analysisReason?: string;
  projectedSPL?: SPL;
  formula: {
    bibit: number;
    alkohol: number;
    additives: { name: string; percentage: number }[];
  };
}

export interface SimulationResult {
  before: SPL;
  after: SPL;
  explanation: string;
}

export interface MacerationAdvice {
  days: number;
  reason: string;
}

export interface ManualInterpretation {
  interpretasiDNA: {
    tipeMolekul: string;
    sifat: string;
  };
  masalahUtama: string[];
  kategoriBahanTerpilih: {
    kategori: string;
    contohBahan: string[];
  }[];
  alasanPemilihan: string;
}

export interface EvaluationResult {
  analisis: {
    kejadian: string;
    penyebab: string;
  };
  masalahUtama: string[];
  revisiFormula: {
    LOW: RevisionBudget;
    MIDDLE: RevisionBudget;
    HIGH: RevisionBudget;
  };
  simulasiHasil: {
    sebelum: SPL;
    sesudah: SPL;
  };
  catatanMaserasi: {
    tambahanHari: number;
    alasan: string;
  };
}

export interface RevisionBudget {
  deskripsi: string;
  tindakan: {
    jenis: "ADJUST_DOSIS" | "ADD_MATERIAL" | "REMOVE_REDUCE";
    bahan: string;
    dosisBaru: number;
    alasan: string;
  }[];
}

export interface AnalysisHistory {
  id: string;
  date: string;
  perfume: Perfume;
  ratio: Ratio;
  spl: SPL;
  selectedProblems: string[];
  results: OptimizationResult[];
  maceration: MacerationAdvice | null;
  simulation: SimulationResult | null;
}

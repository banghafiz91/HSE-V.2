export type ProblemGroup = 'SPL Performance' | 'Aroma Character';

export interface TargetRule {
  target: string[];
  priority: string[];
}

export interface SubProblem {
  description: string;
  turunan: string[];
  target: string[];
  priority: string[];
}

export const DYNAMIC_PROBLEM_ENGINE: Record<string, Record<string, SubProblem>> = {
  "SPL Performance": {
    "Projection Problem": {
      description: "aroma tidak menyebar.",
      turunan: [
        "Aroma terlalu dekat ke kulit",
        "Opening cepat mati",
        "Tidak ada aura",
        "Tidak nembak",
        "Kalah oleh alkohol",
        "Projection pendek",
        "Tidak memenuhi ruangan",
        "Semprotan terasa tipis"
      ],
      target: [
        "Projection lebih jauh",
        "Aura lebih besar",
        "Lebih nembak",
        "Mengisi ruangan",
        "Opening lebih hidup"
      ],
      priority: ["Iso E Super", "Hedione", "Ambroxan", "Dihydromyrcenol"]
    },
    "Sillage Problem": {
      description: "aroma tidak meninggalkan jejak.",
      turunan: [
        "Tidak ada trail",
        "Orang sekitar tidak mencium",
        "Aroma cepat hilang saat berjalan",
        "Tidak ada jejak aroma",
        "Aura parfum kecil",
        "Tidak membekas di ruangan"
      ],
      target: [
        "Trail lebih panjang",
        "Aroma lebih membekas",
        "Lebih noticeable",
        "Lebih mengundang perhatian"
      ],
      priority: ["Hedione", "White Musk", "Ambroxan", "Floral transparent molecule"]
    },
    "Longevity Problem": {
      description: "parfum tidak tahan lama.",
      turunan: [
        "Hilang dalam 1–2 jam",
        "Drydown kosong",
        "Aroma collapse",
        "Cepat menguap",
        "Base note cepat mati",
        "Tidak tahan di pakaian",
        "Aroma cepat hilang di kulit panas"
      ],
      target: [
        "Lebih tahan lama",
        "Drydown lebih hidup",
        "Base lebih kuat",
        "Tahan di pakaian",
        "Aroma stabil lebih lama"
      ],
      priority: ["Ambroxan", "Cashmeran", "Galaxolide", "Woody amber"]
    }
  },
  "Aroma Character": {
    "Sharpness Problem": {
      description: "aroma terlalu tajam.",
      turunan: [
        "Nusuk hidung",
        "Metallic",
        "Alkohol terasa",
        "Citrus terlalu pedas",
        "Synthetic kasar",
        "Over spicy",
        "Menusuk di opening"
      ],
      target: [
        "Lebih smooth",
        "Lebih soft",
        "Tidak menusuk",
        "Opening lebih halus",
        "Lebih nyaman dicium"
      ],
      priority: ["Hedione", "Galaxolide", "Lavender EO", "White Musk"]
    },
    "Sweetness Problem": {
      description: "aroma terlalu manis.",
      turunan: [
        "Eneg",
        "Seperti permen",
        "Aroma murahan",
        "Over gourmand",
        "Sticky feeling",
        "Bubblegum berlebihan",
        "Caramel overload"
      ],
      target: [
        "Sweetness lebih elegan",
        "Lebih creamy",
        "Sweet luxury",
        "Tidak eneg",
        "Gourmand premium"
      ],
      priority: ["Cedarwood EO", "Iso E Super", "Vetiver accord"]
    },
    "Smoky Problem": {
      description: "aroma terlalu smoky / gelap.",
      turunan: [
        "Terlalu dupa",
        "Sesak",
        "Berat",
        "Burnt effect",
        "Terlalu dewasa",
        "Over oud",
        "Asap berlebihan"
      ],
      target: [
        "Smoky lebih airy",
        "Lebih clean",
        "Lebih modern",
        "Tidak terlalu gelap",
        "Oud lebih halus"
      ],
      priority: ["Hedione", "Bergamot EO", "White Musk"]
    },
    "Flat Aroma Problem": {
      description: "aroma tidak berkembang.",
      turunan: [
        "Linear",
        "Membosankan",
        "Opening = drydown",
        "Tidak ada transisi",
        "Tidak ada texture",
        "Tidak punya dimensi"
      ],
      target: [
        "Lebih berdimensi",
        "Ada transisi aroma",
        "Lebih hidup",
        "Aroma berkembang",
        "Lebih textured"
      ],
      priority: ["Hedione", "Citrus top accord", "Transparent floral molecule"]
    },
    "Synthetic Problem": {
      description: "aroma terlalu synthetic.",
      turunan: [
        "Bau kimia",
        "Tidak natural",
        "Terasa plastik",
        "Sharp synthetic",
        "Fake sweetness",
        "Aroma terlalu artificial"
      ],
      target: [
        "Lebih natural",
        "Lebih realistis",
        "Fresh natural",
        "Citrus lebih alami",
        "Tidak terasa kimia"
      ],
      priority: ["Bergamot EO", "Lavender EO", "Natural citrus accord"]
    },
    "Muddy Problem": {
      description: "aroma blur dan tidak jelas.",
      turunan: [
        "Aroma numpuk",
        "Tidak jelas karakter",
        "Pusing",
        "Chaos",
        "Blend kotor",
        "Tidak readable"
      ],
      target: [
        "Blend lebih clean",
        "Lebih readable",
        "Karakter lebih jelas",
        "Transisi lebih rapi",
        "Aroma lebih terpisah"
      ],
      priority: ["Iso E Super", "Hedione", "Reset structure logic"]
    }
  }
};

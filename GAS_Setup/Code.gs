/* =========================================================
 * GOOGLE APPS SCRIPT - AI UPGRADE ENGINE PARFUM & LOGIN
 * =========================================================
 * 
 * Deployment Instructions:
 * 1. Open Google Sheets. Create a new Spreadsheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Delete any default code and paste this entire Code.gs code.
 * 4. Create a new file named "index.html" in the App Script editor and paste the HTML content there.
 * 5. Run the function `setupDatabaseSheets()` once to create all the tabs.
 * 6. Click Deploy > New Deployment.
 * 7. Choose type "Web App", set "Execute as: Me" and "Who has access: Anyone".
 * 8. Copy the Web App URL and set it as VITE_GAS_API_URL in your React project's .env file.
 */

function doPost(e) {
  try {
    let payload = {};
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter;
      }
    } else {
      payload = e.parameter;
    }

    // Default action fallback
    const action = (payload.action || "").toLowerCase();

    if (action === "login") {
      return handleLogin(payload);
    } else if (action === "register") {
      return handleRegister(payload);
    } else if (action === "generate") {
      return handleGenerate(payload);
    } else if (action === "gemini_proxy") {
      return handleGeminiProxy(payload);
    } else {
      return _jsonResponse({ error: "Unknown Action", received: action });
    }
  } catch (error) {
    return _jsonResponse({ error: error.message });
  }
}

function doGet(e) {
  let page = e.parameter.page || 'index';
  return HtmlService.createHtmlOutputFromFile(page)
    .setTitle("Parfum Hybrid Scent Engineer AI Engine")
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Helper Json response
function _jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}


// ============================================
// 1. SETUP & UTILS
// ============================================

function getOrCreateSheet(sheetName, headers = []) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (headers.length > 0) {
      sheet.appendRow(headers);
    }
  }
  return sheet;
}

// Function yang WAJIB dijalankan pertama kali untuk buat semua sheet table
function setupDatabaseSheets() {
  getOrCreateSheet("USERS", ["id", "username", "email", "password", "expired_date", "is_active", "role", "created_at", "whatsapp"]);
  
  const dnaSheet = getOrCreateSheet("DNA_DATABASE", ["id", "parfum", "dna", "family", "character", "sweetness", "freshness", "smokiness", "creaminess", "luxury", "market"]);
  if (dnaSheet.getLastRow() <= 1) {
    const dnaData = [
    [1, "Dior Sauvage", "Ambroxan fresh spicy", "Aromatic Fresh", "maskulin modern", 5, 5, 5, 5, 5, "Premium"],
    [2, "Bleu de Chanel", "Citrus woody incense", "Woody Aromatic", "elegan clean", 5, 5, 5, 5, 5, "Premium"],
    [3, "Acqua di Gio Profumo", "Marine incense", "Aquatic Woody", "classy pria dewasa", 5, 5, 5, 5, 5, "Premium"],
    [4, "Acqua di Gio Profondo", "Marine mineral aromatic", "Aquatic Fresh", "fresh aquatic modern", 5, 5, 5, 5, 5, "Premium"],
    [5, "Versace Dylan Blue", "Blue ambrox citrus", "Aromatic Fresh", "sexy fresh", 5, 5, 5, 5, 5, "Premium"],
    [6, "Bvlgari Aqva", "Marine salty citrus", "Aquatic", "laut maskulin", 5, 5, 5, 5, 5, "Premium"],
    [7, "Nautica Voyage", "Green apple aquatic", "Fresh Green", "fresh murah favorit", 5, 5, 5, 5, 5, "Premium"],
    [8, "Davidoff Cool Water", "Lavender marine", "Aromatic Aquatic", "clean classic", 5, 5, 5, 5, 5, "Premium"],
    [9, "Afnan Turathi Blue", "Citrus amber musk", "Blue Fresh", "semi niche fresh", 5, 5, 5, 5, 5, "Premium"],
    [10, "Armaf Urban Man Elixir", "Sauvage style spicy blue", "Aromatic", "beast fresh", 5, 5, 5, 5, 5, "Premium"],
    [11, "Creed Aventus", "Pineapple smoky musk", "Fruity Chypre", "alpha masculine", 5, 5, 5, 5, 5, "Premium"],
    [12, "Armaf Club de Nuit Intense", "Smoky lemon musk", "Fruity Smoky", "refill favorit", 5, 5, 5, 5, 5, "Premium"],
    [13, "Mont Blanc Explorer", "Woody ambrox pineapple", "Woody Fresh", "modern office", 5, 5, 5, 5, 5, "Premium"],
    [14, "Afnan Supremacy Silver", "Fruity birch musk", "Fruity Woody", "elegant clone", 5, 5, 5, 5, 5, "Premium"],
    [15, "Nishane Hacivat", "Pineapple oakmoss", "Fruity Chypre", "niche luxury", 5, 5, 5, 5, 5, "Premium"],
    [16, "Mancera Cedrat Boise", "Citrus leather fruity", "Woody Citrus", "niche versatile", 5, 5, 5, 5, 5, "Premium"],
    [17, "Lattafa Qaed Al Fursan", "Pineapple saffron woody", "Fruity Oriental", "murah gacor", 5, 5, 5, 5, 5, "Premium"],
    [18, "Zara Vibrant Leather", "Citrus leather", "Woody Fresh", "Aventus ringan", 5, 5, 5, 5, 5, "Premium"],
    [19, "Al Haramain L'Aventure", "Lemon pineapple musk", "Fruity Fresh", "projection tinggi", 5, 5, 5, 5, 5, "Premium"],
    [20, "Rasasi Zebra Pour Homme", "Fruity woody smoky", "Woody Fruity", "arabian aventus", 5, 5, 5, 5, 5, "Premium"],
    [21, "Versace Eros", "Mint vanilla apple", "Aromatic Gourmand", "clubbing", 5, 5, 5, 5, 5, "Premium"],
    [22, "Jean Paul Gaultier Ultra Male", "Pear vanilla cinnamon", "Sweet Oriental", "sexy muda", 5, 5, 5, 5, 5, "Premium"],
    [23, "Afnan 9PM", "Bubblegum vanilla", "Sweet Amber", "refill viral", 5, 5, 5, 5, 5, "Premium"],
    [24, "Paco Rabanne 1 Million", "Cinnamon leather sweet", "Spicy Oriental", "flashy", 5, 5, 5, 5, 5, "Premium"],
    [25, "Paco Rabanne Invictus", "Bubblegum marine", "Sweet Fresh", "sporty manis", 5, 5, 5, 5, 5, "Premium"],
    [26, "Stronger With You", "Chestnut vanilla amber", "Gourmand Woody", "romantis", 5, 5, 5, 5, 5, "Premium"],
    [27, "Scandal Pour Homme", "Caramel tonka", "Sweet Gourmand", "bold malam", 5, 5, 5, 5, 5, "Premium"],
    [28, "Le Male Elixir", "Honey vanilla tobacco", "Oriental Gourmand", "viral manis", 5, 5, 5, 5, 5, "Premium"],
    [29, "Hawas Rasasi", "Aquatic bubblegum", "Sweet Aquatic", "mass appealing", 5, 5, 5, 5, 5, "Premium"],
    [30, "YSL Y EDP", "Apple ambrox sage", "Fresh Sweet", "modern pria", 5, 5, 5, 5, 5, "Premium"],
    [31, "Maison Francis Kurkdjian Baccarat Rouge 540", "Saffron amber ethyl maltol", "Amber Sweet", "airy luxury", 5, 5, 5, 5, 5, "Premium"],
    [32, "Lattafa Ana Abiyedh Rouge", "Sweet amber airy", "Amber", "dupe BR540", 5, 5, 5, 5, 5, "Premium"],
    [33, "Armaf Untold", "Metallic sweet amber", "Amber Woody", "clone populer", 5, 5, 5, 5, 5, "Premium"],
    [34, "Burberry Her", "Strawberry musk amber", "Fruity Gourmand", "cewek viral", 5, 5, 5, 5, 5, "Premium"],
    [35, "Cloud Ariana Grande", "Coconut praline musk", "Sweet Musky", "BR540 feminin", 5, 5, 5, 5, 5, "Premium"],
    [36, "Instant Crush Mancera", "Saffron vanilla amber", "Amber Spicy", "beast niche", 5, 5, 5, 5, 5, "Premium"],
    [37, "Erba Pura Xerjoff", "Fruity musk vanilla", "Fruity Musky", "fruity niche", 5, 5, 5, 5, 5, "Premium"],
    [38, "Khamrah Lattafa", "Cinnamon praline dates", "Oriental Gourmand", "arab sweet", 5, 5, 5, 5, 5, "Premium"],
    [39, "Oud for Glory Lattafa", "Oud saffron patchouli", "Oud Oriental", "oud viral", 5, 5, 5, 5, 5, "Premium"],
    [40, "Delina Parfums de Marly", "Rose lychee musk", "Floral Fruity", "cewek premium", 5, 5, 5, 5, 5, "Premium"],
    [41, "Terre d'Hermes", "Orange vetiver cedar", "Woody Citrus", "mature classy", 5, 5, 5, 5, 5, "Premium"],
    [42, "Encre Noire", "Vetiver dark woody", "Woody Earthy", "gelap elegan", 5, 5, 5, 5, 5, "Premium"],
    [43, "Lalique White", "Tamarind spicy musk", "Woody Spicy", "unique office", 5, 5, 5, 5, 5, "Premium"],
    [44, "Prada L'Homme", "Iris powder clean", "Powdery Woody", "clean luxury", 5, 5, 5, 5, 5, "Premium"],
    [45, "Dior Homme Intense", "Iris cacao woody", "Powdery Gourmand", "gentleman", 5, 5, 5, 5, 5, "Premium"],
    [46, "Givenchy Gentleman Reserve Privée", "Whisky iris chestnut", "Boozy Woody", "classy malam", 5, 5, 5, 5, 5, "Premium"],
    [47, "Boss Bottled", "Apple cinnamon woody", "Woody Sweet", "formal casual", 5, 5, 5, 5, 5, "Premium"],
    [48, "Gucci Guilty", "Lavender lemon patchouli", "Aromatic Woody", "sensual", 5, 5, 5, 5, 5, "Premium"],
    [49, "Dunhill Icon", "Neroli black pepper", "Citrus Woody", "executive", 5, 5, 5, 5, 5, "Premium"],
    [50, "Bentley for Men Intense", "Rum leather incense", "Boozy Leather", "mature powerful", 5, 5, 5, 5, 5, "Premium"],
    [51, "Oud Satin Mood", "Rose oud vanilla", "Oud Floral", "luxury arab", 5, 5, 5, 5, 5, "Premium"],
    [52, "Black Afgano", "Cannabis incense oud", "Dark Woody", "misterius", 5, 5, 5, 5, 5, "Premium"],
    [53, "Ombre Nomade", "Raspberry oud incense", "Oud Smoky", "mahal niche", 5, 5, 5, 5, 5, "Premium"],
    [54, "Arabians Tonka", "Rose oud tonka", "Oriental Oud", "beast mode", 5, 5, 5, 5, 5, "Premium"],
    [55, "Shaghaf Oud", "Praline oud vanilla", "Sweet Oud", "refill favorit", 5, 5, 5, 5, 5, "Premium"],
    [56, "Swiss Arabian Shaghaf Oud Aswad", "Rose saffron oud", "Oud Floral", "arab sweet", 5, 5, 5, 5, 5, "Premium"],
    [57, "Lattafa Bade'e Al Oud", "Sweet smoky oud", "Oriental Oud", "viral murah", 5, 5, 5, 5, 5, "Premium"],
    [58, "Amouage Interlude", "Oregano incense amber", "Smoky Oriental", "niche berat", 5, 5, 5, 5, 5, "Premium"],
    [59, "Initio Oud for Greatness", "Lavender saffron oud", "Fresh Oud", "luxury modern", 5, 5, 5, 5, 5, "Premium"],
    [60, "Khaltat Night", "Cherry apple vanilla", "Sweet Oriental", "Timur Tengah", 5, 5, 5, 5, 5, "Premium"],
    [61, "Miss Dior Blooming Bouquet", "Rose peony musk", "Floral Fresh", "feminin clean", 5, 5, 5, 5, 5, "Premium"],
    [62, "Chanel Chance Eau Tendre", "Grapefruit jasmine musk", "Fruity Floral", "soft girly", 5, 5, 5, 5, 5, "Premium"],
    [63, "Gucci Bloom", "White floral tuberose", "Floral White", "elegan cewek", 5, 5, 5, 5, 5, "Premium"],
    [64, "Lancome La Vie Est Belle", "Pear praline vanilla", "Sweet Floral", "manis elegan", 5, 5, 5, 5, 5, "Premium"],
    [65, "Black Opium", "Coffee vanilla white floral", "Gourmand Floral", "sexy malam", 5, 5, 5, 5, 5, "Premium"],
    [66, "Good Girl", "Almond cacao tuberose", "Oriental Floral", "femme fatale", 5, 5, 5, 5, 5, "Premium"],
    [67, "Libre YSL", "Lavender vanilla musk", "Floral Aromatic", "modern wanita", 5, 5, 5, 5, 5, "Premium"],
    [68, "Bright Crystal", "Yuzu peony musk", "Fresh Floral", "fresh wanita", 5, 5, 5, 5, 5, "Premium"],
    [69, "Bombshell Victoria's Secret", "Fruity floral fresh", "Fruity Floral", "cewek muda", 5, 5, 5, 5, 5, "Premium"],
    [70, "J'adore Dior", "Jasmine floral fruity", "Floral Luxury", "classy wanita", 5, 5, 5, 5, 5, "Premium"],
    [71, "Tobacco Vanille", "Tobacco vanilla cacao", "Gourmand Tobacco", "mahal hangat", 5, 5, 5, 5, 5, "Premium"],
    [72, "Vanilla 28 Kayali", "Brown sugar vanilla", "Vanilla Gourmand", "viral cewek", 5, 5, 5, 5, 5, "Premium"],
    [73, "Bianco Latte", "Milk caramel vanilla", "Milky Gourmand", "creamy viral", 5, 5, 5, 5, 5, "Premium"],
    [74, "Chocolate Greedy", "Chocolate vanilla coffee", "Chocolate Gourmand", "dessert scent", 5, 5, 5, 5, 5, "Premium"],
    [75, "Casamorati Lira", "Lemon caramel vanilla", "Citrus Gourmand", "luxury cake", 5, 5, 5, 5, 5, "Premium"],
    [76, "Nebras Lattafa", "Cocoa vanilla berries", "Sweet Gourmand", "murah viral", 5, 5, 5, 5, 5, "Premium"],
    [77, "Eilish Billie Eilish", "Vanilla cacao sugar", "Warm Gourmand", "cozy", 5, 5, 5, 5, 5, "Premium"],
    [78, "Cheirosa 62", "Pistachio caramel vanilla", "Beach Gourmand", "body mist viral", 5, 5, 5, 5, 5, "Premium"],
    [79, "Kerosene Followed", "Coffee maple syrup", "Coffee Gourmand", "ekstrem", 5, 5, 5, 5, 5, "Premium"],
    [80, "Angel Share", "Cognac cinnamon praline", "Boozy Gourmand", "luxury malam", 5, 5, 5, 5, 5, "Premium"],
    [81, "Le Labo Another 13", "Ambrox musk pear", "Musky Clean", "clean niche", 5, 5, 5, 5, 5, "Premium"],
    [82, "Santal 33", "Sandalwood leather iris", "Woody Musky", "artsy niche", 5, 5, 5, 5, 5, "Premium"],
    [83, "Molecule 01", "Iso E Super dominant", "Woody Transparent", "skin scent", 5, 5, 5, 5, 5, "Premium"],
    [84, "Gypsy Water", "Juniper vanilla incense", "Woody Aromatic", "airy niche", 5, 5, 5, 5, 5, "Premium"],
    [85, "Byredo Mojave Ghost", "Sapodilla musk violet", "Musky Floral", "clean luxury", 5, 5, 5, 5, 5, "Premium"],
    [86, "Replica Lazy Sunday Morning", "White musk aldehydic", "Clean Musky", "laundry vibes", 5, 5, 5, 5, 5, "Premium"],
    [87, "Replica Jazz Club", "Rum tobacco vanilla", "Boozy Tobacco", "bar vibes", 5, 5, 5, 5, 5, "Premium"],
    [88, "Philosykos", "Fig green woody", "Green Woody", "natural niche", 5, 5, 5, 5, 5, "Premium"],
    [89, "Bal d'Afrique", "Lemon vetiver amber", "Citrus Woody", "elegant niche", 5, 5, 5, 5, 5, "Premium"],
    [90, "Wood Sage & Sea Salt", "Sea salt sage musk", "Aquatic Aromatic", "minimal clean", 5, 5, 5, 5, 5, "Premium"],
    [91, "HMNS Orgsm", "Floral vanilla amber", "Sweet Floral", "lokal viral", 5, 5, 5, 5, 5, "Premium"],
    [92, "Kahf Revered Oud", "Fresh oud amber", "Fresh Oud", "muslim modern", 5, 5, 5, 5, 5, "Premium"],
    [93, "Carl & Claire", "Fresh fruity floral", "Casual Fresh", "market muda", 5, 5, 5, 5, 5, "Premium"],
    [94, "Onix Black", "Sweet woody musk", "Woody Sweet", "refill lokal", 5, 5, 5, 5, 5, "Premium"],
    [95, "Miniso Garden of Mirror", "Fruity musky", "Fruity Clean", "murah awet", 5, 5, 5, 5, 5, "Premium"],
    [96, "Mykonos", "Fresh tropical aquatic", "Fresh Tropical", "daily use", 5, 5, 5, 5, 5, "Premium"],
    [97, "Evangeline Black Sakura", "Floral powdery sweet", "Floral Sweet", "market luas", 5, 5, 5, 5, 5, "Premium"],
    [98, "Vitalis Her Majesty", "Sweet powder floral", "Powdery Floral", "nostalgia", 5, 5, 5, 5, 5, "Premium"],
    [99, "Morris Eau de Parfum", "Fresh woody amber", "Fresh Woody", "market pria", 5, 5, 5, 5, 5, "Premium"],
    [100, "Casablanca", "Powdery floral musk", "Powdery", "market klasik", 5, 5, 5, 5, 5, "Premium"]
    ];
    dnaSheet.getRange(2, 1, dnaData.length, dnaData[0].length).setValues(dnaData);
  }

  const acSheet = getOrCreateSheet("AROMA_CHEMICALS", ["material", "role", "effect", "overdose_effect", "compatible_family", "min_dose", "max_dose"]);
  if (acSheet.getLastRow() <= 1) {
    const acData = [];
    acData.push(["Ambroxan", "Fixative", "Ambery, musky", "Sakit kepala", "Aromatic", 1, 15]);
    acSheet.getRange(2, 1, acData.length, acData[0].length).setValues(acData);
  }

  const probSheet = getOrCreateSheet("PROBLEM_SOLVER", ["problem", "solution", "recommended_ac", "max_dose", "impact", "category"]);
  if (probSheet.getLastRow() <= 1) {
    const probData = [];
    probData.push(["Kurang awet", "Tambahkan fixative", "Ambroxan, Iso E Super", 10, "High", "Longevity"]);
    probSheet.getRange(2, 1, probData.length, probData[0].length).setValues(probData);
  }
}

function getDbDataAsObjects(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  const result = [];
  for (let i = 1; i < data.length; i++) {
    let rowObj = {};
    for (let j = 0; j < headers.length; j++) {
      rowObj[headers[j]] = data[i][j];
    }
    result.push(rowObj);
  }
  return result;
}


// ============================================
// 2. LOGIN & REGISTER
// ============================================

function handleLogin(payload) {
  const { email, password } = payload;
  if (!email || !password) return _jsonResponse({ success: false, message: "Email dan password wajib diisi." });

  const sheet = getOrCreateSheet("USERS", ["id", "username", "email", "password", "expired_date", "is_active", "role", "created_at", "whatsapp"]);
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return _jsonResponse({ success: false, message: "User tidak ditemukan." });
  }

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const dbEmail = row[2];
    const dbPassword = row[3];
    const isActive = row[5];
    
    if (String(dbEmail).trim().toLowerCase() === String(email).trim().toLowerCase() && String(dbPassword) === String(password)) {
      if (String(isActive).toLowerCase() !== 'active') {
        return _jsonResponse({ success: false, message: "Akun belum diaktifkan oleh admin." });
      }
      return _jsonResponse({ 
        success: true, 
        message: "Login berhasil.",
        user: { id: row[0], username: row[1], email: dbEmail, role: row[6], expired_date: row[4] }
      });
    }
  }
  return _jsonResponse({ success: false, message: "Email atau password salah." });
}

function handleRegister(payload) {
  const { username, nama, email, password, whatsapp } = payload;
  const uname = username || nama;
  if (!uname || !email || !password || !whatsapp) return _jsonResponse({ success: false, message: "Username, email, password, dan no whatsapp wajib diisi." });

  if(!String(whatsapp).startsWith("628")) return _jsonResponse({ success: false, message: "Nomor WhatsApp wajib diawali 628... bukan 08..." });

  const sheet = getOrCreateSheet("USERS", ["id", "username", "email", "password", "expired_date", "is_active", "role", "created_at", "whatsapp"]);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][2]).trim().toLowerCase() === String(email).trim().toLowerCase()) {
      return _jsonResponse({ success: false, message: "Email sudah terdaftar." });
    }
  }
  
  const id = Utilities.getUuid();
  const createdAt = new Date().toISOString();
  // Set expired_date 1 tahun by default
  let expDate = new Date();
  expDate.setFullYear(expDate.getFullYear() + 1);
  
  sheet.appendRow([id, uname, email, password, expDate.toISOString(), "inactive", "user", createdAt, whatsapp]);
  
  return _jsonResponse({ success: true, message: "Pendaftaran berhasil! Akun belum aktif, silakan minta admin untuk mengaktifkan akun anda." });
}


// ============================================
// 3. AI UPGRADE ENGINE LOGIC (PARFUM REFILL SYSTEM)
// ============================================

function handleGenerate(payload) {
  const { parfum, problem, target, gender, market, style, level } = payload;
  
  // Baca Data dari Spreadsheet (Membaca DNA, Problem, Target, dll)
  let dbDNA = getDbDataAsObjects("DNA_DATABASE");
  let dbProblem = getDbDataAsObjects("PROBLEM_SOLVER");
  let dbTarget = getDbDataAsObjects("TARGET_ENGINE");
  let dbStyle = getDbDataAsObjects("STYLE_ENGINE");

  // Jika DB kosong, kita stop atau beri mock
  if(dbDNA.length === 0) {
    return _jsonResponse({ success: false, message: "Database DNA kosong! Harap jalankan setupDatabaseSheets() di Apps Script."});
  }

  // STEP 2: Ambil Data DNA Input
  let targetDNA = dbDNA.find(d => typeof d.parfum === 'string' && d.parfum.toLowerCase() === parfum.toLowerCase());
  if(!targetDNA) {
    // Jika tidak ketemu di DB, mock baseline
    targetDNA = { parfum: parfum, family: "Unknown", character: "Neutral", sweetness: 5, freshness: 5, smokiness: 5, creaminess: 5, luxury: 5 };
  } else {
    // Pastikan angka valid (dari parse Sheet API kadang string)
    targetDNA.sweetness = Number(targetDNA.sweetness) || 5;
    targetDNA.freshness = Number(targetDNA.freshness) || 5;
    targetDNA.smokiness = Number(targetDNA.smokiness) || 5;
    targetDNA.creaminess = Number(targetDNA.creaminess) || 5;
    targetDNA.luxury = Number(targetDNA.luxury) || 5;
  }

  // Variabel untuk output
  let formula = [];
  let warnings = [];
  let improvements = [];
  let score = { projection: 7, longevity: 7, luxury: 7, smoothness: 7, massAppeal: 7 };

  // Material yang akan ditambahkan (AC, EO, FO) berserta rules max
  let activeModifiers = [];
  function addModifier(material, role, percent) {
    activeModifiers.push({ Material: material, Fungsi: role, Persen: percent });
  }

  // STEP 4: BACA PROBLEM
  if (problem) {
    let probDef = dbProblem.find(p => p.problem && p.problem.toLowerCase() === problem.toLowerCase());
    if(probDef) {
       addModifier(probDef.solution_material, "Problem Solver (" + problem + ")", 3);
    } else {
       // fallback common problem
       if(problem.toLowerCase().includes("tajam")) addModifier("Hedione", "Problem Solver (tajam)", 4);
       if(problem.toLowerCase().includes("lemah")) addModifier("Iso E Super", "Problem Solver (lemah)", 3);
    }
  }

  // STEP 5: BACA TARGET
  if (target) {
    let tarDef = dbTarget.find(t => t.target && t.target.toLowerCase() === target.toLowerCase());
    if(tarDef) {
       addModifier(tarDef.material_priority, "Booster Target (" + target + ")", 3);
    }
  }

  // STEP 6: BACA STYLE
  if (style) {
    let styleDef = dbStyle.find(s => s.style && s.style.toLowerCase() === style.toLowerCase());
    if(styleDef) {
       addModifier(styleDef.priority_material, "Style Modifier (" + style + ")", 2);
    }
  }

  // COMPATIBILITY RULES ENGINE (Tweak modifier parameters by DNA character)
  // JIKA sweetness terlalu tinggi MAKA kurangi vanilla tambah woody
  if (targetDNA.sweetness > 7) {
    warnings.push("⚠ Kemanisan tinggi terdeteksi. Disarankan menambah Woody Element.");
    addModifier("Iso E Super", "Balancing (Kurangi manis)", 2);
    // remove vanilla if exists
    activeModifiers = activeModifiers.filter(m => !m.Material.toLowerCase().includes("vanilla"));
    score.smoothness -= 1;
  }
  // JIKA smokiness terlalu tinggi
  if (targetDNA.smokiness > 6) {
    addModifier("Bergamot EO", "Balancing (Meringankan Asap)", 1);
    score.massAppeal -= 1;
  }
  // JIKA target = beast mode
  if (target && target.toLowerCase().includes("beast")) {
    addModifier("Ambroxan", "Beast Mode Core", 3);
    score.projection += 2;
    score.longevity += 2;
  }


  const lvlMatch = String(level).match(/\d+/);
  const lvl = lvlMatch ? parseInt(lvlMatch[0], 10) : 1;
  let remainingPct = 100;

  // RULE 1, 5, 6 checking
  // Pastikan EO berapapun yg masuk ga lewat limitnya

  if (lvl === 1) {
    // LEVEL 1: BIBIT + BIBIT
    // Cari secondary DNA yang se-family, tapi bukan parfum itu sendiri
    let secDNA = dbDNA.find(d => typeof d.parfum === 'string' && d.parfum.toLowerCase() !== parfum.toLowerCase() && d.family === targetDNA.family);
    if (!secDNA && dbDNA.length > 1) secDNA = dbDNA.find(d => d.parfum.toLowerCase() !== parfum.toLowerCase()); // fallback

    formula.push({ Material: targetDNA.parfum, Fungsi: "Main DNA", Persen: 70 });
    if(secDNA) {
      formula.push({ Material: secDNA.parfum, Fungsi: "Secondary DNA (Smooth Transition)", Persen: 30 });
    } else {
      formula[0].Persen = 100; // if no other dna
    }
    
    score.massAppeal += 1; // mass appeal safe zone
  } 
  else if (lvl === 2) {
    // LEVEL 2: BIBIT + AROMA CHEMICAL
    // Hanya AC saja, EO tidak dimaksukan
    activeModifiers = activeModifiers.filter(m => !m.Material.toLowerCase().includes("eo") && !m.Material.toLowerCase().includes("fo"));
    
    let acc = 0;
    activeModifiers.slice(0,3).forEach(m => { // Rule 1: Max 3 AC
      formula.push(m);
      acc += m.Persen;
    });

    remainingPct -= acc;
    formula.unshift({ Material: targetDNA.parfum, Fungsi: "Main DNA", Persen: remainingPct });
    
    score.projection += 1;
    score.longevity += 1;
    score.luxury += 1;
  }
  else if (lvl === 3) {
    // LEVEL 3: BIBIT + AC + EO/FO
    let acc = 0;
    activeModifiers.forEach(m => { 
      formula.push(m);
      acc += m.Persen;
    });
    
    if(!activeModifiers.find(m => m.Material.includes("EO"))) {
      formula.push({ Material: "Bergamot EO", Fungsi: "Natural Top Note Boost", Persen: 1 });
      acc += 1;
    }

    remainingPct -= acc;
    formula.unshift({ Material: targetDNA.parfum, Fungsi: "Main DNA", Persen: remainingPct });
    
    score.luxury += 1.5;
    score.smoothness += 1;
  }
  else if (lvl >= 4) {
    // LEVEL 4 & 5: CREATIVE HYBRID / STRUCTURE BUILD
    let secDNA = dbDNA.find(d => typeof d.parfum === 'string' && d.parfum.toLowerCase() !== parfum.toLowerCase() && d.family === targetDNA.family);
    
    let mainDnaPct = 65; // Dominan (Rule 3)
    let secDnaPct = 20;  // Secondary DNA 20% (Rule 4)
    remainingPct = 100 - (mainDnaPct + secDnaPct);

    formula.push({ Material: targetDNA.parfum, Fungsi: "Main DNA Base", Persen: mainDnaPct });
    if(secDNA) {
      formula.push({ Material: secDNA.parfum, Fungsi: "Smoothing Support DNA", Persen: secDnaPct });
    }
    
    let totalAcEo = 0;
    activeModifiers.forEach(m => {
      // Scale down AC/EO parameters for level 4 to fit remaining 15%
      let p = m.Persen;
      if (totalAcEo + p > remainingPct) p = remainingPct - totalAcEo;
      if (p > 0) {
        formula.push({ Material: m.Material, Fungsi: m.Fungsi, Persen: p });
        totalAcEo += p;
      }
    });

    // Kalau ada sisa balikin ke Main DNA
    let unused = remainingPct - totalAcEo;
    if (unused > 0) {
      formula[0].Persen += unused;
    }

    score.projection += 1.5;
    score.longevity += 2;
    score.luxury += 2;
  }

  // WARNING GENERATOR BASED ON FORMULA
  let totalEO = activeModifiers.filter(m => m.Material.includes("EO")).reduce((acc, m) => acc + m.Persen, 0);
  let totalFO = activeModifiers.filter(m => m.Material.includes("FO")).reduce((acc, m) => acc + m.Persen, 0);
  let totalAmbroxan = activeModifiers.filter(m => m.Material.toLowerCase().includes("ambroxan")).reduce((acc, m) => acc + m.Persen, 0);

  if (totalEO > 2) warnings.push("⚠ EO maksimal 2% agar struktur tidak rusak/unstable.");
  if (totalFO > 3) warnings.push("⚠ FO melebihi 3%, ada resiko clouding atau bau apek.");
  if (totalAmbroxan > 3) warnings.push("⚠ Ambroxan berlebih dapat memberi efek metallic yang kurang nyaman.");
  
  // Format characteristics
  let customKarakter = [
    targetDNA.family,
    targetDNA.character,
    target ? target.replace("Lebih ", "") : "",
    "premium"
  ].filter(Boolean).join(" ").toLowerCase();

  improvements.push("Tambahkan Cashmeran 0.5% jika ingin niche woody luxury effect.");
  if(targetDNA.freshness < 5) improvements.push("Jika butuh fresh opening, pakai Bergamot EO max 1%.");

  // Output formatting matching the frontend parser
  let outputData = {
    success: true,
    data: {
      formula: formula.map(item => ({
        material: item.Material,
        fungsi: item.Fungsi,
        persen: item.Persen + "%",
        alasan: "Auto-adjusted for level " + lvl
      })),
      analisa: {
        karakterAroma: customKarakter,
        projectionScore: clamp(score.projection) + "/10",
        longevityScore: clamp(score.longevity) + "/10",
        smoothnessScore: clamp(score.smoothness) + "/10",
        marketStyle: style || "General",
        compatibilityScore: (100 - (warnings.length * 5)).toString()
      },
      warnings: warnings,
      smartSuggestion: improvements.join(" ")
    }
  };

  return _jsonResponse(outputData);
}

function clamp(val) {
  val = parseFloat(val);
  if(val > 10) return 9.5;
  if(val < 1) return 1;
  return val;
}

function myFunction() {
  Logger.log("Jalankan fungsi setupDatabaseSheets(), bukan myFunction()");
}

function handleGeminiProxy(payload) {
  // GANTI TEKS DI BAWAH INI DENGAN API KEY ANDA DARI: https://aistudio.google.com/app/apikey
  const API_KEY = "AIzaSyB3wBhFYwh6_ZbDl3F7_ykDSic_gVPXZH0"; 
  
  if (!API_KEY || API_KEY === "MASUKKAN_API_KEY_GEMINI_ANDA_DISINI") {
     return _jsonResponse({ success: false, message: "API Key Gemini belum disetting di Code.gs" });
  }

  const { prompt, schema } = payload;
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY;
  
  let gPayload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };
  
  if (schema) {
    gPayload.generationConfig.responseSchema = schema;
  }
  
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(gPayload),
    muteHttpExceptions: true
  };
  
  try {
    const res = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(res.getContentText());
    
    if (data.error) {
      return _jsonResponse({ success: false, message: data.error.message || "Gemini API Error" });
    }
    
    let textOut = data.candidates[0].content.parts[0].text;
    return _jsonResponse({ success: true, data: JSON.parse(textOut) });
  } catch(e) {
    return _jsonResponse({ success: false, message: e.toString() });
  }
}

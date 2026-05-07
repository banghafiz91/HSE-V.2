import fs from 'fs';

const content = fs.readFileSync('src/data/parfumDatabase.ts', 'utf8');

const match = content.match(/export const parfumDatabase = (\[[\s\S]*?\]);/);
if (match) {
  let jsonString = match[1];
  
  const properties = ['id', 'name', 'dna', 'family', 'character'];
  properties.forEach(prop => {
    jsonString = jsonString.replace(new RegExp(prop + ':', 'g'), '"' + prop + '":');
  });

  const db = JSON.parse(jsonString);
  const rows = db.map(item => `    [${item.id}, "${item.name}", "${item.dna}", "${item.family}", "${item.character}", 5, 5, 5, 5, 5, "Premium"]`);
  
  let codeGs = fs.readFileSync('GAS_Setup/Code.gs', 'utf8');
  
  const replacer = `function setupDatabaseSheets() {
  getOrCreateSheet("USERS", ["id", "username", "email", "password", "expired_date", "is_active", "role", "created_at", "whatsapp"]);
  
  const dnaSheet = getOrCreateSheet("DNA_DATABASE", ["id", "parfum", "dna", "family", "character", "sweetness", "freshness", "smokiness", "creaminess", "luxury", "market"]);
  if (dnaSheet.getLastRow() <= 1) {
    const dnaData = [
${rows.join(",\n")}
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
}`;

  codeGs = codeGs.replace(/function setupDatabaseSheets\(\) \{[\s\S]*?^\}/m, replacer);
  fs.writeFileSync('GAS_Setup/Code.gs', codeGs);
  console.log("Success");
}

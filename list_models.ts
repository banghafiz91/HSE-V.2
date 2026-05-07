import { GoogleGenAI } from "@google/genai";
async function listModels() {
  const g = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const res = await g.models.list();
  for await (const model of res) {
    if (model.name.includes('flash')) console.log(model.name);
  }
}
listModels().catch(console.error);

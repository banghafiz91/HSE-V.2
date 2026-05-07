import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON parsing middleware for API routes
  app.use(express.json());

  // Proxy route for Google Apps Script to bypass iframe/CORS issues
  app.post("/api/gas", async (req, res) => {
    try {
      const { url, payload } = req.body;
      if (!url || !payload) {
        return res.status(400).json({ success: false, message: "Missing url or payload" });
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("GAS Proxy Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Proxy error: " + (error instanceof Error ? error.message : String(error))
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

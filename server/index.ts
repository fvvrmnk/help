import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleSitemap } from "./routes/sitemap";
import { handleRobots } from "./routes/robots";
import { handleContact } from "./routes/contact";

export function createServer(staticDir?: string) {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes (register before SSR catch-all)
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleContact);

  // SEO
  app.get("/sitemap.xml", handleSitemap);
  app.get("/robots.txt", handleRobots);

  // Serve built assets before the SSR fallback in the standalone server.
  if (staticDir) {
    app.use(express.static(staticDir));
  }

  // SSR catch-all handler
  // Note: In development, this is bypassed by Vite's SPA serving
  // In production (node-build.mjs), this handles all routes
  let ssrHandler: any = null;

  // Lazy load SSR handler to avoid @ alias resolution during config load
  const loadSSRHandler = async () => {
    if (!ssrHandler) {
      const { handleSSR } = await import("./routes/ssr");
      ssrHandler = handleSSR;
    }
    return ssrHandler;
  };

  // Register the catch-all handler with lazy-loaded SSR.
  app.use((req, res) => {
    if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
      res.status(404).json({ error: "API endpoint not found" });
      return;
    }

    loadSSRHandler()
      .then((handler) => handler(req, res))
      .catch((err) => {
        console.error("SSR error:", err);
        res.status(500).send("Internal Server Error");
      });
  });

  return app;
}

import { renderApp } from "../server/ssr";
import * as fs from "fs";
import * as path from "path";

interface PageRoute {
  path: string;
  filename: string;
}

const ROUTES: PageRoute[] = [
  { path: "/", filename: "index.html" },
  { path: "/rf", filename: "rf/index.html" },
  { path: "/rb", filename: "rb/index.html" },
  { path: "/ua", filename: "ua/index.html" },
  { path: "/legal/privacy", filename: "legal/privacy/index.html" },
  { path: "/legal/cookies", filename: "legal/cookies/index.html" },
  { path: "/legal/terms", filename: "legal/terms/index.html" },
  { path: "/legal/disclaimer", filename: "legal/disclaimer/index.html" },
];

async function prerender() {
  const outputDir = path.join(process.cwd(), "dist", "spa");

  console.log("📄 Starting static prerendering...");

  for (const route of ROUTES) {
    try {
      const { html, helmet } = renderApp(route.path);

      // Build helmet HTML
      const helmetHtml = [
        helmet.title?.toString() || "<title>DocsHelp</title>",
        helmet.meta?.toString() || "",
        helmet.link?.toString() || "",
        helmet.script?.toString() || "",
      ].join("\n");

      // Full HTML document
      const fullHtml = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${helmetHtml}
    <link rel="stylesheet" href="/assets/index.css" />
  </head>
  <body>
    <div id="root">${html}</div>
    <script type="module" src="/assets/index.js"></script>
  </body>
</html>`;

      // Create directory if needed
      const filePath = path.join(outputDir, route.filename);
      const dir = path.dirname(filePath);
      fs.mkdirSync(dir, { recursive: true });

      // Write file
      fs.writeFileSync(filePath, fullHtml, "utf-8");
      console.log(`✓ ${route.path} → ${route.filename}`);
    } catch (error) {
      console.error(`✗ Error prerendering ${route.path}:`, error);
    }
  }

  console.log("\n✅ Prerendering complete!");
}

prerender().catch(console.error);

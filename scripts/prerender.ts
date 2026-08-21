import { renderApp } from "../server/ssr";
import * as fs from "fs";
import * as path from "path";
import { services } from "../shared/catalog";

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
  ...services.map((service) => ({
    path: `/services/${service.countryKey}/${service.slug}`,
    filename: `services/${service.countryKey}/${service.slug}/index.html`,
  })),
];

function getHelmetHtml(helmet: any) {
  return [
    helmet.title?.toString() || "<title>DocsHelp</title>",
    helmet.meta?.toString() || "",
    helmet.link?.toString() || "",
    helmet.script?.toString() || "",
  ].join("\n");
}

async function prerender() {
  const outputDir = path.join(process.cwd(), "dist", "spa");
  const templatePath = path.join(outputDir, "index.html");

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Built HTML shell not found: ${templatePath}`);
  }

  const template = fs.readFileSync(templatePath, "utf-8");
  fs.writeFileSync(path.join(outputDir, "_index-shell.html"), template, "utf-8");
  const siteOrigin = process.env.VITE_SITE_URL
    ?? process.env.VERCEL_PROJECT_PRODUCTION_URL
    ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  console.log("📄 Starting static prerendering...");

  for (const route of ROUTES) {
    const { html, helmet } = renderApp(route.path, siteOrigin);
    const fullHtml = template
      .replace("<!--ssr-html-->", html)
      .replace("<!--ssr-helmet-->", getHelmetHtml(helmet));

    const filePath = path.join(outputDir, route.filename);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, fullHtml, "utf-8");
    console.log(`✓ ${route.path} → ${route.filename}`);
  }

  console.log("\n✅ Prerendering complete!");
}

prerender().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

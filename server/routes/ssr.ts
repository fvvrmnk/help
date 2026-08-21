import { RequestHandler } from "express";
import * as fs from "fs";
import * as path from "path";

// Lazy import to avoid alias resolution at config load time
let renderApp: ((url: string, siteOrigin?: string) => { html: string; helmet: any; statusCode: number }) | null = null;

async function getRenderApp() {
  if (!renderApp) {
    const { renderApp: render } = await import("../ssr");
    renderApp = render;
  }
  return renderApp;
}

function getRequestOrigin(req: any) {
  const configured = process.env.VITE_SITE_URL
    ?? process.env.VERCEL_PROJECT_PRODUCTION_URL
    ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  if (configured?.startsWith("http")) return configured.replace(/\/$/, "");

  const proto = String(req.headers["x-forwarded-proto"] ?? req.protocol).split(",")[0];
  const host = String(req.headers["x-forwarded-host"] ?? req.get("host")).split(",")[0];
  return `${proto}://${host}`;
}

const getIndexHtml = (() => {
  let html: string | null = null;

  return () => {
    if (html) return html;

    try {
      // Prefer the Vite HTML shell, which contains the SSR placeholders.
      const templatePaths = [
        path.join(process.cwd(), "dist", "spa", "_index-shell.html"),
        path.join(process.cwd(), "dist", "spa", "index.html"),
      ];
      for (const templatePath of templatePaths) {
        if (!fs.existsSync(templatePath)) continue;
        const candidate = fs.readFileSync(templatePath, "utf-8");
        if (candidate.includes("<!--ssr-html-->") && candidate.includes("<!--ssr-helmet-->")) {
          html = candidate;
          return html;
        }
      }
    } catch (e) {
      // Fallback
    }

    // Fallback template
    // suppressHydrationWarning allows minor hydration mismatches (e.g., CSS formatting)
    html = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DocsHelp</title>
    <!--ssr-helmet-->
  </head>
  <body>
    <div id="root" suppresshydrationwarning="true"><!--ssr-html--></div>
    <script type="module" src="/client/App.tsx"></script>
  </body>
</html>`;

    return html;
  };
})();

export const handleSSR: RequestHandler = async (req, res) => {
  try {
    // Get base template
    const template = getIndexHtml();

    // Get the render function (lazy loaded to avoid alias issues)
    const render = await getRenderApp();

    // Render app with SSR
    const { html, helmet, statusCode } = render(req.url, getRequestOrigin(req));

    // Build helmet HTML
    const helmetHtml = [
      helmet.title?.toString() || '<title>DocsHelp</title>',
      helmet.meta?.toString() || "",
      helmet.link?.toString() || "",
      helmet.script?.toString() || "",
    ].join("\n");

    // Inject SSR content into template
    const rendered = template
      .replace("<!--ssr-html-->", html)
      .replace("<!--ssr-helmet-->", helmetHtml);

    res.status(statusCode);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(rendered);
  } catch (error) {
    console.error("SSR error:", error);
    res.status(500).send("Internal Server Error");
  }
};

import { RequestHandler } from "express";
import * as fs from "fs";
import * as path from "path";

// Lazy import to avoid alias resolution at config load time
let renderApp: ((url: string) => { html: string; helmet: any }) | null = null;

async function getRenderApp() {
  if (!renderApp) {
    const { renderApp: render } = await import("../ssr");
    renderApp = render;
  }
  return renderApp;
}

const getIndexHtml = (() => {
  let html: string | null = null;

  return () => {
    if (html) return html;

    try {
      // In production, read from dist
      const distPath = path.join(process.cwd(), "dist", "spa", "index.html");
      if (fs.existsSync(distPath)) {
        html = fs.readFileSync(distPath, "utf-8");
        return html;
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
    const { html, helmet } = render(req.url);

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

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(rendered);
  } catch (error) {
    console.error("SSR error:", error);
    res.status(500).send("Internal Server Error");
  }
};

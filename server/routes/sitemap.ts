import { RequestHandler } from "express";
import { services } from "../../shared/catalog";

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function joinOrigin(origin: string, path: string) {
  if (!origin) return path;
  const cleanOrigin = origin.replace(/\/$/, "");
  return `${cleanOrigin}${path.startsWith("/") ? path : `/${path}`}`;
}

export const handleSitemap: RequestHandler = (req, res) => {
  const proto = (req.headers["x-forwarded-proto"] as string | undefined) ??
    req.protocol;
  const host = req.headers["x-forwarded-host"] as string | undefined;
  const origin = `${proto}://${host ?? req.get("host")}`;

  const staticPaths = [
    "/",
    "/rf",
    "/rb",
    "/ua",
    "/legal/privacy",
    "/legal/cookies",
    "/legal/terms",
    "/legal/disclaimer",
  ];

  const servicePaths = services.map(
    (s) => `/services/${s.countryKey}/${s.slug}`,
  );

  const urls = [...staticPaths, ...servicePaths];
  const lastmod = new Date().toISOString().slice(0, 10);

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  const urlsetOpen = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const urlsetClose = `</urlset>\n`;

  const entries = urls
    .map((p) => {
      const loc = xmlEscape(joinOrigin(origin, p));
      return (
        "  <url>\n" +
        `    <loc>${loc}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        "  </url>\n"
      );
    })
    .join("");

  res.status(200);
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.send(body + urlsetOpen + entries + urlsetClose);
};

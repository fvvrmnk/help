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
  const configuredOrigin = process.env.VITE_SITE_URL
    ?? process.env.VERCEL_PROJECT_PRODUCTION_URL
    ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  const proto = String(req.headers["x-forwarded-proto"] ?? req.protocol).split(",")[0];
  const host = String(req.headers["x-forwarded-host"] ?? req.get("host")).split(",")[0];
  const origin = (configuredOrigin?.startsWith("http")
    ? configuredOrigin
    : `${proto}://${host}`).replace(/\/$/, "");

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

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  const urlsetOpen = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const urlsetClose = `</urlset>\n`;

  const entries = urls
    .map((p) => {
      const loc = xmlEscape(joinOrigin(origin, p));
      return (
        "  <url>\n" +
        `    <loc>${loc}</loc>\n` +
        "  </url>\n"
      );
    })
    .join("");

  res.status(200);
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.send(body + urlsetOpen + entries + urlsetClose);
};

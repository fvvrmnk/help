import { RequestHandler } from "express";

function getOrigin(req: any) {
  const configured = process.env.VITE_SITE_URL
    ?? process.env.VERCEL_PROJECT_PRODUCTION_URL
    ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  if (configured?.startsWith("http")) return configured.replace(/\/$/, "");

  const proto = String(req.headers["x-forwarded-proto"] ?? req.protocol).split(",")[0];
  const host = String(req.headers["x-forwarded-host"] ?? req.get("host")).split(",")[0];
  return `${proto}://${host}`.replace(/\/$/, "");
}

export const handleRobots: RequestHandler = (req, res) => {
  const origin = getOrigin(req);
  res.status(200);
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`);
};

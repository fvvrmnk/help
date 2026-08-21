import * as HelmetModule from "react-helmet-async";

const helmetExports = HelmetModule as any;
const { Helmet } = (helmetExports["default"] ?? helmetExports) as typeof import("react-helmet-async");

export function getSiteOrigin() {
  const env = (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_SITE_URL;
  if (env && env.startsWith("http")) return env.replace(/\/$/, "");

  const serverOrigin = (globalThis as { __DOCSHELP_SITE_ORIGIN?: string }).__DOCSHELP_SITE_ORIGIN;
  if (serverOrigin) return serverOrigin.replace(/\/$/, "");

  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

export function absoluteUrl(pathname: string) {
  const origin = getSiteOrigin();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return origin ? `${origin}${path}` : path;
}

export function Seo(props: {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}) {
  const canonical = props.canonicalPath
    ? absoluteUrl(props.canonicalPath)
    : undefined;

  const json = Array.isArray(props.jsonLd)
    ? props.jsonLd
    : props.jsonLd
      ? [props.jsonLd]
      : [];

  // Default OG image
  const ogImage = props.ogImage ||
    "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fb22520228f91419aaa7a10ca92face3b?format=webp&width=1200&height=630";

  return (
    <Helmet>
      <html lang="ru" />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="theme-color" content="#3760BE" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {props.noindex ? <meta name="robots" content="noindex,nofollow" /> : null}

      {/* Open Graph */}
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:type" content={props.ogType ?? "website"} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:alt" content={props.title} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content="DocsHelp" />
      {canonical ? <meta property="og:url" content={canonical} /> : null}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={props.title} />

      {/* Additional SEO */}
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' fill='%233760BE'>D</text></svg>" />

      {json.map((obj, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}

export function organizationJsonLd() {
  const origin = getSiteOrigin();
  const logo = "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fcf4fd39aaff44d94b06a4698e13579f0?format=webp&width=200&height=200";
  const image = "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fb22520228f91419aaa7a10ca92face3b?format=webp&width=1200&height=630";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": origin ? `${origin}/#organization` : undefined,
    name: "DocsHelp",
    description: "Дистанционные услуги по оформлению документов и справок.",
    url: origin || undefined,
    image,
    logo,
    sameAs: ["https://t.me/Docshelpp", "https://wa.me/972536001963"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: "https://t.me/Docshelpp",
        availableLanguage: ["ru"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+972-53-600-1963",
        contactType: "customer support",
        availableLanguage: ["ru"],
      },
    ],
  };
}

export function webSiteJsonLd() {
  const origin = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": origin ? `${origin}/#website` : undefined,
    name: "DocsHelp",
    url: origin || undefined,
    inLanguage: "ru-RU",
    publisher: origin ? { "@id": `${origin}/#organization` } : undefined,
  };
}

export function reviewsJsonLd(reviews: Array<{
  name: string;
  rating: number;
  text: string;
  author?: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Отзывы клиентов DocsHelp",
    itemListElement: reviews.map((r, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: r.author || r.name,
        },
        reviewBody: r.text,
      },
    })),
  };
}

export function breadcrumbsJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceJsonLd(params: {
  name: string;
  description: string;
  areaServed: string;
  urlPath: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    areaServed: params.areaServed,
    url: absoluteUrl(params.urlPath),
    provider: {
      "@type": "Organization",
      name: "DocsHelp",
      url: getSiteOrigin() || undefined,
    },
  };
}

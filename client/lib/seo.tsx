import { Helmet } from "react-helmet-async";

export function getSiteOrigin() {
  const env = import.meta.env.VITE_SITE_URL as string | undefined;
  if (env && env.startsWith("http")) return env.replace(/\/$/, "");
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

  return (
    <Helmet>
      <html lang="ru" />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {props.noindex ? <meta name="robots" content="noindex,nofollow" /> : null}

      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:type" content={props.ogType ?? "website"} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />

      {json.map((obj, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DocsHelp",
    url: getSiteOrigin() || undefined,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: "https://t.me/Docshelpp",
        availableLanguage: ["ru"],
      },
    ],
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
    offers: {
      "@type": "Offer",
      price: "By request",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  };
}

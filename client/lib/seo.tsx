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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      {canonical ? <meta property="og:url" content={canonical} /> : null}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="charset" content="UTF-8" />
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
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": getSiteOrigin() || undefined,
    name: "DocsHelp",
    description: "Агрегатор дистанционных услуг по документам",
    url: getSiteOrigin() || undefined,
    image: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fb22520228f91419aaa7a10ca92face3b?format=webp&width=1200&height=630",
    logo: {
      "@type": "ImageObject",
      url: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fcf4fd39aaff44d94b06a4698e13579f0?format=webp&width=200&height=200",
    },
    sameAs: [
      "https://t.me/Docshelpp",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: "https://t.me/Docshelpp",
        availableLanguage: ["ru"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+972-53-600-1963",
        availableLanguage: ["ru"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Patan 3",
      addressLocality: "Eilat",
      addressCountry: "IL",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 6,
    },
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
    "@type": "Product",
    "@id": absoluteUrl("/"),
    name: "DocsHelp",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: reviews.length,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
      },
      author: {
        "@type": "Person",
        name: r.author || r.name,
      },
      reviewBody: r.text,
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
    offers: {
      "@type": "Offer",
      price: "By request",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  };
}

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as HelmetModule from "react-helmet-async";

const helmetExports = HelmetModule as any;
const { HelmetProvider } = (helmetExports["default"] ?? helmetExports) as typeof import("react-helmet-async");
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Import after @/ aliases are resolved
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import CountryPage from "@/pages/Country";
import ServicePage from "@/pages/Service";
import LegalPage from "@/pages/Legal";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { countries, services } from "../shared/catalog";

function getPathname(url: string) {
  return new URL(url, "http://localhost").pathname.replace(/\/$/, "") || "/";
}

function getStatusCode(url: string) {
  const pathname = getPathname(url);
  const countryPaths = countries.map((country) => `/${country.key}`);
  const servicePaths = services.map((service) => `/services/${service.countryKey}/${service.slug}`);
  const legalPaths = ["/legal/privacy", "/legal/cookies", "/legal/terms", "/legal/disclaimer"];
  const knownPaths = ["/", ...countryPaths, ...servicePaths, ...legalPaths];
  return knownPaths.includes(pathname) ? 200 : 404;
}

export function renderApp(url: string, siteOrigin?: string) {
  const helmetContext = {};
  (globalThis as { __DOCSHELP_SITE_ORIGIN?: string }).__DOCSHELP_SITE_ORIGIN = siteOrigin;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });

  try {
    const html = renderToString(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HelmetProvider context={helmetContext}>
            <StaticRouter location={url}>
              <Routes>
                <Route element={<SiteLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/:countryKey" element={<CountryPage />} />
                  <Route path="/services/:countryKey/:slug" element={<ServicePage />} />
                  <Route path="/legal/:type" element={<LegalPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </StaticRouter>
          </HelmetProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );

    const { helmet } = helmetContext as any;

    return { html, helmet, statusCode: getStatusCode(url) };
  } finally {
    delete (globalThis as { __DOCSHELP_SITE_ORIGIN?: string }).__DOCSHELP_SITE_ORIGIN;
  }
}

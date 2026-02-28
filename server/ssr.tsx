import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import after @/ aliases are resolved
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import CountryPage from "@/pages/Country";
import ServicePage from "@/pages/Service";
import LegalPage from "@/pages/Legal";
import { SiteLayout } from "@/components/layout/SiteLayout";

export function renderApp(url: string) {
  const helmetContext = {};
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });

  const html = renderToString(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
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

  return { html, helmet };
}

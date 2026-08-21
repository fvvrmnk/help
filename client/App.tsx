import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CountryPage from "./pages/Country";
import ServicePage from "./pages/Service";
import LegalPage from "./pages/Legal";
import { SiteLayout } from "./components/layout/SiteLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/:countryKey" element={<CountryPage />} />
              <Route path="/services/:countryKey/:slug" element={<ServicePage />} />
              <Route path="/legal/:type" element={<LegalPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

// Initialize React root with proper hydration support
const container = document.getElementById("root")!;

// Vite serves the HTML shell with an SSR placeholder during development.
// Only hydrate when the placeholder has been replaced by server-rendered markup.
const isSSR =
  import.meta.env.PROD &&
  container.innerHTML.trim().length > 0 &&
  !container.innerHTML.includes("<!--ssr-html-->");

// Use a data attribute to prevent double initialization during HMR
const IS_HYDRATED = "data-hydrated";

if (!container.hasAttribute(IS_HYDRATED)) {
  container.setAttribute(IS_HYDRATED, "true");

  if (isSSR) {
    // Hydrate server-rendered content
    hydrateRoot(container, <App />);
  } else {
    // Create new root for SPA mode
    createRoot(container).render(<App />);
  }
}

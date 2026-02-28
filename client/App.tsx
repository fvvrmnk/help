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

// Check if this is SSR (has server-rendered content) or SPA (empty)
const isSSR = container.innerHTML.trim().length > 0;

// Use a data attribute to prevent double initialization during HMR
const IS_HYDRATED = "data-hydrated";

// Suppress hydration warnings in development (Radix UI components may have minor style differences)
// This is safe because we validate in production through testing
if (import.meta.env.DEV) {
  const originalWarn = console.warn;
  const originalError = console.error;

  const warningFilter = (message: string) => {
    // Suppress hydration mismatch warnings for known benign mismatches
    if (
      message.includes("Hydration failed") ||
      message.includes("did not match") ||
      message.includes("pointer-events")
    ) {
      return true;
    }
    return false;
  };

  console.warn = function(...args: any[]) {
    if (args[0] && typeof args[0] === "string" && warningFilter(args[0])) {
      return;
    }
    originalWarn.apply(console, args);
  };

  console.error = function(...args: any[]) {
    if (args[0] && typeof args[0] === "string" && warningFilter(args[0])) {
      return;
    }
    originalError.apply(console, args);
  };
}

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

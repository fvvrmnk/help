import { Outlet } from "react-router-dom";
import { FooterBusiness } from "./FooterBusiness";
import { HeaderBusiness } from "./HeaderBusiness";
import { CookieBanner } from "./CookieBanner";
import { FloatingContactWidget } from "./FloatingContactWidget";
import { ScrollToTop } from "./ScrollToTop";

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <HeaderBusiness />
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
      <FooterBusiness />
      <FloatingContactWidget />
      <CookieBanner />
    </div>
  );
}

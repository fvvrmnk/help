import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getTelegramChatUrl, TELEGRAM_HANDLE } from "@/lib/telegram";
import { ShieldCheck, Send, MessageCircle } from "lucide-react";
import { ContactFormDialog } from "@/components/forms/ContactFormDialog";

const navItems = [
  { to: "/", label: "Главная" },
  { to: "/rf", label: "РФ" },
  { to: "/rb", label: "РБ" },
  { to: "/ua", label: "Украина" },
];

export function HeaderBusiness() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-lg" aria-label="DocsHelp - на главную">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20" aria-hidden="true">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight">DocsHelp</div>
            <div className="text-xs text-muted-foreground">
              Дистанционные услуги по документам
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                ].join(" ")
              }
              aria-current="page"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ContactFormDialog triggerClassName="gap-2 rounded-xl" />
          <Button asChild variant="outline" className="gap-2 rounded-xl hidden sm:inline-flex">
            <a href="https://wa.me/972536001963" target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </Button>
          <Button asChild variant="outline" className="gap-2 rounded-xl hidden sm:inline-flex">
            <a href={getTelegramChatUrl()} target="_blank" rel="noreferrer">
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Telegram</span>
            </a>
          </Button>
        </div>
      </div>

      <nav className="border-t border-border/70 bg-background/70 md:hidden" aria-label="Мобильная навигация">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-1 px-4 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex-1 rounded-lg px-3 py-2 text-center text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                ].join(" ")
              }
              aria-current="page"
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

import { Button } from "@/components/ui/button";
import { getTelegramChatUrl } from "@/lib/telegram";
import { Seo, organizationJsonLd } from "@/lib/seo";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Seo
        title="404 — страница не найдена | DocsHelp"
        description="Страница не найдена. Перейдите на главную или напишите в Telegram @Docshelpp."
        noindex
        jsonLd={organizationJsonLd()}
      />
      <div className="rounded-2xl border border-border/70 bg-card p-8 md:p-12">
        <div className="text-sm text-muted-foreground">Ошибка 404</div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
          Страница не найдена
        </h1>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Похоже, такой страницы нет. Перейдите на главную или напишите в Telegram
          — подскажем, где найти нужную услугу.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="rounded-xl">
            <Link to="/">На главную</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <a href={getTelegramChatUrl()} target="_blank" rel="noreferrer">
              Написать в Telegram
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

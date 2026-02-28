import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

export function HeroAggregator() {
  return (
    <section className="relative overflow-hidden border-b border-border/70">
      <div aria-hidden className="absolute inset-0">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fb22520228f91419aaa7a10ca92face3b?format=webp&width=1600&height=900"
          alt=""
          className="h-full w-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Легально, официально, дистанционно</span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
              Дистанционное оформление документов и справок с апостилем
            </h1>
            <p className="mt-4 max-w-prose text-base text-muted-foreground md:text-lg">
              Юридически корректно, без личного присутствия. Уточним требования и
              сроки, предложим 3 тарифа по скорости. Все цены — по запросу.
            </p>

            <div className="mt-7">
              <Button
                size="lg"
                className="rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                onClick={() => {
                  document
                    .getElementById("country")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                aria-label="Прокрутить к выбору услуг по стране"
              >
                Выбрать услуги по стране
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Badge variant="secondary">Дистанционно, без личного присутствия</Badge>
              <Badge variant="secondary">3 тарифа по срокам</Badge>
              <Badge variant="secondary">50% предоплата, остаток по готовности</Badge>
              <Badge variant="secondary">Фото/видео подтверждение готовности</Badge>
              <Badge variant="secondary">Апостиль при необходимости</Badge>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-accent/10 to-transparent blur-2xl" />
            <div className="relative rounded-[2rem] border border-border/70 bg-card p-7 shadow-sm">
              <div className="grid gap-4">
                <div className="rounded-2xl border border-border/70 bg-muted/30 p-6">
                  <div className="text-sm font-semibold">Быстрый старт</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Напишите в Telegram, укажите страну гражданства и название
                    услуги — ответим быстро.
                  </p>
                </div>

                <div className="grid gap-3 rounded-2xl border border-border/70 bg-background p-6">
                  <div className="text-sm font-semibold">Прозрачные условия</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 50% предоплата, остаток по готовности</li>
                    <li>• Подтверждение готовности фото/видео</li>
                    <li>• Доставка при необходимости (оплачивается отдельно)</li>
                  </ul>
                </div>

                <div className="grid gap-3 rounded-2xl border border-border/70 bg-muted/30 p-6">
                  <div className="text-sm font-semibold">Подходит для</div>
                  <p className="text-sm text-muted-foreground">
                    Подачи документов за границу, обмена прав, оформления актовых
                    записей и справок.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
            <div className="relative grid gap-4">
              {/* Hero client photo */}
              <div className="relative h-52 overflow-hidden rounded-[2rem] border border-border/70 shadow-sm md:h-64">
                <img
                  src="https://images.pexels.com/photos/8272159/pexels-photo-8272159.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop"
                  alt="Довольный клиент получил готовые документы"
                  className="h-full w-full object-cover object-center"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-[2rem]" />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-sm font-semibold text-white">Готово — документы оформлены дистанционно</p>
                  <p className="mt-0.5 text-xs text-white/75">Без личного присутствия. Telegram-поддержка.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                <div className="grid gap-3">
                  <div className="text-sm font-semibold">Прозрачные условия</div>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>• 50% предоплата, остаток по готовности</li>
                    <li>• Подтверждение готовности фото/видео</li>
                    <li>• Доставка при необходимости (оплачивается отдельно)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

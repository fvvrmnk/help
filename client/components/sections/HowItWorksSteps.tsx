import { CheckCircle2 } from "lucide-react";

const steps = [
  "Пишете в Telegram @Docshelpp",
  "Уточняем задачу и сроки",
  "50% предоплата",
  "Подготовка документа (дистанционно)",
  "Фото/видео подтверждение готовности",
  "Оплата остатка",
  "Доставка при необходимости (оплачивается отдельно, рассчитывается индивидуально)",
];

export function HowItWorksSteps() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-10">
        <h2 className="text-2xl font-bold tracking-tight">Как это работает</h2>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          Услуга дистанционная — личное присутствие не требуется. Все цены — по
          запросу. Сроки ориентировочные и зависят от исходных данных и объёма.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
          <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-2 content-start">
            {steps.map((s, idx) => (
              <li
                key={s}
                className="flex gap-3 rounded-xl border border-border/70 bg-background p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-semibold">Шаг {idx + 1}</div>
                  <div className="text-sm text-muted-foreground">{s}</div>
                </div>
              </li>
            ))}
          </ol>

          {/* Visual: person working remotely with documents */}
          <div className="hidden lg:block">
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/326522/pexels-photo-326522.jpeg?auto=compress&cs=tinysrgb&w=560&h=420&fit=crop"
                alt="Клиент оформляет документы дистанционно через мессенджер"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">
                Всё оформление — дистанционно, через Telegram
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

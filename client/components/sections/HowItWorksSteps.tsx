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

        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {steps.map((s, idx) => (
            <li
              key={s}
              className="flex gap-3 rounded-xl border border-border/70 bg-background p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-semibold">Шаг {idx + 1}</div>
                <div className="text-sm text-muted-foreground">{s}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

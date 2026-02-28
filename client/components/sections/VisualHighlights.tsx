import { PackageCheck, ShieldCheck, Truck } from "lucide-react";

const items = [
  {
    title: "Безопасный процесс",
    description: "Согласование и контроль статуса в переписке.",
    Icon: ShieldCheck,
  },
  {
    title: "Подтверждение готовности",
    description: "Фото/видео по запросу перед финальной оплатой.",
    Icon: PackageCheck,
  },
  {
    title: "Доставка при необходимости",
    description: "По запросу, оплачивается отдельно, рассчитывается индивидуально.",
    Icon: Truck,
  },
];

export function VisualHighlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-border/70 bg-muted/20 p-6"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background text-primary ring-1 ring-border/70">
              <Icon className="h-5 w-5" />
            </div>
            <div className="mt-4 font-semibold">{title}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              {description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

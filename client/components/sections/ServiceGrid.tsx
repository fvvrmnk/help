import { useMemo, useState } from "react";
import {
  getServicesByCountry,
  type CountryKey,
  serviceGroups,
  type ServiceGroup,
} from "@/data/catalog";
import { cn } from "@/lib/utils";
import { ServiceCard } from "./ServiceCard";
import { TelegramCTASection } from "./TelegramCTASection";

export function ServiceGrid(props: { countryKey: CountryKey }) {
  const [group, setGroup] = useState<ServiceGroup | "all">("all");

  const items = useMemo(() => {
    const list = getServicesByCountry(props.countryKey);
    if (group === "all") return list;
    return list.filter((s) => s.serviceGroup === group);
  }, [props.countryKey, group]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Каталог услуг</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Выберите услугу и получите консультацию в Telegram. Все цены — по
            запросу.
          </p>
        </div>

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0" role="tablist" aria-label="Фильтр категорий услуг">
          <button
            type="button"
            onClick={() => setGroup("all")}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              group === "all"
                ? "border-primary/40 bg-primary/5 text-foreground"
                : "border-border/70 text-muted-foreground hover:bg-muted/40 hover:text-foreground",
            )}
            role="tab"
            aria-selected={group === "all"}
            aria-label="Показать все услуги"
          >
            Все
          </button>
          {serviceGroups.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                group === g
                  ? "border-primary/40 bg-primary/5 text-foreground"
                  : "border-border/70 text-muted-foreground hover:bg-muted/40 hover:text-foreground",
              )}
              role="tab"
              aria-selected={group === g}
              aria-label={`Показать услуги категории ${g}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s, index) => (
          <ServiceCard key={s.id} service={s} index={index} />
        ))}
      </div>

      <div className="mt-12">
        <TelegramCTASection
          title="Оставьте заявку в Telegram — ответим быстро"
          description="Опишите задачу, страну гражданства и желаемый срок. Уточним требования и предложим оптимальный тариф."
        />
      </div>
    </section>
  );
}

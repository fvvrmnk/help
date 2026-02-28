import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { getTelegramChatUrl } from "@/lib/telegram";

export type TariffName = "Эконом" | "Базовый" | "Срочный";

const rows: Array<{ name: TariffName; duration: string; hint: string }> = [
  { name: "Эконом", duration: "до 14 дней", hint: "Комфортный срок" },
  { name: "Базовый", duration: "до 7 дней", hint: "Оптимально" },
  { name: "Срочный", duration: "1 день", hint: "Максимальный приоритет" },
];

export function TariffTable(props: {
  buildMessage: (tariff: TariffName) => string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
      <div className="grid grid-cols-3 gap-px bg-border/70 text-sm">
        <div className="bg-muted/30 px-3 py-3 font-semibold md:px-4">Тариф</div>
        <div className="bg-muted/30 px-3 py-3 font-semibold md:px-4">Срок</div>
        <div className="bg-muted/30 px-3 py-3 font-semibold md:px-4">Цена</div>

        {rows.map((r) => (
          <Fragment key={r.name}>
            <div className="bg-background px-3 py-4 md:px-4">
              <div className="font-semibold">{r.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{r.hint}</div>
            </div>
            <div className="bg-background px-3 py-4 md:px-4">{r.duration}</div>
            <div className="bg-background px-3 py-4 md:px-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium">По запросу</span>
                <Button asChild size="sm" className="rounded-xl">
                  <a
                    href={getTelegramChatUrl(props.buildMessage(r.name))}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Выбрать
                  </a>
                </Button>
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      <div className="border-t border-border/70 bg-muted/20 px-3 py-3 text-xs text-muted-foreground md:px-4">
        Сроки ориентировочные и зависят от исходных данных, объёма и логистики.
        Применимость срочного тарифа уточняется в переписке.
      </div>
    </div>
  );
}

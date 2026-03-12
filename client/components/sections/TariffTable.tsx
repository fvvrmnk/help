import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export type TariffName = "Эконом" | "Базовый" | "Срочный";

const rows: Array<{ name: TariffName; duration: string; hint: string }> = [
  { name: "Эконом", duration: "до 14 дней", hint: "Комфортный срок" },
  { name: "Базовый", duration: "до 7 дней", hint: "Оптимально" },
  { name: "Срочный", duration: "1 день", hint: "Максимальный приоритет" },
];

export function TariffTable(props: {
  buildMessage: (tariff: TariffName) => string;
  onSelect?: (tariff: TariffName) => void;
}) {
  return (
    <div className="space-y-3 md:space-y-0 md:overflow-hidden md:rounded-2xl md:border md:border-border/70 md:bg-card">
      {/* Desktop table header */}
      <div className="hidden md:grid md:grid-cols-[1fr_1fr_1.6fr] gap-px bg-border/70 text-sm">
        <div className="bg-muted/30 px-4 py-3 font-semibold">Тариф</div>
        <div className="bg-muted/30 px-4 py-3 font-semibold">Срок</div>
        <div className="bg-muted/30 px-4 py-3 font-semibold">Цена</div>
      </div>

      {rows.map((r) => (
        <div key={r.name}>
          {/* Mobile card */}
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-4 md:hidden">
            <div>
              <div className="font-semibold">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.hint} · {r.duration}</div>
              <div className="mt-1 text-sm font-medium">По запросу</div>
            </div>
            <Button
              size="sm"
              className="shrink-0 rounded-xl"
              onClick={() => props.onSelect?.(r.name)}
            >
              <Send className="h-3.5 w-3.5" />
              <span className="ml-1.5">Запрос</span>
            </Button>
          </div>

          {/* Desktop row */}
          <div className="hidden md:grid md:grid-cols-[1fr_1fr_1.6fr] gap-px bg-border/70">
            <div className="bg-background px-4 py-4">
              <div className="font-semibold">{r.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{r.hint}</div>
            </div>
            <div className="bg-background px-4 py-4 text-sm">{r.duration}</div>
            <div className="bg-background px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">По запросу</span>
                <Button
                  size="sm"
                  className="shrink-0 gap-1.5 rounded-xl"
                  onClick={() => props.onSelect?.(r.name)}
                >
                  <Send className="h-3.5 w-3.5" />
                  Отправить запрос
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Footer note */}
      <div className="rounded-2xl border border-border/70 bg-muted/20 px-4 py-3 text-xs text-muted-foreground md:rounded-none md:border-0 md:border-t">
        Сроки ориентировочные и зависят от исходных данных, объёма и логистики.
        Применимость срочного тарифа уточняется в переписке.
      </div>
    </div>
  );
}

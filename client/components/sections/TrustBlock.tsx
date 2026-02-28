import { Camera, CreditCard, MessageCircle } from "lucide-react";

const items = [
  {
    title: "Прозрачная процедура оплаты",
    description: "50% предоплата, остаток по готовности.",
    Icon: CreditCard,
  },
  {
    title: "Фото/видео подтверждение",
    description: "По запросу фиксируем готовность и статус.",
    Icon: Camera,
  },
  {
    title: "Коммуникация в Telegram",
    description: "Быстрые ответы и уточнения в переписке.",
    Icon: MessageCircle,
  },
];

export function TrustBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-bold tracking-tight">Доверие и контроль</h2>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Без лишних обещаний — только понятный процесс, прозрачная оплата и
        подтверждение готовности.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-border/70 bg-card p-6"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
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

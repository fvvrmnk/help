import { BadgeCheck, Clock3, FileCheck2, Headset, ShieldCheck } from "lucide-react";

const items = [
  {
    title: "Официально и корректно",
    description:
      "Делаем акцент на законности, прозрачности процесса и корректных формулировках под задачу подачи.",
    Icon: ShieldCheck,
  },
  {
    title: "Дистанционно",
    description:
      "Личное присутствие не требуется. Все согласование и коммуникация — в Telegram.",
    Icon: Headset,
  },
  {
    title: "3 тарифа по срокам",
    description:
      "Эконом (до 14 дней), Базовый (до 7 дней), Срочный (1 день) — применимость уточняем.",
    Icon: Clock3,
  },
  {
    title: "Контроль готовности",
    description:
      "Фото/видео подтверждение по запросу, понятные статусы и процедура оплаты 50/50.",
    Icon: BadgeCheck,
  },
  {
    title: "Апостиль при необходимости",
    description:
      "Если применимо к документу/стране — объясним процесс и согласуем в переписке.",
    Icon: FileCheck2,
  },
];

export function AdvantagesBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-bold tracking-tight">Преимущества</h2>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Сильная, уверенная подача без спорных обещаний — только понятные условия
        и прозрачный процесс.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

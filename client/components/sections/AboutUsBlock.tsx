import { Award, Users, Clock, MessageCircle, Gift, Handshake, Briefcase, CheckCircle } from "lucide-react";

const items = [
  { icon: Award, text: "На рынке более пяти лет" },
  { icon: Users, text: "Более сотни довольных клиентов" },
  { icon: CheckCircle, text: "Работаем напрямую без посредников" },
  { icon: Clock, text: "Работаем без выходных" },
  { icon: MessageCircle, text: "Бесплатная консультация" },
  { icon: Gift, text: "Постоянным клиентам скидки" },
  {
    icon: Handshake,
    text: "Действует реферальная система — приводи клиентов и зарабатывай вместе с нами",
  },
  {
    icon: Briefcase,
    text: "Будем рады сотрудничеству с адвокатами и другими коллегами, кто оказывает юридическую помощь",
  },
];

export function AboutUsBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-bold tracking-tight">О нас</h2>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Почему клиенты выбирают DocsHelp
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.text}
            className="rounded-2xl border border-border/70 bg-card p-5"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <item.icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-medium leading-snug">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

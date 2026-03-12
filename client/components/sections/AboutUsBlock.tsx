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

// Staff photos — team members available for clients via Telegram
const teamPhotos = [
  {
    src: "https://images.pexels.com/photos/8902409/pexels-photo-8902409.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    alt: "Специалист на связи с клиентом — работает с документами по телефону",
  },
  {
    src: "https://images.pexels.com/photos/8867475/pexels-photo-8867475.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    alt: "Команда DocsHelp — консультанты на связи с клиентами",
  },
  {
    src: "https://images.pexels.com/photos/4458403/pexels-photo-4458403.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    alt: "Удалённая работа с документами — связь через мессенджеры",
  },
];

export function AboutUsBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-bold tracking-tight">О нас</h2>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Почему клиенты выбирают DocsHelp
      </p>

      {/* Team photo strip */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3 overflow-hidden rounded-2xl">
        {teamPhotos.map((photo) => (
          <div key={photo.src} className="relative h-44 overflow-hidden rounded-2xl">
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
          </div>
        ))}
      </div>

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

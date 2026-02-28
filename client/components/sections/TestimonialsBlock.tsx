import { Star } from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Мария Петрова",
    role: "Эмигрантка, Австралия",
    text: "DocsHelp спасли меня! Нужно было срочно получить свидетельство о рождении для визы, а в России в поликлинике задержка на месяцы. Оформили за неделю, все официально и с апостилем. Спасибо!",
    rating: 5,
  },
  {
    id: "2",
    name: "Иван Сорокин",
    role: "Водитель-международник",
    text: "Восстанавливал права после потери. Быстро, честно, без лишних вопросов. Не пришлось ездить куда-то лично — всё по Telegram. Рекомендую всем дальнобойщикам!",
    rating: 5,
  },
  {
    id: "3",
    name: "Елена Власова",
    role: "Мама в декрете, переезд в Канаду",
    text: "С тремя детьми нет времени ходить в ЗАГС. DocsHelp оформили все справки, которые мне нужны были для переезда. Профессионально и по доступной цене.",
    rating: 5,
  },
  {
    id: "4",
    name: "Дмитрий Кузнецов",
    role: "HR-менеджер, работодатель",
    text: "Компания использует DocsHelp для оформления документов иностранных сотрудников. Точность, оперативность и отличная коммуникация. Партнёр надёжный!",
    rating: 5,
  },
  {
    id: "5",
    name: "Алексей Борисов",
    role: "Студент, учёба в Германии",
    text: "Нужна была справка из МВД для немецкого вуза, а сам я в Берлине. DocsHelp всё оформил дистанционно. Документ признан на 100%. Спасибо, ребята!",
    rating: 5,
  },
  {
    id: "6",
    name: "Ольга Смирнова",
    role: "Владелица МП, обмен паспорта",
    text: "Занята делами в компании, а старый паспорт уже истекает. DocsHelp помогли с обновлением за 3 дня. Удобный сервис, рекомендую!",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

export function TestimonialsBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Отзывы клиентов</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
          Более 100 довольных клиентов доверили нам оформление важных документов.
          Смотрите, что они говорят о нашем сервисе.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Rating */}
            <div className="mb-4">
              <StarRating rating={testimonial.rating} />
            </div>

            {/* Review text */}
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">
              &quot;{testimonial.text}&quot;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-border/70">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">
                  {testimonial.name}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust stats */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3 text-center">
        <div className="rounded-2xl border border-border/70 bg-muted/30 p-6">
          <div className="text-2xl font-bold">100+</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Довольных клиентов
          </div>
        </div>
        <div className="rounded-2xl border border-border/70 bg-muted/30 p-6">
          <div className="text-2xl font-bold">4.9★</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Средняя оценка
          </div>
        </div>
        <div className="rounded-2xl border border-border/70 bg-muted/30 p-6">
          <div className="text-2xl font-bold">5 лет</div>
          <div className="mt-1 text-sm text-muted-foreground">
            На рынке
          </div>
        </div>
      </div>
    </section>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FAQItem = { question: string; answer: string };

export function FAQAccordion(props: { title?: string; items: FAQItem[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {props.title ?? "FAQ"}
          </h2>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">
            Собрали ответы на частые вопросы. Если вашей ситуации нет в списке —
            напишите в Telegram.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border/70 bg-card p-2 md:p-4">
        <Accordion type="single" collapsible className="w-full">
          {props.items.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

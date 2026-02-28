import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  { id: "tariffs", label: "Тарифы" },
  { id: "process", label: "Как проходит" },
  { id: "faq", label: "FAQ" },
];

export function ServiceQuickNav(props: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", props.className)}>
      {items.map((i) => (
        <Button
          key={i.id}
          type="button"
          size="sm"
          variant="secondary"
          className="rounded-full"
          onClick={() => {
            document
              .getElementById(i.id)
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          {i.label}
        </Button>
      ))}
    </div>
  );
}

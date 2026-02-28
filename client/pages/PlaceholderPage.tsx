import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getTelegramChatUrl } from "@/lib/telegram";

export default function PlaceholderPage(props: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl border border-border/70 bg-card p-8 md:p-12">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {props.title}
        </h1>
        <p className="mt-3 max-w-prose text-muted-foreground">
          {props.description ??
            "Раздел готовится. Напишите в Telegram — мы быстро подскажем условия и требования."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="rounded-xl">
            <a href={getTelegramChatUrl()} target="_blank" rel="noreferrer">
              Написать в Telegram
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

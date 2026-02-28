import { Button } from "@/components/ui/button";
import { getTelegramChatUrl, TELEGRAM_HANDLE } from "@/lib/telegram";
import { Send } from "lucide-react";

export function TelegramCTASection(props: {
  title: string;
  description: string;
  message?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-primary/5 p-6 md:p-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="text-xl font-bold tracking-tight">{props.title}</div>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">
            {props.description}
          </p>
        </div>
        <Button asChild size="lg" className="gap-2 rounded-2xl">
          <a
            href={getTelegramChatUrl(props.message)}
            target="_blank"
            rel="noreferrer"
          >
            <Send className="h-4 w-4" />
            Написать в Telegram @{TELEGRAM_HANDLE}
          </a>
        </Button>
      </div>
    </div>
  );
}

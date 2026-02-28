import { MessageCircle } from "lucide-react";
import { getTelegramChatUrl, TELEGRAM_HANDLE } from "@/lib/telegram";

export function FloatingTelegramWidget() {
  return (
    <a
      href={getTelegramChatUrl()}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 ring-1 ring-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Написать в Telegram @${TELEGRAM_HANDLE}`}
    >
      <MessageCircle className="h-4 w-4" />
      Telegram
    </a>
  );
}

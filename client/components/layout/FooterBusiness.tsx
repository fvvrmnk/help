import { Link } from "react-router-dom";
import { getTelegramChatUrl, TELEGRAM_HANDLE } from "@/lib/telegram";
import { MapPin, Phone } from "lucide-react";

export function FooterBusiness() {
  return (
    <footer className="border-t border-border/70 bg-background" aria-label="Основная информация">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <div className="text-sm font-extrabold tracking-tight">DocsHelp</div>
          <p className="max-w-prose text-sm text-muted-foreground">
            Агрегатор дистанционных услуг по документам: справки, ЗАГС, права,
            паспорта, образование. Апостиль — при необходимости и где применимо,
            условия уточняются в переписке.
          </p>
          <a
            href={getTelegramChatUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md"
            aria-label="Написать в Telegram (откроется в новом окне)"
          >
            Telegram @{TELEGRAM_HANDLE}
          </a>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>פתן 3, מרכז העיר, אילת</span>
          </div>
          <a
            href="tel:+972536001963"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span>+972 53-600-1963, Pavel</span>
          </a>
          <a
            href="https://wa.me/972536001963"
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-sm font-medium text-primary hover:underline"
          >
            WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <div className="font-semibold">Разделы</div>
            <div className="flex flex-col gap-1 text-muted-foreground">
              <Link to="/rf" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md">
                Услуги РФ
              </Link>
              <Link to="/rb" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md">
                Услуги РБ
              </Link>
              <Link to="/ua" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md">
                Услуги Украина
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold">Документы</div>
            <div className="flex flex-col gap-1 text-muted-foreground">
              <Link to="/legal/privacy" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md">
                Политика конфиденциальности
              </Link>
              <Link to="/legal/cookies" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md">
                Cookie Policy
              </Link>
              <Link to="/legal/terms" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md">
                Пользовательское соглашение
              </Link>
              <Link to="/legal/disclaimer" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">Наш офис</div>
          <div className="overflow-hidden rounded-xl border border-border/70">
            <iframe
              title="DocsHelp офис — Eilat"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484.5!2d34.9511!3d29.5577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15006f3b0c0e0001%3A0x1!2sPatan+3%2C+Eilat!5e0!3m2!1sen!2sil!4v1700000000000"
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} DocsHelp. Все права защищены.</div>
          <div className="flex items-center gap-2">
            <span>Контакт:</span>
            <a
              href={getTelegramChatUrl()}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md"
              aria-label="Написать в Telegram (откроется в новом окне)"
            >
              Telegram @{TELEGRAM_HANDLE}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { BreadcrumbsBar } from "@/components/sections/BreadcrumbsBar";
import { Seo, breadcrumbsJsonLd, organizationJsonLd } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { getTelegramChatUrl } from "@/lib/telegram";
import { Link, useParams } from "react-router-dom";

type LegalType = "privacy" | "cookies" | "terms" | "disclaimer";

function getTitle(type: LegalType) {
  switch (type) {
    case "privacy":
      return "Политика конфиденциальности";
    case "cookies":
      return "Cookie Policy";
    case "terms":
      return "Пользовательское соглашение";
    case "disclaimer":
      return "Disclaimer";
  }
}

export default function LegalPage() {
  const { type } = useParams();
  const legalType: LegalType =
    type === "privacy" || type === "cookies" || type === "terms" || type === "disclaimer"
      ? type
      : "privacy";

  const title = getTitle(legalType);

  const canonicalPath = `/legal/${legalType}`;

  return (
    <div>
      <Seo
        title={`${title} — DocsHelp`}
        description={`${title} сайта DocsHelp. Контакт для обращений: Telegram @Docshelpp.`}
        canonicalPath={canonicalPath}
        jsonLd={[
          organizationJsonLd(),
          breadcrumbsJsonLd([
            { name: "Главная", path: "/" },
            { name: "Юридическая информация", path: "/legal/privacy" },
            { name: title, path: canonicalPath },
          ]),
        ]}
      />
      <BreadcrumbsBar
        items={[
          { label: "Главная", to: "/" },
          { label: "Юридическая информация", to: "/legal/privacy" },
          { label: title },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-prose text-sm text-muted-foreground">
            Контакт для обращений по вопросам обработки данных и условий:
            Telegram.
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

          <div className="mt-10 space-y-8">
            {legalType === "privacy" ? (
              <>
                <section>
                  <h2 className="text-xl font-bold tracking-tight">
                    1. Общие положения
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Настоящая Политика описывает, как сайт DocsHelp (далее —
                    «Сайт») обрабатывает персональные данные. Мы не публикуем
                    несуществующие контакты — основной канал связи: Telegram.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-bold tracking-tight">
                    2. Какие данные мы можем получать
                  </h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>
                      Данные, которые вы сообщаете в переписке в Telegram (по
                      вашей инициативе).
                    </li>
                    <li>
                      Технические данные (IP, user-agent, события на сайте) —
                      только при включённых аналитических cookies.
                    </li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-xl font-bold tracking-tight">
                    3. Цели обработки
                  </h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>Консультация по услугам и обработка запросов.</li>
                    <li>Улучшение качества сайта и UX (аналитика).</li>
                    <li>Оценка эффективности рекламных кампаний (маркетинг).</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-xl font-bold tracking-tight">
                    4. Хранение и безопасность
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Мы применяем разумные технические и организационные меры
                    защиты. Передача чувствительных данных всегда обсуждается
                    индивидуально в переписке.
                  </p>
                </section>
              </>
            ) : null}

            {legalType === "cookies" ? (
              <>
                <section>
                  <h2 className="text-xl font-bold tracking-tight">
                    1. Что такое cookies
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Cookies — это небольшие файлы, которые помогают сайту
                    запоминать настройки и улучшать работу.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-bold tracking-tight">
                    2. Категории cookies
                  </h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>
                      Обязательные — нужны для базовой работы и безопасности.
                    </li>
                    <li>
                      Аналитика — помогает понять поведение пользователей и
                      улучшать UX.
                    </li>
                    <li>
                      Маркетинг — помогает оценивать эффективность рекламы и
                      конверсий.
                    </li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-xl font-bold tracking-tight">
                    3. Управление настройками
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Вы можете выбрать «Принять», «Отклонить» или «Настроить» в
                    баннере cookies. Выбор можно изменить, очистив cookies и
                    данные сайта в браузере.
                  </p>
                </section>
              </>
            ) : null}

            {legalType === "terms" ? (
              <>
                <section>
                  <h2 className="text-xl font-bold tracking-tight">
                    1. Предмет соглашения
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Сайт предоставляет информацию об услугах и помогает связаться
                    с нами через Telegram для уточнения условий. Конкретные
                    условия оказания услуг согласуются индивидуально.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-bold tracking-tight">
                    2. Ответственность
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Мы стремимся поддерживать актуальность информации, но
                    отдельные требования зависят от документа, страны и
                    обстоятельств. Финальные условия подтверждаются в переписке.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-bold tracking-tight">
                    3. Оплата и сроки
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Обычно применяется процедура оплаты 50% предоплата / остаток по
                    готовности. Сроки ориентировочные, зависят от исходных данных
                    и логистики.
                  </p>
                </section>
              </>
            ) : null}

            {legalType === "disclaimer" ? (
              <>
                <section>
                  <h2 className="text-xl font-bold tracking-tight">
                    Информационный характер
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Материалы на сайте носят информационный характер и не
                    являются юридической консультацией. Мы не даём спорных
                    утверждений и не обещаем результат, который зависит от
                    третьих сторон.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-bold tracking-tight">
                    Условия уточняются в переписке
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Применимость апостиля/легализации, точные сроки и стоимость
                    («по запросу») уточняются в Telegram с учётом вашей ситуации.
                  </p>
                </section>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

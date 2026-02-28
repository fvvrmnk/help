import { BreadcrumbsBar } from "@/components/sections/BreadcrumbsBar";
import { FAQAccordion, type FAQItem } from "@/components/sections/FAQAccordion";
import { HowItWorksSteps } from "@/components/sections/HowItWorksSteps";
import { SEOTextBlock } from "@/components/sections/SEOTextBlock";
import { TariffTable, type TariffName } from "@/components/sections/TariffTable";
import { TelegramCTASection } from "@/components/sections/TelegramCTASection";
import { TrustBlock } from "@/components/sections/TrustBlock";
import { VisualHighlights } from "@/components/sections/VisualHighlights";
import {
  getCountryNameRu,
  getServicesByCountry,
  services,
  type CountryKey,
} from "@/data/catalog";
import { buildServiceTelegramMessage, getTelegramChatUrl } from "@/lib/telegram";
import {
  Seo,
  breadcrumbsJsonLd,
  faqJsonLd,
  organizationJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { ServiceQuickNav } from "@/components/sections/ServiceQuickNav";
import { Link, useParams } from "react-router-dom";

function getPpcBullets(service: { serviceGroup: string; nameRu: string }) {
  switch (service.serviceGroup) {
    case "Справки":
      return {
        audience: [
          "Для подачи документов за границу (в т.ч. в консульства/инстанции)",
          "Для трудоустройства/учёбы/миграционных процедур (по требованию принимающей стороны)",
          "Когда важен дистанционный процесс и понятные сроки",
        ],
        deliverables: [
          "Понятный список требований и исходных данных",
          "Оформление справки/документа в согласованном формате",
          "Сопровождение по шагам и проверка корректности данных",
          "Апостиль/легализация — при необходимости и где применимо",
        ],
      };
    case "ЗАГС":
      return {
        audience: [
          "Если требуется справка/дубликат/выписка из ЗАГС",
          "Для подачи за границу или в локальные организации",
          "Если нужен срочный тариф или помощь в разборе требований",
        ],
        deliverables: [
          "Согласованный список данных для оформления",
          "Подготовка документа (дубликат/справка/выписка) по запросу",
          "Рекомендации по дальнейшей подаче",
          "Апостиль при необходимости (если применимо)",
        ],
      };
    case "Права":
      return {
        audience: [
          "Для замены/восстановления/продления водительского удостоверения",
          "Для подтверждения стажа/категорий (по задаче)",
          "Когда нужна услуга с понятной процедурой оплаты и подтверждением готовности",
        ],
        deliverables: [
          "Консультация по требованиям и шагам",
          "Подготовка пакета документов (по ситуации)",
          "3 тарифа по срокам с уточнением применимости",
          "Коммуникация и статусы в Telegram",
        ],
      };
    case "Паспорта":
      return {
        audience: [
          "Если нужно восстановление/обновление паспорта (внутреннего/заграничного)",
          "Когда важно пройти процесс дистанционно и без лишних ошибок",
          "Если требуется срочное уточнение сроков и требований",
        ],
        deliverables: [
          "Проверка исходных данных и требований",
          "Понятный план действий и согласование шагов",
          "Поддержка в Telegram до результата",
          "Доставка при необходимости — по запросу",
        ],
      };
    case "Образование":
      return {
        audience: [
          "Если нужен диплом/аттестат или подтверждающие документы",
          "Для подачи за границу (учёба/работа/оценка квалификации)",
          "Когда важны корректные формулировки и применимость апостиля",
        ],
        deliverables: [
          "Консультация по требованиям принимающей стороны",
          "Оформление/восстановление документов об образовании (по запросу)",
          "Апостиль/легализация при необходимости (если применимо)",
          "Понятные сроки и процедура оплаты 50/50",
        ],
      };
    default:
      return {
        audience: [
          "Если документ нужен для подачи в организацию/инстанцию",
          "Если важно оформить дистанционно и понять сроки",
        ],
        deliverables: [
          "Консультация по требованиям",
          "Подготовка документа в согласованном формате",
        ],
      };
  }
}

function buildFaq(params: {
  serviceName: string;
  countryName: string;
  serviceGroup: string;
}): FAQItem[] {
  const groupHint =
    params.serviceGroup === "Права"
      ? "по водительским документам"
      : params.serviceGroup === "Паспорта"
        ? "по паспортным вопросам"
        : params.serviceGroup === "Образование"
          ? "по документам об образовании"
          : params.serviceGroup === "ЗАГС"
            ? "по актовым документам"
            : "по справкам/документам";

  return [
    {
      question: "Нужно ли личное присутствие?",
      answer:
        "Нет. Услуга дистанционная: уточняем задачу в Telegram и согласовываем шаги. Личное присутствие не требуется.",
    },
    {
      question: "Сколько стоит услуга?",
      answer:
        "Цена — «по запросу». Стоимость зависит от исходных данных, срочности, объёма и нюансов логистики/подачи.",
    },
    {
      question: "Какие сроки и тарифы доступны?",
      answer:
        "3 тарифа: Эконом (до 14 дней), Базовый (до 7 дней), Срочный (1 день). Сроки ориентировочные и уточняются после проверки исходных данных.",
    },
    {
      question: "Какая процедура оплаты?",
      answer:
        "Прозрачно: 50% предоплата, остаток — по готовности. Подтверждение готовности возможно фото/видео по запросу.",
    },
    {
      question: "Можно ли оформить апостиль / легализацию?",
      answer:
        "При необходимости и если применимо к документу/стране. Мы объясним процесс и согласуем формат в переписке.",
    },
    {
      question: "Какие данные нужны для старта?",
      answer:
        `Напишите в Telegram: услуга «${params.serviceName}», страна гражданства ${params.countryName} и желаемый срок. Мы уточним перечень исходных данных под вашу ситуацию.`,
    },
    {
      question: "Есть ли доставка?",
      answer:
        "По запросу. Доставка оплачивается отдельно и рассчитывается индивидуально.",
    },
    {
      question: "Можно ли выбрать срочный вариант?",
      answer:
        "Да, если применимо. Срочный тариф (1 день) зависит от исходных данных и требований; подтвердим возможность в переписке.",
    },
    {
      question: "Будут ли статусы и контроль процесса?",
      answer:
        `Да. Коммуникация и уточнения ${groupHint} — в Telegram, при необходимости предоставим подтверждение готовности.`,
    },
    {
      question: "Что делать, если моей ситуации нет в списке?",
      answer:
        "Напишите в Telegram — подберём корректную форму/услугу и объясним требования.",
    },
  ].slice(0, 10);
}

export default function ServicePage() {
  const params = useParams();
  const countryKey = params.countryKey as CountryKey | undefined;
  const slug = params.slug;

  const safeCountry: CountryKey =
    countryKey === "rf" || countryKey === "rb" || countryKey === "ua"
      ? countryKey
      : "rf";

  const service = services.find(
    (s) => s.countryKey === safeCountry && s.slug === slug,
  );

  if (!service) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-border/70 bg-card p-8">
          <h1 className="text-2xl font-bold tracking-tight">
            Услуга не найдена
          </h1>
          <p className="mt-2 text-muted-foreground">
            Проверьте ссылку или перейдите в каталог услуг по стране.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-xl">
              <Link to={`/${safeCountry}`}>Каталог по стране</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/">На главную</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const countryName = getCountryNameRu(safeCountry);
  const baseMessage = buildServiceTelegramMessage({
    serviceName: service.nameRu,
    countryName,
  });

  const buildTariffMessage = (tariff: TariffName) =>
    buildServiceTelegramMessage({
      serviceName: service.nameRu,
      countryName,
      tariff,
    });

  const bullets = getPpcBullets(service);
  const faq = buildFaq({
    serviceName: service.nameRu,
    countryName,
    serviceGroup: service.serviceGroup,
  });

  const related = getServicesByCountry(safeCountry)
    .filter((s) => s.id !== service.id)
    .filter((s) => s.serviceGroup === service.serviceGroup)
    .slice(0, 6);

  const canonicalPath = `/services/${safeCountry}/${service.slug}`;

  return (
    <div>
      <Seo
        title={`${service.nameRu} — DocsHelp`}
        description={`${service.shortSummary} Цена — по запросу. 3 тарифа по срокам. Контакт: Telegram @Docshelpp.`}
        canonicalPath={canonicalPath}
        ogType="article"
        jsonLd={[
          organizationJsonLd(),
          breadcrumbsJsonLd([
            { name: "Главная", path: "/" },
            { name: `Каталог: ${countryName}`, path: `/${safeCountry}` },
            { name: service.nameRu, path: canonicalPath },
          ]),
          serviceJsonLd({
            name: service.nameRu,
            description: service.shortSummary,
            areaServed: countryName,
            urlPath: canonicalPath,
          }),
          faqJsonLd(faq),
        ]}
      />
      <BreadcrumbsBar
        items={[
          { label: "Главная", to: "/" },
          { label: `Каталог: ${countryName}`, to: `/${safeCountry}` },
          { label: service.nameRu },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-border/70 bg-gradient-to-b from-muted/30 to-background p-6 md:p-10">
          <div className="text-sm text-muted-foreground">Услуга</div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            {service.nameRu}
          </h1>
          <p className="mt-3 max-w-prose text-muted-foreground">
            Дистанционно, без личного присутствия. 3 тарифа по срокам. Цена — по
            запросу.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-2xl">
              <a
                href={getTelegramChatUrl(baseMessage)}
                target="_blank"
                rel="noreferrer"
              >
                Получить консультацию в Telegram
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl">
              <a
                href={getTelegramChatUrl(
                  `${baseMessage}\n\nПожалуйста, уточните сроки и требования.`,
                )}
                target="_blank"
                rel="noreferrer"
              >
                Уточнить сроки и требования
              </a>
            </Button>
          </div>

          <ServiceQuickNav className="mt-6" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-bold tracking-tight">Кому подходит</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {bullets.audience.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-bold tracking-tight">Что вы получите</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {bullets.deliverables.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="tariffs" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight">Сроки и тарифы</h2>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          Выберите тариф — сообщение в Telegram будет заполнено автоматически.
        </p>
        <div className="mt-6">
          <TariffTable buildMessage={buildTariffMessage} />
        </div>
      </section>

      <div id="process">
        <HowItWorksSteps />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-bold tracking-tight">
              Апостиль / легализация
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Апостиль предоставляется при необходимости и если применимо к
              документу/стране. Мы не даём юридических обещаний, но уверенно
              объясним процесс и согласуем формат в переписке.
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-bold tracking-tight">Доставка</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              По запросу, оплачивается отдельно, рассчитывается индивидуально.
            </p>
          </div>
        </div>
      </section>

      <TrustBlock />
      <VisualHighlights />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <TelegramCTASection
          title="Готовы начать?"
          description="Напишите в Telegram: укажите страну гражданства, услугу и желаемый срок. Мы уточним требования и предложим тариф."
          message={baseMessage}
        />
      </section>

      <SEOTextBlock
        title="Почему выбирают DocsHelp"
        text={`Мы строим процесс вокруг понятных шагов и прозрачных условий: дистанционное оформление, Telegram-коммуникация, три тарифа по срокам и процедура оплаты 50/50. Услуга «${service.nameRu}» оформляется с учётом требований страны подачи, а апостиль/легализация выполняются при необходимости и где применимо. Все цены — «по запросу», чтобы корректно учитывать объём и срочность.`}
      />

      <div id="faq">
        <FAQAccordion title="FAQ по услуге" items={faq} />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-10">
          <h2 className="text-xl font-bold tracking-tight">Релевантные услуги</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Возможно, вам также подойдут следующие услуги из каталога страны.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {related.map((s) => (
              <Button
                key={s.id}
                asChild
                variant="outline"
                className="rounded-full"
              >
                <Link to={`/services/${s.countryKey}/${s.slug}`}>{s.nameRu}</Link>
              </Button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-xl">
              <Link to={`/${safeCountry}`}>Каталог по стране</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/">Главная</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <TelegramCTASection
          title="Уточним требования и запустим оформление"
          description="Напишите в Telegram — сообщение будет заполнено услугой и страной. Можно также указать желаемый тариф: Эконом / Базовый / Срочный."
          message={baseMessage}
        />
      </section>
    </div>
  );
}

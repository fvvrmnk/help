import { Button } from "@/components/ui/button";
import {
  getCountryNameRu,
  getCountryNameRuGenitive,
  getServicesByCountry,
  type CountryKey,
} from "@/data/catalog";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { BreadcrumbsBar } from "@/components/sections/BreadcrumbsBar";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { HowItWorksSteps } from "@/components/sections/HowItWorksSteps";
import { SEOTextBlock } from "@/components/sections/SEOTextBlock";
import { FAQAccordion, type FAQItem } from "@/components/sections/FAQAccordion";
import { TrustBlock } from "@/components/sections/TrustBlock";
import { AdvantagesBlock } from "@/components/sections/AdvantagesBlock";
import {
  Seo,
  breadcrumbsJsonLd,
  faqJsonLd,
  organizationJsonLd,
} from "@/lib/seo";

const faqByCountry: Record<CountryKey, FAQItem[]> = {
  rf: [
    {
      question: "Какие услуги доступны для граждан РФ?",
      answer:
        "Справки (включая судимость), документы ЗАГС, услуги по правам, паспорта и документы об образовании. Полный список — в каталоге выше.",
    },
    {
      question: "Апостиль обязателен?",
      answer:
        "Не всегда. Апостиль делается при необходимости и если применимо к документу. Применимость уточняем по вашей задаче.",
    },
    {
      question: "Какие тарифы по срокам доступны?",
      answer:
        "Эконом — до 14 дней, Базовый — до 7 дней, Срочный — 1 день. Сроки ориентировочные и зависят от исходных данных.",
    },
    {
      question: "Как оплатить?",
      answer:
        "50% предоплата, остаток по готовности. Возможны фото/видео подтверждение по запросу.",
    },
    {
      question: "Доставка возможна?",
      answer:
        "Да, при необходимости. Оплачивается отдельно и рассчитывается индивидуально.",
    },
    {
      question: "Есть ли цены на сайте?",
      answer:
        "Все цены — «по запросу». Напишите в Telegram — рассчитаем по вашей ситуации.",
    },
    {
      question: "Можно ли заказать справку/документ, которого нет в списке?",
      answer:
        "Да. Опишите, какая форма нужна и для чего — подберём корректный вариант.",
    },
  ],
  rb: [
    {
      question: "Какие услуги доступны для граждан РБ?",
      answer:
        "Справки, документы ЗАГС, услуги по водительскому удостоверению, паспорта и документы об образовании. Выберите услугу в каталоге.",
    },
    {
      question: "Вы работаете дистанционно?",
      answer:
        "Да. Общение и согласование — в Telegram. Личное присутствие не требуется.",
    },
    {
      question: "Какие сроки?",
      answer:
        "Эконом — до 14 дней, Базовый — до 7 дней, Срочный — 1 день. Сроки уточняем после проверки исходных данных.",
    },
    {
      question: "Цена фиксированная?",
      answer:
        "Нет, цена всегда «по запросу», зависит от документа и срочности.",
    },
    {
      question: "Можно ли оформить апостиль?",
      answer:
        "При необходимости и где применимо. Уточним применимость в переписке.",
    },
    {
      question: "Как проходит оплата?",
      answer:
        "50% предоплата, остаток по готовности. Подтверждение готовности — по запросу.",
    },
    {
      question: "Есть доставка?",
      answer:
        "По запросу, оплачивается отдельно, рассчитывается индивидуально.",
    },
    {
      question: "С чего начать?",
      answer:
        "Напишите в Telegram, укажите услугу и желаемый срок — ответим быстро.",
    },
  ],
  ua: [
    {
      question: "Какие услуги доступны для граждан Украины?",
      answer:
        "Справки (включая судимость), документы ЗАГС, услуги по правам, паспорта и образование. Полный список — в каталоге.",
    },
    {
      question: "Нужно ли личное присутствие?",
      answer:
        "Нет. Услуга дистанционная; применимость конкретных шагов уточняется по ситуации.",
    },
    {
      question: "Сроки и тарифы",
      answer:
        "Эконом — до 14 дней, Базовый — до 7 дней, Срочный — 1 день. Сроки ориентировочные.",
    },
    {
      question: "Сколько стоит?",
      answer:
        "Цена «по запросу». Рассчитываем индивидуально после уточнения требований.",
    },
    {
      question: "Апостиль / легализация",
      answer:
        "При необходимости и где применимо. Не даём юридических обещаний — объясняем процесс и согласуем в переписке.",
    },
    {
      question: "Оплата",
      answer:
        "50% предоплата, остаток по готовности. Подтверждение готовности — фото/видео по запросу.",
    },
    {
      question: "Доставка",
      answer:
        "По запросу, оплачивается отдельно, рассчитывается индивидуально.",
    },
    {
      question: "Как начать?",
      answer:
        "Выберите услугу и напишите в Telegram. Уточним требования и сроки.",
    },
  ],
};

export default function CountryPage() {
  const params = useParams();
  const countryKey = params.countryKey as CountryKey | undefined;

  const safeCountry: CountryKey =
    countryKey === "rf" || countryKey === "rb" || countryKey === "ua"
      ? countryKey
      : "rf";

  const countryName = getCountryNameRu(safeCountry);
  const countryNameForCitizens = getCountryNameRuGenitive(safeCountry);
  const count = getServicesByCountry(safeCountry).length;

  const seoText = useMemo(() => {
    return `На этой странице собраны услуги DocsHelp для граждан ${countryNameForCitizens}. Выберите нужную категорию (справки, ЗАГС, права, паспорта, образование) и откройте страницу услуги — там вы найдёте структуру лендинга с тарифами по срокам, шагами оформления и FAQ. Мы работаем дистанционно: общение в Telegram, личное присутствие не требуется. Оплата прозрачная: 50% предоплата, остаток по готовности, подтверждение готовности возможно фото/видео по запросу. Все цены — «по запросу». Апостиль/легализация предоставляются при необходимости и где применимо — применимость уточняется в переписке.`;
  }, [countryNameForCitizens]);

  return (
    <div>
      <Seo
        title={`DocsHelp — услуги для граждан ${countryNameForCitizens}`}
        description={`Каталог услуг DocsHelp для граждан ${countryNameForCitizens}: справки, ЗАГС, права, паспорта, образование. Все цены — по запросу. Контакт: Telegram @Docshelpp.`}
        canonicalPath={`/${safeCountry}`}
        jsonLd={[
          organizationJsonLd(),
          breadcrumbsJsonLd([
            { name: "Главная", path: "/" },
            { name: `Услуги: ${countryName}`, path: `/${safeCountry}` },
          ]),
          faqJsonLd(faqByCountry[safeCountry]),
        ]}
      />
      <BreadcrumbsBar
        items={[
          { label: "Главная", to: "/" },
          { label: `Услуги: ${countryName}` },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-border/70 bg-gradient-to-b from-muted/30 to-background p-6 md:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Услуги для граждан {countryNameForCitizens}
          </h1>
          <p className="mt-3 max-w-prose text-muted-foreground">
            {count} услуг в каталоге. Все цены — «по запросу». 3 тарифа по срокам,
            дистанционное оформление, Telegram-поддержка.
          </p>
          <div className="mt-6">
            <Button asChild variant="outline" size="lg" className="rounded-2xl">
              <Link to="/">Вернуться на главную</Link>
            </Button>
          </div>
        </div>
      </section>

      <ServiceGrid countryKey={safeCountry} />
      <AdvantagesBlock />
      <TrustBlock />
      <HowItWorksSteps />
      <SEOTextBlock title={`SEO: услуги для граждан ${countryNameForCitizens}`} text={seoText} />
      <FAQAccordion title={`FAQ по стране: ${countryName}`} items={faqByCountry[safeCountry]} />
    </div>
  );
}

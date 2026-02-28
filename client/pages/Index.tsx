import { useMemo, useState } from "react";
import {
  getCountryNameRu,
  type CountryKey,
  getServicesByCountry,
} from "@/data/catalog";
import { HeroAggregator } from "@/components/sections/HeroAggregator";
import { CountrySelector } from "@/components/sections/CountrySelector";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { HowItWorksSteps } from "@/components/sections/HowItWorksSteps";
import { SEOTextBlock } from "@/components/sections/SEOTextBlock";
import { FAQAccordion, type FAQItem } from "@/components/sections/FAQAccordion";
import { TrustBlock } from "@/components/sections/TrustBlock";
import { AdvantagesBlock } from "@/components/sections/AdvantagesBlock";
import { AboutUsBlock } from "@/components/sections/AboutUsBlock";
import { Seo, faqJsonLd, organizationJsonLd } from "@/lib/seo";

const homeFaq: FAQItem[] = [
  {
    question: "Нужно ли личное присутствие?",
    answer:
      "Нет. Услуга дистанционная: общаемся в Telegram, уточняем задачу и требования, далее действуем по согласованному плану.",
  },
  {
    question: "Сколько стоит оформление?",
    answer:
      "Цена всегда «по запросу», потому что зависит от документа, исходных данных и срочности. Напишите в Telegram — оценим и предложим варианты.",
  },
  {
    question: "Какие сроки возможны?",
    answer:
      "Для каждой услуги доступны 3 тарифа: Эконом (до 14 дней), Базовый (до 7 дней), Срочный (1 день). Сроки ориентировочные и уточняются по ситуации.",
  },
  {
    question: "Как проходит оплата?",
    answer:
      "Процедура прозрачная: 50% предоплата, остаток — по готовности. По запросу предоставим фото/видео подтверждение готовности.",
  },
  {
    question: "Можно ли оформить апостиль?",
    answer:
      "Апостиль предоставляется при необходимости и если применимо к документу/стране. Уточняем применимость и формат в переписке.",
  },
  {
    question: "Есть ли доставка?",
    answer:
      "Да, при необходимости. Доставка оплачивается отдельно и рассчитывается индивидуально.",
  },
  {
    question: "Какие документы нужны для старта?",
    answer:
      "Обычно достаточно описания задачи, страны подачи и ваших исходных данных. Мы уточним список документов и шаги в Telegram.",
  },
  {
    question: "Можно ли заказать «нестандартную» справку?",
    answer:
      "Да. В каталоге есть позиция «под запрос». Опишите, что нужно и для чего — подберём корректную форму и требования.",
  },
  {
    question: "Вы работаете только для РФ/РБ/Украины?",
    answer:
      "Каталог сейчас сфокусирован на этих странах гражданства. Если у вас другая ситуация — всё равно напишите, подскажем возможные варианты.",
  },
];

export default function Index() {
  const [countryKey, setCountryKey] = useState<CountryKey>("rf");

  const seoText = useMemo(() => {
    const country = getCountryNameRu(countryKey);
    const count = getServicesByCountry(countryKey).length;

    return `DocsHelp — агрегатор дистанционных услуг по документам для граждан ${country}. Здесь можно подобрать справки, документы ЗАГС, услуги по водительским удостоверениям, паспортам и документам об образовании. Мы работаем в современном формате: всё общение и согласование проходит в Telegram, без личного присутствия. Для каждой услуги доступны 3 тарифа по срокам (эконом, базовый, срочный), а стоимость всегда рассчитывается индивидуально и указывается как «по запросу». При необходимости и где применимо поможем с апостилем/легализацией — применимость уточняется в переписке. Прозрачные условия оплаты: 50% предоплата, остаток после подтверждения готовности (возможны фото/видео). Доставка при необходимости рассчитывается отдельно. В каталоге ниже — ${count} услуг, распределённых по группам для удобного выбора.`;
  }, [countryKey]);

  return (
    <div>
      <Seo
        title="DocsHelp — дистанционные услуги по документам"
        description="Агрегатор дистанционных услуг по документам для граждан РФ, РБ и Украины: справки, ЗАГС, права, паспорта, образование. Апостиль при необходимости. Контакт: Telegram @Docshelpp."
        canonicalPath="/"
        jsonLd={[organizationJsonLd(), faqJsonLd(homeFaq)]}
      />
      <HeroAggregator />
      <CountrySelector value={countryKey} onChange={setCountryKey} />
      <ServiceGrid countryKey={countryKey} />
      <AboutUsBlock />
      <AdvantagesBlock />
      <TrustBlock />
      <HowItWorksSteps />
      <SEOTextBlock title="О сервисе DocsHelp" text={seoText} />
      <FAQAccordion title="Частые вопросы" items={homeFaq} />
    </div>
  );
}

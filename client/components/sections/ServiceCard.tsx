import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { ServiceGroup, ServiceItem } from "@/data/catalog";
import { FileText, Info, Star } from "lucide-react";

type HeaderImage = { src: string; alt: string; objectPosition?: string };

const imageByGroup: Record<ServiceGroup, HeaderImage> = {
  "Справки": {
    src: "https://images.pexels.com/photos/9858904/pexels-photo-9858904.jpeg",
    alt: "Документы и печать на столе",
  },
  "ЗАГС": {
    src: "https://images.pexels.com/photos/34303992/pexels-photo-34303992.jpeg",
    alt: "Регистрация брака и документы",
  },
  "Права": {
    src: "https://images.pexels.com/photos/45113/pexels-photo-45113.jpeg",
    alt: "Водительское удостоверение",
  },
  "Паспорта": {
    src: "https://images.pexels.com/photos/4922356/pexels-photo-4922356.jpeg",
    alt: "Паспорт со штампами",
  },
  "Образование": {
    src: "https://images.pexels.com/photos/9829488/pexels-photo-9829488.jpeg",
    alt: "Диплом и документы об образовании",
  },
};

/** Exact per-service overrides (highest priority) */
const imageByServiceName: Partial<Record<string, HeaderImage>> = {
  "Справка для замены прав за границей (для РФ)": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F5fe8ac391082461795fd7b9965fa5c16?format=webp&width=800&height=1200",
    alt: "Справка для замены прав за границей (РФ)",
    objectPosition: "50% 0%",
  },
  "Справка форма №5 ЗАГС для граждан РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F8933e4c6bd0a47b08df8f4193aef40fa?format=webp&width=800&height=1200",
    alt: "Справка ЗАГС форма 5 (РФ)",
    objectPosition: "50% 0%",
  },
  "Справка форма №6 ЗАГС для граждан РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fcdd084232ad64b7589809103d9c225d8?format=webp&width=800&height=1200",
    alt: "Справка ЗАГС форма 6 (РФ)",
    objectPosition: "50% 0%",
  },
  "Справка форма №15 ЗАГС для граждан РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Ffcec6cab89284c7780baba9c7dd2a925?format=webp&width=800&height=1200",
    alt: "Справка ЗАГС форма 15 (РФ)",
    objectPosition: "50% 0%",
  },
  "Восстановление водительского удостоверения РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F04abf67c6020421681a74c3dfbb35f42?format=webp&width=800&height=1200",
    alt: "Водительское удостоверение РФ",
    objectPosition: "50% 20%",
  },
  "Продление истекшего водительского удостоверения РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fce8fc77896294c3894283d76033457bf?format=webp&width=800&height=1200",
    alt: "Продление водительского удостоверения РФ",
    objectPosition: "50% 10%",
  },
  "Добавление стажа вождения для ваших нужд для водителей РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Faed4ab9be43144aab4711d48137f9567?format=webp&width=800&height=1200",
    alt: "Водительское удостоверение РФ — стаж вождения",
    objectPosition: "50% 15%",
  },
  "Добавление категорий к водительскому удостоверению РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F3a67275f16bf48a193d9aea11e02b256?format=webp&width=800&height=1200",
    alt: "Категории водительского удостоверения РФ",
    objectPosition: "50% 25%",
  },
  "Свидетельство о рождении для граждан РФ (в т.ч. старые бланки СССР)": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Ff37fbe52fb2b4c139bc19803fa93b7f0?format=webp&width=800&height=1200",
    alt: "Свидетельство о рождении (РФ)",
    objectPosition: "50% 15%",
  },
  "Свидетельство о смерти для граждан РФ (в т.ч. старые бланки СССР)": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fd6ad0b1c07804098ad96bf46af799936?format=webp&width=800&height=1200",
    alt: "Свидетельство о смерти (РФ)",
    objectPosition: "50% 0%",
  },
  "Свидетельство о браке для граждан РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fc4667323cad145d8aea40c2bdb2f49c5?format=webp&width=800&height=1200",
    alt: "Свидетельство о браке (РФ)",
    objectPosition: "50% 0%",
  },
  "Свидетельство о разводе для граждан РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Ff9a3eaef2b6040d38099a85df8dd2206?format=webp&width=800&height=1200",
    alt: "Свидетельство о расторжении брака (РФ)",
    objectPosition: "50% 0%",
  },
  "Восстановление/обновление внутреннего паспорта РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F02955aca56564b2ca9383b2fd4447d7b?format=webp&width=800&height=1200",
    alt: "Внутренний паспорт РФ",
    objectPosition: "50% 0%",
  },
  "Восстановление/обновление заграничного паспорта РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F95351829dcdc4b4bb84eccfa6fc3b7e0?format=webp&width=800&height=1200",
    alt: "Заграничный паспорт РФ",
    objectPosition: "50% 10%",
  },
  "Дипломы об образовании РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F83fe8a32a98343d4971a0ff9357641f4?format=webp&width=800&height=1200",
    alt: "Диплом об образовании (РФ)",
    objectPosition: "50% 20%",
  },
  "Аттестаты о среднем образовании РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F14f5e45a53ea4dc0bad973d2872703b5?format=webp&width=800&height=1200",
    alt: "Аттестат о среднем образовании (РФ)",
    objectPosition: "50% 20%",
  },
  "Свидетельство о рождении для граждан РБ (в т.ч. старые бланки СССР)": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F57f59d4d069c49e6847435f503dd21b4?format=webp&width=800&height=1200",
    alt: "Свидетельство о рождении (РБ)",
    objectPosition: "50% 20%",
  },
  "Свидетельство о смерти для граждан РБ (в т.ч. старые бланки СССР)": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F94476ba348604e41a32fdd0a66546bf3?format=webp&width=800&height=1200",
    alt: "Свидетельство о смерти (РБ)",
    objectPosition: "50% 20%",
  },
  "Свидетельство о браке для граждан РБ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F3aff649401cf477abdb84d60e313c2be?format=webp&width=800&height=1200",
    alt: "Свидетельство о браке (РБ)",
    objectPosition: "50% 20%",
  },
  "Водительское удостоверение международного образца РФ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F579467714fb8486cad5fd9b8bc84ffce?format=webp&width=800&height=1200",
    alt: "Международное водительское удостоверение РФ",
    objectPosition: "50% 0%",
  },
  "Добавление категорий к водительскому удостоверению Украина": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F54bf79a69aba4f17a9542c32def75683?format=webp&width=800&height=1200",
    alt: "Категории украинского водительского удостоверения",
  },
  "Справка для замены прав за границей (для Украины)": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F7720138f4a7b4b2199b30c697f2409e4?format=webp&width=800&height=1200",
    alt: "Справка для замены прав за границей (Украина)",
    objectPosition: "50% 0%",
  },
  "Свидетельство о рождении для граждан Украины (в т.ч. старые бланки СССР — если применимо)": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F873e6fc8e9c74629a7aa8b0f9abc9cb6?format=webp&width=800&height=1200",
    alt: "Свидетельство о рождении (Украина)",
  },
  "Свидетельство о смерти для граждан Украины (в т.ч. старые бланки СССР — аккуратно)": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F505da03639854b37a994fb640788200b?format=webp&width=800&height=1200",
    alt: "Свидетельство о смерти (Украина)",
  },
  "Свидетельство о браке для граждан Украины": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F5a23990287854e3b80a0082f3a1f7653?format=webp&width=800&height=1200",
    alt: "Свидетельство о браке (Украина)",
  },
  "Свидетельство о разводе для граждан Украины": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fa4e4dd5596a849238fce32f4981354b2?format=webp&width=800&height=1200",
    alt: "Свидетельство о разводе (Украина)",
  },
  "Восстановление/обновление внутреннего паспорта Украины": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fdc3f0908e7a34cacbc3a195dfaa27ec2?format=webp&width=800&height=1200",
    alt: "Внутренний паспорт (ID-карта) Украины",
    objectPosition: "50% 20%",
  },
  "Восстановление/обновление заграничного паспорта Украины": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F344091ed1fc44d6e9171862629993264?format=webp&width=800&height=1200",
    alt: "Заграничный паспорт Украины",
    objectPosition: "50% 10%",
  },
  "Дипломы об образовании Украина": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fc72dc4c81f8e4f47a262c3ac9fa21184?format=webp&width=800&height=1200",
    alt: "Диплом об образовании (Украина)",
    objectPosition: "50% 15%",
  },
  "Аттестаты о среднем образовании Украина": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fbaf008b09b3648eca372400aa4f73a6a?format=webp&width=800&height=1200",
    alt: "Аттестат о среднем образовании (Украина)",
    objectPosition: "50% 20%",
  },
  "Восстановление водительского удостоверения РБ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F52a732189b46439eb263bd93383cfe59?format=webp&width=800&height=1200",
    alt: "Водительское удостоверение Республики Беларусь",
    objectPosition: "50% 15%",
  },
  "Справка для замены прав за границей (для РБ)": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F5fa0b40a7f654d379e324b86682aa676?format=webp&width=800&height=1200",
    alt: "Справка для замены прав за границей (РБ)",
    objectPosition: "50% 0%",
  },
  "Добавление категорий к водительскому удостоверению РБ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F9223b307006a485693036e5542acec90?format=webp&width=800&height=1200",
    alt: "Категории водительского удостоверения РБ",
    objectPosition: "50% 20%",
  },
  "Продление истекшего водительского удостоверения РБ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F14dc40fb741b451684c13a61bab2e07f?format=webp&width=800&height=1200",
    alt: "Водительское удостоверение и документы (РБ)",
    objectPosition: "50% 20%",
  },
  "Добавление стажа вождения для ваших нужд для водителей РБ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F65aafdd3967b49379e2cc2817e64044b?format=webp&width=800&height=1200",
    alt: "Водительское удостоверение Республики Беларусь — стаж вождения",
    objectPosition: "50% 20%",
  },
  "Восстановление/обновление паспорта РБ": {
    src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F1a77b4c082db4406b5ced3d632ebe6c7?format=webp&width=800&height=1200",
    alt: "Паспорт Республики Беларусь",
    objectPosition: "50% 10%",
  },
};

/** Country-specific image sets that rotate across cards */
const imageSetOverrides: Partial<
  Record<`${import("@/data/catalog").CountryKey}:${ServiceGroup}`, Array<HeaderImage>>
> = {
  "ua:Права": [
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F605cc12537c34f64aae93b0940ce996e?format=webp&width=800&height=1200",
      alt: "Украинское водительское удостоверение — образец 1",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F150febf06ce048e39547a57ef7b4632d?format=webp&width=800&height=1200",
      alt: "Украинское водительское удостоверение — образец 2",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F094e3e54d4404295a76c8839cadd6724?format=webp&width=800&height=1200",
      alt: "Украинское водительское удостоверение — образец 3",
    },
  ],
};

export function ServiceCard(props: { service: ServiceItem; index?: number }) {
  const s = props.service;

  const perServiceOverride = imageByServiceName[s.nameRu];

  const overrideKey = `${s.countryKey}:${s.serviceGroup}` as keyof typeof imageSetOverrides;
  const imageSet = imageSetOverrides[overrideKey];
  const rotationIndex = (props.index ?? 0) % (imageSet?.length ?? 1);

  const headerImage =
    perServiceOverride ??
    (imageSet ? imageSet[rotationIndex] : imageByGroup[s.serviceGroup]);

  return (
    <Card className="overflow-hidden rounded-2xl border-border/70 bg-card">
      <div className="relative">
        <div className="relative h-36">
          <img
            src={headerImage.src}
            alt={headerImage.alt}
            className="h-full w-full object-cover object-top"
            style={
              headerImage.objectPosition
                ? { objectPosition: headerImage.objectPosition }
                : undefined
            }
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/55 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-muted/30" />
        </div>

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/90 px-3 py-2 text-xs text-muted-foreground backdrop-blur">
          <FileText className="h-4 w-4 text-primary" />
          <span>{s.serviceGroup}</span>
        </div>

        {s.countryKey === "rb" && (
          <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-xl bg-amber-500/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>Эксклюзив</span>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="text-base font-semibold leading-snug tracking-tight">
          {s.nameRu}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{s.shortSummary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Цена: {s.priceLabel}</Badge>
          <Badge variant="secondary">3 тарифа</Badge>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full gap-2 rounded-xl">
          <Link to={`/services/${s.countryKey}/${s.slug}`}>
            <Info className="h-4 w-4" />
            Подробнее
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

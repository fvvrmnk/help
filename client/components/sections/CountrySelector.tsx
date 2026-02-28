import { countries, type CountryKey } from "@/data/catalog";
import { cn } from "@/lib/utils";

const RF_TILE_BG =
  "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fcf4fd39aaff44d94b06a4698e13579f0?format=webp&width=1200&height=800";

const RB_TILE_BG =
  "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2Fdf09d61a60204bf3a85f34de72c3bf09?format=webp&width=1200&height=800";

const UA_TILE_BG =
  "https://cdn.builder.io/api/v1/image/assets%2F4307629f5e7f45b4a554e2409e0a9675%2F0001adecebf64bf185d76abc9c87814f?format=webp&width=1200&height=800";

const flagBgByCountry: Record<CountryKey, string> = {
  rf: "linear-gradient(to bottom, #ffffff 0 33.33%, #0039a6 33.33% 66.66%, #d52b1e 66.66% 100%)",
  rb: "linear-gradient(to bottom, #d22730 0 66%, #00af66 66% 100%)",
  ua: "linear-gradient(to bottom, #0057b7 0 50%, #ffd700 50% 100%)",
};

export function CountrySelector(props: {
  value: CountryKey;
  onChange: (key: CountryKey) => void;
}) {
  return (
    <section id="country" className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Выберите страну гражданства
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Каталог ниже обновится автоматически — покажем услуги, актуальные для
            выбранной страны.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {countries.map((c) => {
          const active = props.value === c.key;
          const tileBg =
            c.key === "rf" ? RF_TILE_BG : c.key === "rb" ? RB_TILE_BG : UA_TILE_BG;

          return (
            <button
              key={c.key}
              type="button"
              onClick={() => props.onChange(c.key)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-6 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                active
                  ? "border-primary/40 bg-primary/5"
                  : "border-border/70 bg-card hover:bg-muted/30",
              )}
              aria-pressed={active}
              aria-label={`Выбрать ${c.nameRuGenitive} для просмотра услуг`}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <img
                  src={tileBg}
                  alt=""
                  className="h-full w-full object-cover object-top opacity-35"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/35" />
              </div>

              <div className="relative">
                <div className="text-sm text-muted-foreground">Страна</div>
                <div className="mt-1 text-lg font-semibold tracking-tight">
                  {c.nameRu}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  Показать услуги и требования для граждан {c.nameRuGenitive}.
                </div>
                <div
                  className={cn(
                    "mt-4 h-1 w-12 rounded-full transition",
                    active ? "bg-primary" : "bg-muted group-hover:bg-primary/50",
                  )}
                />
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 md:h-24 md:w-24"
              >
                <div
                  className="absolute inset-0 shadow-sm ring-1 ring-border/60"
                  style={{
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                    backgroundImage: flagBgByCountry[c.key],
                  }}
                >
                  {c.key === "rb" ? (
                    <div
                      className="absolute left-0 top-0 h-full w-[22%]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, #ffffff 0 6px, #d22730 6px 12px)",
                        opacity: 0.95,
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

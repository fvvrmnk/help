import type { CountryKey } from "@/data/catalog";

const flagBg: Record<CountryKey, string> = {
  rf: "linear-gradient(to bottom, #ffffff 0 33.33%, #0039a6 33.33% 66.66%, #d52b1e 66.66% 100%)",
  rb: "linear-gradient(to bottom, #d22730 0 66%, #00af66 66% 100%)",
  ua: "linear-gradient(to bottom, #0057b7 0 50%, #ffd700 50% 100%)",
};

const flagLabel: Record<CountryKey, string> = {
  rf: "Россия",
  rb: "Беларусь",
  ua: "Украина",
};

export function CountryFlagBadge({
  countryKey,
  className = "",
}: {
  countryKey: CountryKey;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`Флаг: ${flagLabel[countryKey]}`}
      className={`inline-block h-8 w-11 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-border/40 ${className}`}
      style={{ background: flagBg[countryKey] }}
    />
  );
}

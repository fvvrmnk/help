export const TELEGRAM_HANDLE = "Docshelpp";

export function getTelegramChatUrl(message?: string) {
  const base = `https://t.me/${TELEGRAM_HANDLE}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildServiceTelegramMessage(params: {
  serviceName: string;
  countryName: string;
  tariff?: "Эконом" | "Базовый" | "Срочный";
}) {
  const tariffLine = params.tariff ? `\nТариф: ${params.tariff}.` : "";
  return `Здравствуйте! Интересует услуга: ${params.serviceName}.\nСтрана: ${params.countryName}.${tariffLine}`;
}

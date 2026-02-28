import { RequestHandler } from "express";

interface ContactFormData {
  name: string;
  contact: string;
  service?: string;
  note?: string;
  gdprConsent: boolean;
}

async function sendTelegramMessage(text: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables");
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Telegram API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return false;
  }
}

// Escape HTML for Telegram HTML parse mode
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Simple phone validation (basic check for phone-like format)
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
  return phoneRegex.test(phone);
}

// Simple telegram handle validation
function isValidTelegram(handle: string): boolean {
  const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
  return telegramRegex.test(handle);
}

export const handleContact: RequestHandler = async (req, res) => {
  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, contact, service, note, gdprConsent }: ContactFormData = req.body;

  // Validate required fields
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ error: "Invalid name" });
  }

  if (!contact || typeof contact !== "string" || contact.trim().length < 5) {
    return res.status(400).json({ error: "Invalid contact" });
  }

  if (!gdprConsent) {
    return res.status(400).json({ error: "GDPR consent required" });
  }

  // Validate contact format (email, phone, or telegram)
  const contactTrimmed = contact.trim();
  const isValidContact =
    isValidEmail(contactTrimmed) ||
    isValidPhone(contactTrimmed) ||
    isValidTelegram(contactTrimmed);

  if (!isValidContact) {
    return res.status(400).json({ error: "Invalid contact format" });
  }

  // Format message for Telegram
  const messageText = `
<b>📋 Новая заявка из формы</b>

<b>👤 Имя:</b> ${escapeHtml(name.trim())}
<b>📞 Контакт:</b> ${escapeHtml(contactTrimmed)}
${service ? `<b>🎯 Услуга:</b> ${escapeHtml(String(service).trim())}\n` : ""}${note ? `<b>📝 Заметка:</b> ${escapeHtml(String(note).trim())}\n` : ""}<b>⏰ Время:</b> ${new Date().toLocaleString("ru-RU")}
  `.trim();

  // Send to Telegram
  const telegramSent = await sendTelegramMessage(messageText);

  // Log submission locally
  console.log("[CONTACT FORM]", {
    timestamp: new Date().toISOString(),
    name: name.trim(),
    contact: contactTrimmed,
    service: service ? String(service).trim() : undefined,
    note: note ? String(note).trim() : undefined,
    telegramSent,
  });

  // Return success even if Telegram fails (form was validated)
  res.status(200).json({
    success: true,
    message: "Form submitted successfully",
  });
};

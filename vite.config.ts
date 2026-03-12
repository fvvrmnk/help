import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import "dotenv/config";

// Escape HTML for Telegram HTML parse mode
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegramMessage(text: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    console.warn("[contact] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return false;
  }
  try {
    const r = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    if (!r.ok) {
      console.error("[contact] Telegram API error:", await r.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] Telegram send error:", err);
    return false;
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [
    react(),
    // Mount API routes inside Vite's dev server (development only)
    {
      name: "api-dev-middleware",
      configureServer(server) {
        server.middlewares.use((req: any, res: any, next: any) => {
          if (!req.url?.startsWith("/api/")) return next();

          // Collect raw body
          const chunks: Buffer[] = [];
          req.on("data", (chunk: Buffer) => chunks.push(chunk));
          req.on("end", async () => {
            const raw = Buffer.concat(chunks).toString("utf8");
            let body: Record<string, any> = {};
            try { body = JSON.parse(raw); } catch { /* ignore */ }

            res.setHeader("Content-Type", "application/json");

            if (req.url === "/api/ping") {
              res.statusCode = 200;
              res.end(JSON.stringify({ message: process.env.PING_MESSAGE ?? "ping" }));
              return;
            }

            if (req.url === "/api/contact") {
              if (req.method !== "POST") {
                res.statusCode = 405;
                res.end(JSON.stringify({ error: "Method not allowed" }));
                return;
              }

              // Honeypot
              if (body.website) {
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true }));
                return;
              }

              const { name, contact, service, tariff, note, gdprConsent } = body;

              if (!name || String(name).trim().length < 2) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Invalid name" }));
                return;
              }
              if (!contact || String(contact).trim().length < 5) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Invalid contact" }));
                return;
              }
              if (!gdprConsent) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "GDPR consent required" }));
                return;
              }

              const nameTrimmed = String(name).trim();
              const contactTrimmed = String(contact).trim();
              const messageText = [
                "<b>📋 Новая заявка из формы</b>",
                "",
                `<b>👤 Имя:</b> ${escapeHtml(nameTrimmed)}`,
                `<b>📞 Контакт:</b> ${escapeHtml(contactTrimmed)}`,
                service ? `<b>🎯 Услуга:</b> ${escapeHtml(String(service).trim())}` : null,
                tariff ? `<b>⚡ Тариф:</b> ${escapeHtml(String(tariff).trim())}` : null,
                note ? `<b>📝 Заметка:</b> ${escapeHtml(String(note).trim())}` : null,
                `<b>⏰ Время:</b> ${new Date().toLocaleString("ru-RU")}`,
              ].filter(Boolean).join("\n");

              const sent = await sendTelegramMessage(messageText);
              console.log("[CONTACT FORM]", { name: nameTrimmed, contact: contactTrimmed, service, tariff, sent });

              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, message: "Form submitted successfully" }));
              return;
            }

            // Unknown API route
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Not found" }));
          });
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

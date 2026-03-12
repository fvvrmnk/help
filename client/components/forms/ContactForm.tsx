import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export interface ContactFormProps {
  onSuccess?: () => void;
  initialService?: string;
  initialTariff?: string;
}

export function ContactForm({ onSuccess, initialService, initialTariff }: ContactFormProps) {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (honeypot) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      contact: formData.get("contact"),
      service: formData.get("service"),
      tariff: formData.get("tariff"),
      note: formData.get("note"),
      gdprConsent: formData.get("gdprConsent"),
    };

    const newErrors: Record<string, string> = {};
    if (!data.name || (data.name as string).trim().length < 2) {
      newErrors.name = "Укажите имя (минимум 2 символа)";
    }
    if (!data.contact || (data.contact as string).trim().length < 5) {
      newErrors.contact = "Укажите контакт (email, телефон или Telegram)";
    }
    if (!data.gdprConsent) {
      newErrors.gdprConsent = "Согласитесь с политикой конфиденциальности";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormState("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormState("success");
        (e.target as HTMLFormElement).reset();
        setHoneypot("");
        onSuccess?.();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Pre-filled service + tariff badge */}
      {(initialService || initialTariff) && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
          {initialService && (
            <div className="font-medium text-foreground">{initialService}</div>
          )}
          {initialTariff && (
            <div className="mt-0.5 text-muted-foreground">
              Тариф: <span className="font-medium text-foreground">{initialTariff}</span>
            </div>
          )}
        </div>
      )}

      {/* Hidden service & tariff fields */}
      <input type="hidden" name="service" value={initialService ?? ""} />
      <input type="hidden" name="tariff" value={initialTariff ?? ""} />

      {/* Name */}
      <div className="space-y-1.5">
        <label htmlFor="cf-name" className="block text-sm font-medium">
          Ваше имя *
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          placeholder="Иван Иванов"
          className="w-full rounded-lg border border-border/70 bg-background px-4 py-2 text-sm transition placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
        />
        {errors.name && (
          <div id="cf-name-error" className="flex items-center gap-1.5 text-sm text-destructive">
            <AlertCircle className="h-3.5 w-3.5" />
            {errors.name}
          </div>
        )}
      </div>

      {/* Contact */}
      <div className="space-y-1.5">
        <label htmlFor="cf-contact" className="block text-sm font-medium">
          Контакт (email, телефон или Telegram) *
        </label>
        <input
          id="cf-contact"
          name="contact"
          type="text"
          required
          placeholder="+7 999 123 45 67 или @username"
          className="w-full rounded-lg border border-border/70 bg-background px-4 py-2 text-sm transition placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? "cf-contact-error" : undefined}
        />
        {errors.contact && (
          <div id="cf-contact-error" className="flex items-center gap-1.5 text-sm text-destructive">
            <AlertCircle className="h-3.5 w-3.5" />
            {errors.contact}
          </div>
        )}
      </div>

      {/* Note */}
      <div className="space-y-1.5">
        <label htmlFor="cf-note" className="block text-sm font-medium">
          Дополнительная информация
        </label>
        <textarea
          id="cf-note"
          name="note"
          placeholder="Уточните детали, если нужно"
          rows={3}
          className="w-full rounded-lg border border-border/70 bg-background px-4 py-2 text-sm transition placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
      </div>

      {/* GDPR */}
      <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-muted/30 p-3">
        <input
          id="cf-gdpr"
          name="gdprConsent"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 cursor-pointer"
          aria-invalid={!!errors.gdprConsent}
          aria-describedby={errors.gdprConsent ? "cf-gdpr-error" : undefined}
        />
        <label htmlFor="cf-gdpr" className="text-xs text-muted-foreground leading-relaxed">
          Согласен с{" "}
          <a href="/legal/privacy" className="font-medium text-primary hover:underline">
            политикой конфиденциальности
          </a>{" "}
          и обработкой персональных данных *
        </label>
      </div>
      {errors.gdprConsent && (
        <div id="cf-gdpr-error" className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="h-3.5 w-3.5" />
          {errors.gdprConsent}
        </div>
      )}

      {/* Status */}
      {formState === "success" && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-900 dark:bg-green-900/20 dark:text-green-100">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Спасибо! Скоро свяжемся с вами.
        </div>
      )}
      {formState === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Ошибка отправки. Напишите нам в Telegram напрямую.
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-xl"
        disabled={formState === "loading"}
      >
        {formState === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {formState === "success" ? "✓ Заявка отправлена" : "Отправить заявку"}
      </Button>
    </form>
  );
}

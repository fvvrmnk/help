import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export interface ContactFormProps {
  onSuccess?: () => void;
  initialService?: string;
}

export function ContactForm({ onSuccess, initialService }: ContactFormProps) {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Honeypot check
    if (honeypot) {
      console.warn("Honeypot field filled");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      contact: formData.get("contact"),
      service: formData.get("service"),
      note: formData.get("note"),
      gdprConsent: formData.get("gdprConsent"),
    };

    // Validate
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
    } catch (error) {
      console.error("Form submission error:", error);
      setFormState("error");
    }

    setTimeout(() => {
      if (formState === "success") setFormState("idle");
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Name field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Ваше имя *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Иван Иванов"
          className="w-full rounded-lg border border-border/70 bg-background px-4 py-2 text-sm transition placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <div id="name-error" className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {errors.name}
          </div>
        )}
      </div>

      {/* Contact field */}
      <div className="space-y-2">
        <label htmlFor="contact" className="block text-sm font-medium">
          Контакт (email, телефон или Telegram) *
        </label>
        <input
          id="contact"
          name="contact"
          type="text"
          required
          placeholder="+7 999 123 45 67 или your@email.com или @username"
          className="w-full rounded-lg border border-border/70 bg-background px-4 py-2 text-sm transition placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? "contact-error" : undefined}
        />
        {errors.contact && (
          <div id="contact-error" className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {errors.contact}
          </div>
        )}
      </div>

      {/* Service field */}
      <div className="space-y-2">
        <label htmlFor="service" className="block text-sm font-medium">
          Интересующая услуга
        </label>
        <input
          id="service"
          name="service"
          type="text"
          defaultValue={initialService}
          placeholder="Например: Свидетельство о рождении"
          className="w-full rounded-lg border border-border/70 bg-background px-4 py-2 text-sm transition placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
      </div>

      {/* Note field */}
      <div className="space-y-2">
        <label htmlFor="note" className="block text-sm font-medium">
          Дополнительная информация
        </label>
        <textarea
          id="note"
          name="note"
          placeholder="Уточните детали, если нужно"
          rows={3}
          className="w-full rounded-lg border border-border/70 bg-background px-4 py-2 text-sm transition placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
      </div>

      {/* GDPR Consent */}
      <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-muted/30 p-4">
        <input
          id="gdprConsent"
          name="gdprConsent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 cursor-pointer rounded border-border/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-invalid={!!errors.gdprConsent}
          aria-describedby={errors.gdprConsent ? "gdpr-error" : undefined}
        />
        <label htmlFor="gdprConsent" className="text-sm text-muted-foreground">
          Согласен с{" "}
          <a href="/legal/privacy" className="font-medium text-primary hover:underline">
            политикой конфиденциальности
          </a>
          {" "}и обработкой персональных данных *
        </label>
      </div>
      {errors.gdprConsent && (
        <div id="gdpr-error" className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {errors.gdprConsent}
        </div>
      )}

      {/* Status messages */}
      {formState === "success" && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-sm text-green-900 dark:bg-green-900/20 dark:text-green-100">
          <CheckCircle2 className="h-4 w-4" />
          Спасибо! Скоро вам ответим в Telegram или на указанный контакт.
        </div>
      )}

      {formState === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          Ошибка отправки. Свяжитесь с нами напрямую в Telegram.
        </div>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-xl"
        disabled={formState === "loading"}
        aria-label="Отправить заявку"
      >
        {formState === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {formState === "success" ? "✓ Заявка отправлена" : "Оставить заявку"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Также вы можете написать нам прямо в Telegram или WhatsApp
      </p>
    </form>
  );
}

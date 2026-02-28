import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";

export interface ContactFormDialogProps {
  initialService?: string;
  triggerClassName?: string;
}

export function ContactFormDialog({
  initialService,
  triggerClassName,
}: ContactFormDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className={triggerClassName || "rounded-2xl"}
          aria-label="Открыть форму заявки"
        >
          Оставьте заявку
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle>Оставьте заявку</DialogTitle>
          <DialogDescription>
            Расскажите о нужной услуге, и мы свяжемся с вами в Telegram
          </DialogDescription>
        </DialogHeader>

        <ContactForm
          initialService={initialService}
          onSuccess={() => {
            setTimeout(() => setOpen(false), 2000);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

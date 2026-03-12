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
  initialTariff?: string;
  triggerClassName?: string;
  /** When provided, the dialog is controlled externally */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ContactFormDialog({
  initialService,
  initialTariff,
  triggerClassName,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: ContactFormDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? (controlledOnOpenChange ?? (() => {})) : setInternalOpen;

  const dialogTitle = initialTariff
    ? `Заявка — тариф «${initialTariff}»`
    : "Оставьте заявку";

  const dialogDescription = initialService
    ? `Услуга: ${initialService}`
    : "Расскажите о нужной услуге, и мы свяжемся с вами";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button
            size="lg"
            className={triggerClassName || "rounded-2xl"}
            aria-label="Открыть форму заявки"
          >
            Оставьте заявку
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <ContactForm
          initialService={initialService}
          initialTariff={initialTariff}
          onSuccess={() => {
            setTimeout(() => setOpen(false), 2000);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

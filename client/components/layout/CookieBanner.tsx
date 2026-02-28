import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

type ConsentValue =
  | { mode: "accepted" }
  | { mode: "rejected" }
  | { mode: "custom"; analytics: boolean; marketing: boolean };

const STORAGE_KEY = "docshelp_cookie_consent";

function readConsent(): ConsentValue | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentValue;
    if (!parsed || typeof parsed !== "object" || !("mode" in parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(value: ConsentValue) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) setVisible(true);
  }, []);

  const canClose = useMemo(() => visible, [visible]);

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-5 left-5 z-50 w-[min(560px,calc(100vw-2.5rem))] rounded-2xl border border-border/70 bg-background p-5 shadow-lg">
        <div className="text-sm font-semibold">Мы используем cookies</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Cookies помогают улучшать сайт и измерять эффективность. Вы можете
          принять все cookies, отклонить необязательные или настроить выбор.
          Обязательные cookies нужны для базовой работы сайта.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            className="rounded-xl"
            onClick={() => {
              writeConsent({ mode: "accepted" });
              setVisible(false);
            }}
          >
            Принять
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => {
              writeConsent({ mode: "rejected" });
              setVisible(false);
            }}
          >
            Отклонить
          </Button>
          <Button
            variant="secondary"
            className="rounded-xl"
            onClick={() => {
              setCustomOpen(true);
            }}
          >
            Настроить
          </Button>
        </div>
      </div>

      <AlertDialog open={customOpen} onOpenChange={setCustomOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Настройки cookies</AlertDialogTitle>
            <AlertDialogDescription>
              Выберите категории cookies. Обязательные cookies всегда включены.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="mt-2 space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/20 p-4">
              <Checkbox checked disabled aria-label="Обязательные cookies" />
              <div>
                <div className="text-sm font-semibold">Обязательные</div>
                <div className="text-sm text-muted-foreground">
                  Нужны для корректной работы сайта и безопасности.
                </div>
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => setAnalytics((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setAnalytics((v) => !v);
              }}
              className="flex w-full cursor-pointer items-start gap-3 rounded-xl border border-border/70 bg-background p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Checkbox checked={analytics} aria-label="Аналитические cookies" />
              <div>
                <div className="text-sm font-semibold">Аналитика</div>
                <div className="text-sm text-muted-foreground">
                  Помогают понять, как используется сайт, чтобы улучшать UX.
                </div>
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => setMarketing((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setMarketing((v) => !v);
              }}
              className="flex w-full cursor-pointer items-start gap-3 rounded-xl border border-border/70 bg-background p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Checkbox checked={marketing} aria-label="Маркетинговые cookies" />
              <div>
                <div className="text-sm font-semibold">Маркетинг</div>
                <div className="text-sm text-muted-foreground">
                  Нужны для измерения эффективности рекламы и конверсий.
                </div>
              </div>
            </div>
          </div>

          <AlertDialogFooter className="mt-4">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setCustomOpen(false)}
              disabled={!canClose}
            >
              Отмена
            </Button>
            <Button
              className="rounded-xl"
              onClick={() => {
                writeConsent({ mode: "custom", analytics, marketing });
                setCustomOpen(false);
                setVisible(false);
              }}
            >
              Сохранить
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

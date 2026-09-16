"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { secretMenu } from "@/data/menu";

type SecretContext = {
  taps: number;
  register: () => void;
  open: boolean;
  close: () => void;
  unlocked: boolean;
};

const Ctx = createContext<SecretContext | null>(null);

const TAPS_REQUIRED = 5;
const TAP_WINDOW_MS = 2500;
const STORAGE_KEY = "bk-fourth-course";

export function SecretProvider({ children }: { children: ReactNode }) {
  const [taps, setTaps] = useState(0);
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
  }, []);

  const register = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setTaps((prev) => {
      const next = prev + 1;
      if (next >= TAPS_REQUIRED) {
        setOpen(true);
        setUnlocked(true);
        localStorage.setItem(STORAGE_KEY, "1");
        return 0;
      }
      return next;
    });
    timer.current = setTimeout(() => setTaps(0), TAP_WINDOW_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ taps, register, open, close, unlocked }),
    [taps, register, open, close, unlocked],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <SecretSheet />
    </Ctx.Provider>
  );
}

export function useSecret() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSecret must be used inside SecretProvider");
  return ctx;
}

function SecretSheet() {
  const ctx = useContext(Ctx);
  const open = ctx?.open ?? false;
  const close = ctx?.close;

  useEffect(() => {
    if (!open || !close) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && close ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            aria-label="Close the fourth course"
            onClick={close}
            className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={secretMenu.headline}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[88svh] w-full max-w-lg overflow-y-auto border border-brass/35 bg-oxblood-deep px-6 py-9 shadow-2xl sm:px-9"
          >
            <p className="tracking-menu text-center text-[0.55rem] uppercase text-brass">
              Off Menu
            </p>
            <h2 className="mt-3 text-center font-display text-3xl italic text-bone sm:text-4xl">
              {secretMenu.headline}
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-center text-xs leading-relaxed text-bone-dim">
              {secretMenu.lede}
            </p>

            <div className="my-7 border border-dashed border-brass/45 px-4 py-4 text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-bone-dim">
                Tonight&apos;s code word
              </p>
              <p className="mt-2 font-display text-2xl tracking-[0.12em] text-brass">
                {secretMenu.codeWord}
              </p>
              <p className="mt-2 text-[0.68rem] text-bone-dim">
                Scream this word out loud asap!
              </p>
            </div>

            <ul className="space-y-6">
              {secretMenu.items.map((item) => (
                <li key={item.name}>
                  <h3 className="font-display text-lg text-bone">{item.name}</h3>
                  <p className="mt-1 text-[0.72rem] lowercase tracking-wide text-bone-dim">
                    {item.ingredients.join(" · ")}
                  </p>
                  <p className="mt-2 text-[0.78rem] italic leading-relaxed text-brass-dim">
                    {item.aside}
                  </p>
                </li>
              ))}
            </ul>

            <button
              onClick={close}
              className="tracking-menu mt-9 w-full border border-brass/40 py-3 text-[0.58rem] uppercase text-brass transition-colors hover:bg-brass hover:text-ink"
            >
              Back to the printed menu
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cuts, doneness, type Cut } from "@/data/menu";

const STORAGE_KEY = "bk-order";

type Order = { cut: Cut | null; done: string | null; guest: string };

const empty: Order = { cut: null, done: null, guest: "" };

export function OrderPicker() {
  const [order, setOrder] = useState<Order>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const guestParam = new URLSearchParams(window.location.search).get("guest");
    const guest = guestParam
      ? guestParam.replace(/[^\p{L}\p{M}\s'-]/gu, "").trim().slice(0, 24)
      : "";

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved: Partial<Order> = raw ? JSON.parse(raw) : {};
      setOrder({
        cut: cuts.some((c) => c.id === saved.cut) ? (saved.cut as Cut) : null,
        done: doneness.some((d) => d.id === saved.done) ? saved.done! : null,
        guest: guest || (typeof saved.guest === "string" ? saved.guest.slice(0, 24) : ""),
      });
    } catch {
      setOrder({ ...empty, guest });
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  }, [order, ready]);

  const isFish = order.cut === "salmon";
  const chosenCut = cuts.find((c) => c.id === order.cut);
  const chosenDone = doneness.find((d) => d.id === order.done);
  const complete = Boolean(chosenCut && (isFish || chosenDone));

  return (
    <section
      id="order"
      className="scroll-mt-16 border-t border-bone/10 bg-ink-soft/60 px-6 py-16"
    >
      <div className="mx-auto w-full max-w-2xl">
        <div className="text-center">
          <p className="tracking-menu text-[0.55rem] uppercase text-brass">
            Place Your Order
          </p>
          <h2 className="mt-4 font-display text-3xl italic sm:text-4xl">
            The Ticket
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.8rem] leading-relaxed text-bone-dim">
            Saved to your phone, not to a server. Ben still has to be told out
            loud. This is decorative accountability.
          </p>
        </div>

        <div className="mt-11">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.26em] text-bone/40">
            01 · The cut
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {cuts.map((c) => {
              const active = order.cut === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() =>
                    setOrder((o) => ({
                      ...o,
                      cut: c.id,
                      done: c.id === "salmon" ? null : o.done,
                    }))
                  }
                  aria-pressed={active}
                  className={`border px-4 py-4 text-left transition-colors ${
                    active
                      ? "border-brass bg-brass/10"
                      : "border-bone/15 hover:border-brass/50"
                  }`}
                >
                  <span className="block font-display text-base text-bone">
                    {c.name}
                  </span>
                  <span className="mt-1 block text-[0.68rem] leading-snug text-bone-dim">
                    {c.blurb}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {order.cut && !isFish ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-10">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.26em] text-bone/40">
                  02 · The doneness
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-5">
                  {doneness.map((d) => {
                    const active = order.done === d.id;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setOrder((o) => ({ ...o, done: d.id }))}
                        aria-pressed={active}
                        className={`border px-3 py-3 text-center transition-colors ${
                          active
                            ? "border-brass bg-brass/10 text-bone"
                            : "border-bone/15 text-bone-dim hover:border-brass/50"
                        }`}
                      >
                        <span className="block text-[0.7rem] leading-tight">
                          {d.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {chosenDone ? (
                  <p className="mt-4 text-[0.78rem] italic text-brass-dim">
                    {chosenDone.blurb}
                  </p>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-10">
          <label
            htmlFor="bk-guest"
            className="font-mono text-[0.55rem] uppercase tracking-[0.26em] text-bone/40"
          >
            03 · Whose ticket is this
          </label>
          <input
            id="bk-guest"
            value={order.guest}
            onChange={(e) =>
              setOrder((o) => ({ ...o, guest: e.target.value.slice(0, 24) }))
            }
            placeholder="Your name"
            autoComplete="off"
            className="mt-3 w-full border border-bone/15 bg-transparent px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/25 focus:border-brass"
          />
        </div>

        <AnimatePresence initial={false}>
          {complete ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-11 border border-brass/40 bg-bone px-5 py-6 text-ink"
            >
              <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.28em] text-oxblood">
                BK on Hudson · Kitchen Copy
              </p>
              <p className="mt-4 text-center font-display text-2xl leading-snug">
                Fire one {chosenCut!.name.toLowerCase()}
                {isFish ? "" : `, ${chosenDone!.name.toLowerCase()}`}.
              </p>
              <p className="mt-2 text-center font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink/60">
                {order.guest ? order.guest : "Guest unnamed"} · Table 1 · 6:00 PM
              </p>
              <div className="mx-auto mt-5 h-px w-24 bg-ink/20" />
              <p className="mt-4 text-center text-[0.7rem] italic text-ink/55">
                {isFish
                  ? "Skin crisped. Butter melted on arrival. No further questions."
                  : "Rested eight minutes. Non-negotiable."}
              </p>
              <button
                onClick={() => setOrder((o) => ({ ...o, cut: null, done: null }))}
                className="mx-auto mt-6 block font-mono text-[0.55rem] uppercase tracking-[0.22em] text-ink/45 underline decoration-dotted underline-offset-4 hover:text-oxblood"
              >
                Change my mind
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

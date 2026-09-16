"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { event } from "@/data/menu";
import { Skyline } from "./Skyline";
import { MaskedWords } from "./Reveal";
import { useSecret } from "./SecretMenu";

export function Hero() {
  const { register, taps } = useSecret();
  const [guest, setGuest] = useState<string | null>(null);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("guest");
    if (!raw) return;
    const clean = raw.replace(/[^\p{L}\p{M}\s'-]/gu, "").trim().slice(0, 24);
    if (clean) setGuest(clean);
  }, []);

  return (
    <header className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-24">
      <Skyline />

      <div className="relative z-10 w-full max-w-2xl text-center [text-shadow:0_2px_24px_rgba(6,6,10,0.75)]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="tracking-menu text-[0.6rem] uppercase text-brass sm:text-[0.68rem]"
        >
          {event.tagline}
        </motion.p>

        <button
          type="button"
          onClick={register}
          aria-label="BK on Hudson"
          className="mt-5 block w-full cursor-default select-none bg-transparent"
        >
          <h1 className="font-display text-[3.4rem] leading-[0.92] tracking-tight sm:text-[5.2rem]">
            <MaskedWords
              text="BK on"
              className="block"
              wordClassName="text-bone"
              delay={0.25}
            />
            <MaskedWords
              text="Hudson"
              className="block italic"
              wordClassName="brass-shimmer"
              delay={0.45}
            />
          </h1>
        </button>

        {taps > 1 && taps < 5 ? (
          <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-brass-dim">
            {5 - taps} more
          </p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <div className="hairline mx-auto h-px w-40" />
          <p className="mt-6 text-sm text-bone-dim sm:text-base">
            {guest ? (
              <>
                <span className="text-bone">{guest}</span>, your table is ready.
              </>
            ) : (
              <>A three-course steakhouse experience.</>
            )}
          </p>
          <dl className="mt-7 grid grid-cols-1 gap-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-bone-dim sm:text-[0.68rem]">
            <div>{event.dateLine} · {event.timeLine}</div>
            <div>{event.address}</div>
            <div className="text-brass-dim">{event.view}</div>
          </dl>
        </motion.div>

        <motion.a
          href="#first"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="tracking-menu mt-12 inline-block text-[0.58rem] uppercase text-brass transition-colors hover:text-bone"
        >
          The Menu ↓
        </motion.a>
      </div>
    </header>
  );
}

"use client";

import { event, houseRules } from "@/data/menu";
import { Reveal } from "./Reveal";
import { useSecret } from "./SecretMenu";

export function Footer() {
  const { unlocked } = useSecret();

  return (
    <footer className="border-t border-bone/10 bg-oxblood-deep/40 px-6 py-16">
      <div className="mx-auto w-full max-w-2xl">
        <Reveal>
          <p className="tracking-menu text-center text-[0.55rem] uppercase text-brass">
            House Rules
          </p>
          <ol className="mx-auto mt-6 max-w-md space-y-3">
            {houseRules.map((rule, i) => (
              <li
                key={rule}
                className="flex gap-3 text-[0.78rem] leading-relaxed text-bone-dim"
              >
                <span className="font-mono text-[0.62rem] text-brass-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="hairline mx-auto mt-14 h-px w-32" />

        <div className="mt-10 text-center">
          <p className="font-display text-xl italic text-brass">
            {event.brand}
          </p>
          <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.24em] text-bone/35">
            {event.address}
          </p>
          <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.24em] text-bone/35">
            {event.proprietors}
          </p>
          <p className="mt-6 text-[0.68rem] italic text-bone/25">
            {unlocked
              ? "You found the Secret Menu!"
              : "Nothing else on this page. Definitely nothing hidden in the sign."}
          </p>
        </div>
      </div>
    </footer>
  );
}

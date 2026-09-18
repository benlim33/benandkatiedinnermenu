import type { Metadata } from "next";
import { QrCode } from "@/components/QrCode";
import { event } from "@/data/menu";

export const metadata: Metadata = {
  title: "BK on Hudson · Table Card",
  robots: { index: false, follow: false },
};

const SITE_URL = "https://benlim33.github.io/benandkatiedinnermenu/";

export default function CardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink p-6 print:bg-white print:p-0">
      <div className="flex aspect-[4/6] w-full max-w-sm flex-col items-center justify-center border border-brass/40 bg-bone px-8 py-10 text-center text-ink print:border-none print:shadow-none">
        <p className="tracking-menu text-[0.5rem] uppercase text-oxblood">
          {event.tagline}
        </p>
        <h1 className="mt-3 font-display text-4xl italic">{event.brand}</h1>
        <div className="mt-2 h-px w-20 bg-ink/25" />
        <p className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ink/60">
          {event.dateLine} · {event.timeLine}
        </p>

        <div className="mt-7 border border-ink/15 bg-white p-3">
          <QrCode url={SITE_URL} size={148} />
        </div>

        <p className="mt-6 font-display text-base italic">Scan for the menu</p>
        <p className="mt-1 max-w-[16rem] text-[0.62rem] leading-relaxed text-ink/55">
          Three courses. One skyline. Try tapping the restaurnt name...
        </p>
        <p className="mt-6 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-ink/40">
          {event.address}
        </p>
      </div>
    </main>
  );
}

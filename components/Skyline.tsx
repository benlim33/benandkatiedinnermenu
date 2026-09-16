"use client";

import { useEffect, useMemo, useState } from "react";
import { phaseForHour, phaseLabel, skyPalettes, type SkyPhase } from "@/lib/sky";

type Building = {
  x: number;
  w: number;
  h: number;
  spire?: number;
  crown?: "antenna" | "deco";
};

// Loose Midtown-to-Downtown silhouette as seen from the Jersey City waterfront.
const buildings: Building[] = [
  { x: 0, w: 34, h: 58 },
  { x: 36, w: 22, h: 84 },
  { x: 60, w: 30, h: 46 },
  { x: 92, w: 26, h: 104 },
  { x: 120, w: 18, h: 72 },
  { x: 140, w: 32, h: 132, spire: 40, crown: "deco" }, // Empire State
  { x: 174, w: 20, h: 66 },
  { x: 196, w: 28, h: 96 },
  { x: 226, w: 24, h: 118, spire: 34, crown: "deco" }, // Chrysler
  { x: 252, w: 34, h: 54 },
  { x: 288, w: 22, h: 88 },
  { x: 312, w: 30, h: 62 },
  { x: 344, w: 26, h: 108 },
  { x: 372, w: 20, h: 74 },
  { x: 394, w: 30, h: 150, spire: 52, crown: "antenna" }, // One WTC
  { x: 426, w: 24, h: 82 },
  { x: 452, w: 34, h: 60 },
  { x: 488, w: 22, h: 92 },
  { x: 512, w: 28, h: 48 },
];

const BASE = 200;
const TALLEST = 202;

function windows(b: Building, seed: number) {
  const cells: { x: number; y: number; lit: number }[] = [];
  const cw = 3;
  const ch = 4;
  const gapX = 3;
  const gapY = 4;
  const cols = Math.max(1, Math.floor((b.w - 4) / (cw + gapX)));
  const rows = Math.max(1, Math.floor((b.h - 8) / (ch + gapY)));
  let n = seed;
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      // Deterministic pseudo-random so server and client markup match.
      n = (n * 1103515245 + 12345) % 2147483648;
      const lit = n / 2147483648 > 0.42 ? 1 : 0.16;
      cells.push({
        x: b.x + 3 + c * (cw + gapX),
        y: BASE - b.h + 6 + r * (ch + gapY),
        lit,
      });
    }
  }
  return { cells, cw, ch };
}

export function Skyline() {
  const [phase, setPhase] = useState<SkyPhase>("dusk");

  useEffect(() => {
    const override = new URLSearchParams(window.location.search).get("sky");
    const valid = ["dawn", "day", "dusk", "night"];
    const next =
      override && valid.includes(override)
        ? (override as SkyPhase)
        : phaseForHour(new Date().getHours());
    setPhase(next);
  }, []);

  const p = skyPalettes[phase];

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--sky-top", p.top);
    root.setProperty("--sky-mid", p.mid);
    root.setProperty("--sky-low", p.low);
    root.setProperty("--sky-glow", p.glow);
    root.setProperty("--window-opacity", String(p.windowOpacity));
    root.setProperty("--star-opacity", String(p.starOpacity));
  }, [p]);

  const stars = useMemo(() => {
    let n = 7919;
    return Array.from({ length: 60 }, () => {
      n = (n * 1103515245 + 12345) % 2147483648;
      const a = n / 2147483648;
      n = (n * 1103515245 + 12345) % 2147483648;
      const b = n / 2147483648;
      n = (n * 1103515245 + 12345) % 2147483648;
      const c = n / 2147483648;
      return { x: a * 100, y: b * 100, r: 0.6 + c * 0.9, d: c * 4 };
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 transition-[background] duration-1000"
        style={{
          background:
            "linear-gradient(to bottom, var(--sky-top) 0%, var(--sky-mid) 46%, var(--sky-low) 78%, var(--sky-low) 100%)",
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-[70%]"
        style={{ opacity: "var(--star-opacity)" }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          {stars.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r * 0.12}
              fill="#fff"
              style={{ animation: `bk-twinkle ${3 + s.d}s ease-in-out ${s.d}s infinite` }}
            />
          ))}
        </svg>
      </div>

      {/* Sun / city glow sitting just above the horizon line. */}
      <div
        className="absolute inset-x-0 bottom-[26%] h-[40%] opacity-55"
        style={{
          background:
            "radial-gradient(ellipse 55% 100% at 42% 100%, var(--sky-glow) 0%, transparent 70%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-[42svh] max-h-[400px] min-h-[220px]">
        <svg
          viewBox={`0 0 540 ${TALLEST + 60}`}
          preserveAspectRatio="xMidYMax slice"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="bk-tower" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b0d16" />
              <stop offset="100%" stopColor="#05060c" />
            </linearGradient>
            <linearGradient id="bk-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--sky-low)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0e0e10" stopOpacity="1" />
            </linearGradient>
            <clipPath id="bk-reflect">
              <rect x="0" y={BASE} width="540" height="62" />
            </clipPath>
          </defs>

          <g transform={`translate(0, ${TALLEST - BASE})`}>
            {buildings.map((b, i) => {
              const { cells, cw, ch } = windows(b, 1000 + i * 37);
              return (
                <g key={i}>
                  <rect x={b.x} y={BASE - b.h} width={b.w} height={b.h} fill="url(#bk-tower)" />
                  {b.spire ? (
                    <>
                      {b.crown === "deco" ? (
                        <polygon
                          points={`${b.x + b.w / 2 - 5},${BASE - b.h} ${b.x + b.w / 2},${
                            BASE - b.h - b.spire
                          } ${b.x + b.w / 2 + 5},${BASE - b.h}`}
                          fill="#07080f"
                        />
                      ) : (
                        <rect
                          x={b.x + b.w / 2 - 0.8}
                          y={BASE - b.h - b.spire}
                          width={1.6}
                          height={b.spire}
                          fill="#07080f"
                        />
                      )}
                      <circle
                        cx={b.x + b.w / 2}
                        cy={BASE - b.h - b.spire}
                        r="1.6"
                        fill="#ff5d5d"
                        style={{ animation: `bk-twinkle ${2.6 + i * 0.2}s ease-in-out infinite` }}
                      />
                    </>
                  ) : null}
                  <g style={{ opacity: "var(--window-opacity)" }}>
                    {cells.map((c, j) => (
                      <rect
                        key={j}
                        x={c.x}
                        y={c.y}
                        width={cw}
                        height={ch}
                        fill="#ffd98a"
                        opacity={c.lit}
                      />
                    ))}
                  </g>
                </g>
              );
            })}

            <rect x="0" y={BASE} width="540" height="62" fill="url(#bk-water)" />
            <g clipPath="url(#bk-reflect)" opacity="0.14">
              <g transform={`translate(0,${BASE * 2}) scale(1,-1)`}>
                {buildings.map((b, i) => (
                  <rect
                    key={i}
                    x={b.x}
                    y={BASE - b.h}
                    width={b.w}
                    height={b.h}
                    fill="#ffd98a"
                  />
                ))}
              </g>
            </g>
            {Array.from({ length: 8 }).map((_, i) => (
              <rect
                key={i}
                x={0}
                y={BASE + 4 + i * 7}
                width={540}
                height={1}
                fill="var(--sky-glow)"
                opacity={0.07}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Scrim so menu type stays readable over any sky phase. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_50%_at_50%_46%,rgba(10,10,14,0.88),transparent_72%)]" />
      <div className="absolute inset-0 bg-ink/25" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent via-ink/55 to-ink" />

      <span className="sr-only">{phaseLabel[phase]}</span>
    </div>
  );
}

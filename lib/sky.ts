export type SkyPhase = "dawn" | "day" | "dusk" | "night";

type SkyPalette = {
  top: string;
  mid: string;
  low: string;
  glow: string;
  windowOpacity: number;
  starOpacity: number;
};

export const skyPalettes: Record<SkyPhase, SkyPalette> = {
  dawn: {
    top: "#24314f",
    mid: "#7b5570",
    low: "#e0906a",
    glow: "#ffd9a0",
    windowOpacity: 0.35,
    starOpacity: 0.12,
  },
  day: {
    top: "#3d6ea8",
    mid: "#7fa8cc",
    low: "#cfdfe9",
    glow: "#ffffff",
    windowOpacity: 0.1,
    starOpacity: 0,
  },
  dusk: {
    top: "#1b2340",
    mid: "#6b3352",
    low: "#c96a3f",
    glow: "#f2a65a",
    windowOpacity: 0.85,
    starOpacity: 0.45,
  },
  night: {
    top: "#070a18",
    mid: "#121a33",
    low: "#2a2440",
    glow: "#8fa6d6",
    windowOpacity: 1,
    starOpacity: 1,
  },
};

export function phaseForHour(hour: number): SkyPhase {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "dusk";
  return "night";
}

export const phaseLabel: Record<SkyPhase, string> = {
  dawn: "Sunrise over Manhattan",
  day: "Midday across the water",
  dusk: "Golden hour — the good seats",
  night: "The city is fully lit",
};

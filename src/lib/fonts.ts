import type { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Orbitron, Poppins } from "next/font/google";

export const poppins: NextFontWithVariable = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
  variable: "--poppins",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const orbitron: NextFontWithVariable = Orbitron({
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  variable: "--orbitron",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

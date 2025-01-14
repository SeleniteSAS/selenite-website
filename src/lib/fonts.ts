import type { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Martian_Mono, Poppins } from "next/font/google";

export const poppins: NextFontWithVariable = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
  variable: "--poppins",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const martian: NextFontWithVariable = Martian_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--martian",
  fallback: ["Courier New", "Courier", "monospace"],
});

import type { Color } from "@/types/color";

export type Variant =
  | { name: string; mainColor: Color; secondaryColor: Color; contrastColor: Color }
  | { name: string; color: Color; contrastColor: Color };

const variants: Variant[] = [
  {
    name: "Alien Red",
    mainColor: "#A4191F",
    secondaryColor: "#171717",
    contrastColor: "#FFFFFF",
  },
  {
    name: "Dark",
    color: "#000000",
    contrastColor: "#FFFFFF",
  },
  {
    name: "Light",
    color: "#F8F7F5",
    contrastColor: "#000000",
  },
  {
    name: "Human Blue",
    mainColor: "#009898",
    secondaryColor: "#F8F7F5",
    contrastColor: "#000000",
  },
];

export default variants;

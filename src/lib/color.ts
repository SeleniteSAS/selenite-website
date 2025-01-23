function parseHexColor(hexColor: string): { r: number; g: number; b: number } {
  if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hexColor)) {
    throw new Error("La couleur doit être un code hexadécimal valide (#RGB ou #RRGGBB).");
  }

  if (hexColor.length === 4) {
    hexColor = `#${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}${hexColor[3]}${hexColor[3]}`;
  }

  const r: number = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g: number = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b: number = parseInt(hexColor.slice(5, 7), 16) / 255;

  return { r, g, b };
}

export function getContrasted(hexColor: string): "black" | "white" {
  const { r, g, b } = parseHexColor(hexColor);

  const luminance = (channel: number): number =>
    channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  const relativeLuminance: number = 0.2126 * luminance(r) + 0.7152 * luminance(g) + 0.0722 * luminance(b);

  return relativeLuminance > 0.179 ? "black" : "white";
}

export function getRGB(hexColor: string): string {
  const { r, g, b } = parseHexColor(hexColor);
  return `RGB ${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)}`;
}

export function getHSL(hexColor: string): string {
  const { r, g, b } = parseHexColor(hexColor);

  const min: number = Math.min(r, g, b);
  const max: number = Math.max(r, g, b);
  const delta: number = max - min;

  let h: number = 0;
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  let s: number = 0;
  if (max !== 0) {
    s = delta / max;
  }

  const l: number = (min + max) / 2;

  return `HSL ${h} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function getCMYK(hexColor: string): string {
  const { r, g, b } = parseHexColor(hexColor);

  const k: number = 1 - Math.max(r, g, b);

  let c: number = (1 - r - k) / (1 - k) || 0;
  let m: number = (1 - g - k) / (1 - k) || 0;
  let y: number = (1 - b - k) / (1 - k) || 0;

  c = Math.round(c * 100);
  m = Math.round(m * 100);
  y = Math.round(y * 100);
  const n: number = Math.round(k * 100);

  return `CMYK ${c} ${m} ${y} ${n}`;
}

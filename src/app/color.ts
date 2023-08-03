const getAvgHex = (color: number, total: number) =>
  Math.round(color / total)
    .toString(16)
    .padStart(2);

export const getEmojiMajorColor = (canvas: HTMLCanvasElement, emoji: string) => {
  let totalPixels = 0;
  const colors = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
  };

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  ctx.font = '30px Arial';
  ctx.fillText(emoji, 0, 28);
  const { data: imageData } = ctx.getImageData(0, 0, 30, 30);
  for (let i = 0; i < imageData.length; i += 4) {
    let rgba = imageData.slice(i, i + 4);
    if (rgba[3] > 50) {
      totalPixels += 1;
      colors.red += rgba[0];
      colors.green += rgba[1];
      colors.blue += rgba[2];
      colors.alpha += rgba[3];
    }
  }
  const r = getAvgHex(colors.red, totalPixels);
  const g = getAvgHex(colors.green, totalPixels);
  const b = getAvgHex(colors.blue, totalPixels);

  return '#' + r + g + b;
};

export function averageColorWithPastelAndHueChange(hexColor: string): string | null {
  const { r, g, b } = hexToRgb(hexColor);
  const averageR = Math.min(255, Math.floor(r + (255 - r) * 0.2));
  const averageG = Math.min(255, Math.floor(g + (255 - g) * 0.2));
  const averageB = Math.min(255, Math.floor(b + (255 - b) * 0.2));

  const hsl = rgbToHsl(averageR, averageG, averageB);
  hsl.s = 0.8;

  const updatedRGB = hslToRgb(hsl.h, hsl.s, hsl.l);
  const updatedHexColor = rgbToHex(updatedRGB);

  return updatedHexColor;
}

export function averageColorWithWhiteAndSaturation(hexColor: string): string {
  const { r, g, b } = hexToRgb(hexColor);

  const whiteValue = Math.round(255 * 0.2);

  const averagedR = Math.round((r + whiteValue) / 2);
  const averagedG = Math.round((g + whiteValue) / 2);
  const averagedB = Math.round((b + whiteValue) / 2);

  const hsl = rgbToHsl(averagedR, averagedG, averagedB);

  hsl.s += 0.8;
  hsl.s = Math.max(0, Math.min(1, hsl.s));

  const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  const hex = rgbToHex(rgb);

  return hex;
}

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHex(rgb: { r: number; g: number; b: number }): string {
  const { r, g, b } = rgb;
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function hslToRgb(h: number, s: number, l: number) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, l };
}

const hueToRgb = (p: number, q: number, t: number) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

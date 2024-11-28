import tinycolor from 'tinycolor2';

export const getComplementaryColor = (bgColor: string): string => {
  const color = tinycolor(bgColor);
  const isDark = color.isDark();
  
  if (isDark) {
    return color.lighten(30).toString();
  }
  
  const complement = color.complement();
  return complement.isLight() ? complement.darken(20).toString() : complement.toString();
};

export const DEFAULT_COLORS = [
  '#fff475', // yellow
  '#fbbc04', // orange
  '#f28b82', // red
  '#aecbfa', // blue
  '#ccff90', // green
  '#e6c9a8', // brown
  '#e8eaed', // gray
  '#fdcfe8', // pink
];

export const DEFAULT_TEXT_COLORS = [
  '#000000', // black
  '#1f2937', // dark gray
  '#4b5563', // medium gray
  '#ffffff', // white
  '#1e40af', // dark blue
  '#047857', // dark green
  '#b91c1c', // dark red
  '#6d28d9', // purple
];
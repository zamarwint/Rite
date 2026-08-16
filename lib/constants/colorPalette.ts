export const BRAND_COLORS = {
  VIVID_RED: '#d42710',
  DARK_GREY: '#2f2d32',
  LIGHT_ORANGE: '#f2e0d2',
} as const;

export const COLOR_ROLES = {
  vividRed: {
    hex: '#d42710',
    usage: 'Primary accent, CTA buttons, active states, timer countdown, checkmarks, logo accent',
    cssClass: 'bg-[#d42710] text-[#f2e0d2] hover:bg-[#b81f0b]',
  },
  darkGrey: {
    hex: '#2f2d32',
    usage: 'Primary text, dark section backgrounds, problem agitation, wall of love, footer',
    cssClass: 'bg-[#2f2d32] text-[#f2e0d2]',
  },
  lightOrange: {
    hex: '#f2e0d2',
    usage: 'Primary background, paper-like warm canvas, soft UI elements, secondary text in dark sections',
    cssClass: 'bg-[#f2e0d2] text-[#2f2d32]',
  },
};

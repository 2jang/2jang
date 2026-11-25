// 선으로 그린 24x24 아이콘의 경로. Icon.astro 가 그린다.
export const iconPaths = {
  terminal: '<path d="m4 6 6 6-6 6m9 0h7"/>',
  github:
    '<path fill="currentColor" stroke="none" d="M12 .9A11.1 11.1 0 0 0 8.5 22.5c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.31-3.75-1.31-.5-1.29-1.24-1.63-1.24-1.63-1.02-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.71 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.48-.28-5.08-1.24-5.08-5.5 0-1.22.44-2.22 1.15-3.01-.12-.28-.49-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.99 10.99 0 0 1 5.57 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96a4.29 4.29 0 0 1 1.15 3.01c0 4.27-2.61 5.21-5.1 5.48.4.35.76 1.02.76 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  user: '<circle cx="12" cy="8" r="3.2"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  grid: '<rect x="3.5" y="3.5" width="6" height="6" rx=".8"/><rect x="14.5" y="3.5" width="6" height="6" rx=".8"/><rect x="3.5" y="14.5" width="6" height="6" rx=".8"/><rect x="14.5" y="14.5" width="6" height="6" rx=".8"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  server:
    '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.1M7 17.5h.1m7-11h3m-3 11h3"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  radio:
    '<circle cx="12" cy="12" r="2"/><path d="M7.7 7.7a6 6 0 0 0 0 8.6m8.6-8.6a6 6 0 0 1 0 8.6M4.5 4.5a10.5 10.5 0 0 0 0 15m15-15a10.5 10.5 0 0 1 0 15"/>',
  code: '<path d="m7 6-6 6 6 6m10-12 6 6-6 6m-4-15-2 18"/>',
  box: '<path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm9 5-9 5-9-5m9 5v10M7.5 4.5l9 5"/>',
  'check-square': '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m7.5 12 3 3 6-6"/>',
  award: '<circle cx="12" cy="8" r="5.5"/><path d="m8.5 12.5-2 9 5.5-3 5.5 3-2-9"/>',
  external: '<path d="M7 17 17 7M7 7h10v10"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6.5L20.5 7"/>',
  'arrow-left': '<path d="M20 12H4m7 7-7-7 7-7"/>',
  'chevron-left': '<path d="m14 6-6 6 6 6"/>',
  'chevron-right': '<path d="m10 6 6 6-6 6"/>',
  expand: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
} as const;

export type IconName = keyof typeof iconPaths;

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const VIEWS = ['all', 'important', 'expiring', 'completed'] as const;
export type ViewName = (typeof VIEWS)[number];

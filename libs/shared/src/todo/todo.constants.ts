export const CATEGORIES = [
  'Personal',
  'Work',
  'Shopping',
  'Health',
  'Finance',
  'Education',
  'Home',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const EXPIRING_THRESHOLD_DAYS = 3;

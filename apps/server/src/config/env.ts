const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const optionalEnv = (key: string, fallback: string): string => {
  return process.env[key] ?? fallback;
};

export const env = {
  get NODE_ENV() {
    return optionalEnv('NODE_ENV', 'development');
  },
  get HOST() {
    return optionalEnv('HOST', '0.0.0.0');
  },
  get PORT() {
    return parseInt(optionalEnv('PORT', '3001'), 10);
  },
  get DATABASE_URL() {
    return requiredEnv('DATABASE_URL');
  },
  get CORS_ORIGIN() {
    return optionalEnv('CORS_ORIGIN', 'http://localhost:4200');
  },
  get LOG_LEVEL() {
    return optionalEnv('LOG_LEVEL', 'info');
  },
};

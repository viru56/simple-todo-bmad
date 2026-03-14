import { createRequire } from 'node:module';
import path from 'node:path';
import { env } from '../config/env';

// Resolve from cwd so the transport works when running from Nx build output (no import.meta in CJS)
const requireForResolve = createRequire(path.join(process.cwd(), 'package.json'));

export function getLoggerConfig() {
  const isProduction = env.NODE_ENV === 'production';

  const serializers = {
    req(request: { method: string; url: string }) {
      return { method: request.method, url: request.url };
    },
  };

  if (isProduction) {
    return {
      level: env.LOG_LEVEL,
      serializers,
    };
  }

  let transportTarget: string;
  try {
    transportTarget = requireForResolve.resolve('pino-pretty');
  } catch {
    return { level: env.LOG_LEVEL, serializers };
  }

  return {
    level: env.LOG_LEVEL,
    transport: {
      target: transportTarget,
      options: { translateTime: 'HH:MM:ss Z', ignore: 'pid,hostname' },
    },
    serializers,
  };
}

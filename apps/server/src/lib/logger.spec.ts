import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLoggerConfig } from './logger';

const mockEnv = { NODE_ENV: 'development', LOG_LEVEL: 'info' };
const resolveShouldThrow = { value: false };

vi.mock('../config/env', () => ({
  env: {
    get NODE_ENV() {
      return mockEnv.NODE_ENV;
    },
    get LOG_LEVEL() {
      return mockEnv.LOG_LEVEL;
    },
  },
}));

vi.mock('node:module', () => ({
  createRequire: () => ({
    resolve: () => {
      if (resolveShouldThrow.value) throw new Error('not found');
      return '/fake/pino-pretty';
    },
  }),
}));

describe('getLoggerConfig', () => {
  beforeEach(() => {
    mockEnv.NODE_ENV = 'development';
    mockEnv.LOG_LEVEL = 'info';
    resolveShouldThrow.value = false;
  });

  it('returns level and serializers only when NODE_ENV is production', () => {
    mockEnv.NODE_ENV = 'production';
    const config = getLoggerConfig();
    expect(config).toEqual({
      level: 'info',
      serializers: expect.any(Object),
    });
    expect(config.serializers.req).toBeDefined();
    expect(config.transport).toBeUndefined();
  });

  it('returns config with pino-pretty transport in development when resolve succeeds', () => {
    const config = getLoggerConfig();
    expect(config.level).toBe('info');
    expect(config.serializers).toBeDefined();
    expect(config.transport).toEqual({
      target: '/fake/pino-pretty',
      options: { translateTime: 'HH:MM:ss Z', ignore: 'pid,hostname' },
    });
  });

  it('returns level and serializers only when pino-pretty resolve throws', () => {
    resolveShouldThrow.value = true;
    const config = getLoggerConfig();
    expect(config).toEqual({
      level: 'info',
      serializers: expect.any(Object),
    });
    expect(config.transport).toBeUndefined();
  });

  it('includes req serializer that maps method and url', () => {
    const config = getLoggerConfig();
    const req = config.serializers.req({ method: 'GET', url: '/todos' } as any);
    expect(req).toEqual({ method: 'GET', url: '/todos' });
  });
});

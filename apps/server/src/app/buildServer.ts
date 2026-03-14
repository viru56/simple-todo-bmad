import Fastify from 'fastify';
import { env } from '../config/env';
import { getLoggerConfig } from '../lib/logger';
import { errorHandler } from '../errors/toErrorResponse';
import corsPlugin from '../plugins/cors';
import helmetPlugin from '../plugins/helmet';
import rateLimitPlugin from '../plugins/rateLimit';
import healthRoute from '../routes/health/health.route';
import todosRoute from '../routes/todos/todos.route';

export async function buildServer() {
  const server = Fastify({
    logger: getLoggerConfig(),
  });

  server.setErrorHandler(errorHandler);

  await server.register(corsPlugin);
  await server.register(helmetPlugin);
  await server.register(rateLimitPlugin);

  await server.register(healthRoute);
  await server.register(todosRoute);

  return server;
}

export async function startServer() {
  const server = await buildServer();

  try {
    await server.listen({ port: env.PORT, host: env.HOST });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }

  return server;
}

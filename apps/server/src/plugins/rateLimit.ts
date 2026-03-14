import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify';
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from '../config/constants';

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(rateLimit, {
    max: RATE_LIMIT_MAX,
    timeWindow: RATE_LIMIT_WINDOW_MS,
  });
});

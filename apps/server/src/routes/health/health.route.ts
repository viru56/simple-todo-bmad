import { FastifyInstance } from 'fastify';
import { healthResponseSchema } from './health.schema';

export default async function healthRoute(fastify: FastifyInstance) {
  fastify.get('/health', {
    schema: { response: healthResponseSchema },
    handler: async () => {
      return { status: 'ok' };
    },
  });
}

import { config } from 'dotenv';
import path from 'node:path';

// Load .env from project root when running via tsx (e.g. npm run dev:server)
config({ path: path.join(process.cwd(), '.env') });

import { startServer } from './app/buildServer';
import { disconnectPrisma } from './lib/prisma';

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

const shutdown = async () => {
  await disconnectPrisma();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

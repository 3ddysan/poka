import { URL, fileURLToPath } from 'node:url';
import process from 'node:process';
import { build } from './server/app.js';

const isDev = process.env.NODE_ENV === 'dev';
const SERVER_PORT = Number(process.env.SERVER_PORT || 3000);

const fastify = build(
  {
    trustProxy: true,
    logger: isDev
      ? {
          level: 'info',
          transport: {
            target: 'pino-pretty',
          },
        }
      : true,
  },
  { root: fileURLToPath(new URL('./dist', import.meta.url)) },
);

process.on('SIGINT', async (signal) => {
  await fastify.close();
  process.kill(process.pid, signal);
});

await fastify.listen({
  host: isDev ? 'localhost' : '0.0.0.0',
  port: SERVER_PORT,
});

import { URL, fileURLToPath } from 'node:url';
import { build } from './server/app';

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
  fileURLToPath(new URL('./dist', import.meta.url)),
);

(async () => {
  try {
    await fastify.listen({
      host: isDev ? 'localhost' : '0.0.0.0',
      port: SERVER_PORT,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();

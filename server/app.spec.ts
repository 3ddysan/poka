import { build } from './app';
import { fileURLToPath, URL } from 'node:url';
import type { AddressInfo } from 'node:net';
import type { FastifyInstance } from 'fastify';
import type { Readable } from 'node:stream';

const cwd = fileURLToPath(new URL('__fixtures__', import.meta.url));
const run = () => build(undefined, cwd);
async function toString(readable: Iterable<ReadableStream> | null) {
  if (readable == null) return '';
  let result = '';
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}

describe('Mocks', () => {
  test('should serve unknown path', async () => {
    const app = run();

    const response = await app.inject({
      method: 'GET',
      url: '/unknown',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual('index.html');
  });
});

describe('Server', () => {
  let app: FastifyInstance;

  const listen = async () => {
    const app = run();
    app.server.setTimeout(0);
    app.server.keepAliveTimeout = 0;
    await app.listen();
    return app;
  };

  beforeEach(async () => {
    app = await listen();
  });

  afterEach(() => {
    app.close();
  });

  test('should login', async () => {
    const response = await fetch(
      `http://localhost:${
        (app.server.address() as AddressInfo).port
      }/api/events?name=test`,
    );
    expect(response.headers.get('set-cookie')).toEqual(
      expect.stringContaining('_poka_session_db222de7a9b='),
    );
  });
});

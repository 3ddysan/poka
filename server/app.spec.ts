import { build } from './app';
import { fileURLToPath, URL } from 'node:url';
import type { AddressInfo } from 'node:net';
import type { FastifyInstance } from 'fastify';
import type { ReadableStream } from 'node:stream/web';
import http, { type IncomingMessage } from 'node:http';

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

describe('Mock Server', () => {
  test('should serve unknown path', async () => {
    const app = run();

    const response = await app.inject({
      method: 'GET',
      url: '/unknown',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(expect.stringContaining('index.html'));
  });
});

describe('Real Server', () => {
  let app: FastifyInstance;

  function getBaseUrl(path = '/'): string {
    const address = app.server.address() as AddressInfo;
    return `http://${address.address}:${address.port}${path}`;
  }

  const listen = async () => {
    const app = run();
    await app.listen({ host: '127.0.0.1', port: 0 });
    return app;
  };

  beforeEach(async () => {
    app = await listen();
  });

  afterEach(() => {
    app.close();
  });

  test('should serve /events', async () => {
    const response: IncomingMessage = await new Promise((resolve, reject) => {
      http.get(getBaseUrl('/api/events?name=test'), { timeout: 100 }, (res) => {
        resolve(res);
      });
    });
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([
        expect.stringContaining('_poka_session_db222de7a9b='),
      ]),
    );
  });
});

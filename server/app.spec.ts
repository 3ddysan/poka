import { build, type ServerUser } from './app';
import { fileURLToPath, URL } from 'node:url';
import type { AddressInfo } from 'node:net';
import type { FastifyInstance } from 'fastify';
import http from 'node:http';

const root = fileURLToPath(new URL('__fixtures__', import.meta.url));

const testUsers = new Map<string, ServerUser>();
const TEST_USERNAME = 'test';
const COOKIE_NAME = '_poka_session';
const VOTE = '1';
const run = () => build(undefined, { root, testUsers });

beforeEach(() => {
  testUsers.clear();
});

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

  function login(
    name = TEST_USERNAME,
  ): http.IncomingMessage | PromiseLike<http.IncomingMessage> {
    return new Promise((resolve, reject) => {
      const req = http.get(
        getBaseUrl(`/api/events?name=${name}`),
        { timeout: 100 },
        (res) => {
          resolve(res);
        },
      );
      req.on('error', reject);
    });
  }

  function vote(
    vote: string,
    name = TEST_USERNAME,
  ): http.IncomingMessage | PromiseLike<http.IncomingMessage> {
    const dataEncoded = JSON.stringify({
      vote,
      name,
    });
    const cookie = COOKIE_NAME + '=' + testUsers.get(name)?.token;
    return new Promise((resolve, reject) => {
      const req = http.request(
        getBaseUrl(`/api/vote`),
        {
          timeout: 100,
          method: 'post',
          headers: {
            'Content-Length': Buffer.byteLength(dataEncoded),
            'Content-Type': 'application/json',
            Cookie: cookie,
          },
        },
        (res) => {
          resolve(res);
        },
      );
      req.on('error', reject);
      req.write(dataEncoded);
      req.end();
    });
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
    const response = await login();
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('_poka_session=')]),
    );
    expect(testUsers.has(TEST_USERNAME)).toBeTruthy();
  });

  test('should vote', async () => {
    await login();

    await vote(VOTE);

    expect(testUsers.get(TEST_USERNAME)?.vote).toEqual(VOTE);
    expect(testUsers.get(TEST_USERNAME)?.voted).toBeTruthy();
  });
});

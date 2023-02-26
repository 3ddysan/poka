import Fastify, { fastify, type FastifyRequest } from 'fastify';
import FastifyCors from '@fastify/cors';
import FastifyStatic from '@fastify/static';
import type { ServerResponse } from 'node:http';
import crypto from 'node:crypto';
import type { User, StateEvent, Results } from '@/types';

declare module 'fastify' {
  interface FastifyRequest {
    cookies: { [cookieName: string]: string | undefined };
  }
}

type EventsRequest = {
  Querystring: {
    name: string;
    heartbeat?: number;
    spectate: boolean;
  };
};

export type ServerUser = Omit<User, 'name'> & {
  token: string;
  response: ServerResponse;
};

type AppOptions = { root: string; testUsers?: Map<string, ServerUser> };

const COOKIE_NAME = process.env.COOKIE_NAME || '_poka_session';
const ORIGIN = process.env.ORIGIN || 'localhost';
const getSessionToken = (req: FastifyRequest) => req.cookies[COOKIE_NAME] ?? '';

export const build = (opts = {}, { root, testUsers }: AppOptions) => {
  const fastify = Fastify(opts);
  const users = testUsers || new Map<string, ServerUser>();
  let results: Results = null;

  fastify.addHook(
    'onRequest',
    function fastifyCookieHandler(fastifyReq, fastifyRes, done) {
      fastifyReq.cookies = {};
      const cookieHeader = fastifyReq.raw.headers.cookie;
      if (cookieHeader) {
        cookieHeader
          .split(';')
          .map((str) => str.trim().replace('=', '\u0000').split('\u0000'))
          .forEach(([key, value]) => (fastifyReq.cookies[key] = value));
      }
      done();
    },
  );

  fastify.register(FastifyStatic, {
    root,
  });

  fastify.get('/health', function (req, res) {
    res.code(200).send({ statusCode: 200, status: 'ok' });
  });

  fastify.setNotFoundHandler(function (request, reply) {
    reply.sendFile('index.html');
  });

  fastify.register(FastifyCors, {
    origin: (origin, cb) => {
      if (!origin || ORIGIN === new URL(origin).hostname) {
        cb(null, true);
      } else {
        fastify.log.warn(
          `[security::cors] request origin "${origin}" mismatches with "${ORIGIN}"`,
        );
        cb(new Error('Not allowed'), false);
      }
    },
  });

  function calcResults(): Results {
    const results: Results = {};
    for (const [, { vote, voted }] of users) {
      if (!voted) continue;
      results[vote] = (results[vote] ?? 0) + 1;
    }
    return Object.keys(results).length === 0 ? null : results;
  }

  function send(response: ServerResponse, type: string, msg: string) {
    response.write(`event: ${type}\n`);
    response.write(`data: ${msg}\n\n`);
  }

  function broadcast(type = 'message', data: unknown) {
    const msg = typeof data === 'object' ? JSON.stringify(data) : String(data);
    fastify.log.info(`[broadcast::${type}] ${msg}`);
    users.forEach(({ response }) => {
      send(response, type, msg);
    });
  }

  function broadcastState() {
    const state: StateEvent = {
      users: Array.from(users, ([name, { vote, voted, spectate }]) => ({
        name,
        vote: results === null ? '' : vote,
        voted,
        spectate,
      })),
      results,
    };
    broadcast('state', state);
  }

  const parseBool = (params: unknown) => {
    return !(
      params === 'false' ||
      params === '0' ||
      params === '' ||
      params == undefined
    );
  };

  function setup(req: FastifyRequest<EventsRequest>, response: ServerResponse) {
    const { heartbeat = 3000, name, spectate = false } = req.query;
    const token = crypto.randomUUID();
    response.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
      'X-Accel-Buffering': 'no',
      'x-no-compression': 1,
      'set-cookie': `${COOKIE_NAME}=${token}; Domain=${ORIGIN}; SameSite=Strict; Secure; HttpOnly`,
    });
    fastify.log.info(`[session::${name}] connected`);
    response.write('retry: 5000\n\n');
    const heartbeatInterval = setInterval(
      () => response.write(': heartbeat\n'),
      heartbeat,
    );
    users.set(name, {
      token,
      vote: '',
      voted: false,
      response,
      spectate: parseBool(spectate),
    });
    req.raw.setTimeout(0);
    req.socket.setNoDelay(true);
    req.socket.setKeepAlive(true);
    req.raw.on('close', () => {
      fastify.log.info(`[session::${name}] disconnected`);
      clearInterval(heartbeatInterval);
      users.delete(name);
      if (users.size > 0) {
        broadcastState();
      } else {
        results = null;
      }
    });
  }

  fastify.get<EventsRequest>('/api/events', function (req, res) {
    const { name } = req.query;
    const { raw: response } = res;
    if (!name?.trim() || users.has(name)) {
      res.code(400).send();
      return;
    }
    setup(req, response);
    broadcastState();
  });

  fastify.get<{ Params: { name: string } }>(
    '/api/users/:name',
    function (req, res) {
      if (users.has(req.params.name)) res.code(204).send();
      else res.code(404).send();
    },
  );

  fastify.get<{ Params: { name: string } }>(
    '/api/users/:name/status',
    function (req, res) {
      const user = users.get(req.params.name);
      if (user != null) {
        const token = getSessionToken(req);
        if (token != null && user.token !== token) {
          res.code(401).send();
        } else {
          res.code(204).send();
        }
      } else res.code(404).send();
    },
  );

  fastify.post<{
    Body: { name: string; vote: string };
  }>('/api/vote', async (req, res) => {
    const { name, vote } = req.body;
    const user = users.get(name);
    if (user) {
      if (user.token !== getSessionToken(req)) {
        res.code(403).send();
        return;
      }
      if (vote.length > 3) return res.code(400).send();
      user.vote = vote;
      user.voted = !!vote;
      broadcastState();
      res.code(204).send();
    } else {
      res.code(404).send();
    }
  });

  fastify.get('/api/results', async (req, res) => {
    results = calcResults();
    res.code(204).send();
    broadcastState();
  });

  fastify.delete('/api/results', async (req, res) => {
    results = null;
    users.forEach((user) => {
      user.vote = '';
      user.voted = false;
    });
    res.code(204).send();
    broadcastState();
  });

  return fastify;
};

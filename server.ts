import Fastify, { type FastifyRequest } from 'fastify';
import FastifyCors from '@fastify/cors';
import FastifyStatic from '@fastify/static';
import { URL, fileURLToPath } from 'url';
import type { ServerResponse } from 'http';

const fastify = Fastify({
  logger:
    process.env.NODE_ENV === 'dev'
      ? {
          level: 'info',
          transport: {
            target: 'pino-pretty',
          },
        }
      : true,
});

fastify.register(FastifyStatic, {
  root: fileURLToPath(new URL('./dist', import.meta.url)),
});

fastify.setNotFoundHandler(function (request, reply) {
  reply.sendFile('index.html');
});

const allowedOrigins = ['localhost', '127.0.0.1'];
fastify.register(FastifyCors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(new URL(origin).hostname)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed'), false);
    }
  },
});

type User = {
  vote?: string;
  response: ServerResponse;
};

const users = new Map<string, User>();

function calcResults() {
  const results: Record<string, number> = {};
  for (const [, { vote }] of users) {
    if (!vote) return null;
    results[vote] = (results[vote] ?? 0) + 1;
  }
  return results;
}

function send(response: ServerResponse, type: string, data: unknown) {
  response.write(`event: ${type}\n`);
  if (typeof data === 'object') {
    response.write(`data: ${JSON.stringify(data)}\n\n`);
  } else if (typeof data === 'function') {
    response.write(`data: ${JSON.stringify(data())}\n\n`);
  } else {
    response.write(`data: ${data}\n\n`);
  }
}

function broadcast(type = 'message', data?: unknown) {
  fastify.log.info(`Broadcast '${type}': ${JSON.stringify(data)}`);
  users.forEach(({ response }) => {
    send(response, type, data);
  });
}

function broadcastUsers() {
  broadcast(
    'users',
    Array.from(users, ([name, { vote }]) => ({ name, voted: !!vote })),
  );
}

function setup(req: FastifyRequest<EventsRequest>, response: ServerResponse) {
  const { heartbeat = 5000, name } = req.query;
  fastify.log.info(`Client '${name}' connected`);
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'X-Accel-Buffering': 'no',
    'x-no-compression': 1,
  });
  response.write('retry: 3000\n\n');
  const heartbeatInterval = setInterval(
    () => response.write(': heartbeat\n'),
    heartbeat,
  );
  users.set(name, { vote: '', response });
  req.raw.setTimeout(0);
  req.socket.setNoDelay(true);
  req.socket.setKeepAlive(true);
  req.raw.on('close', () => {
    fastify.log.info(`Client '${name}' disconnect`);
    clearInterval(heartbeatInterval);
    users.delete(name);
    broadcastUsers();
  });
}

type EventsRequest = {
  Querystring: { name: string; heartbeat?: number };
};

fastify.get<EventsRequest>('/api/events', function (req, res) {
  const { name } = req.query;
  const { raw: response } = res;
  if (!name?.trim() || users.has(name)) {
    res.code(400).send();
    return;
  }
  setup(req, response);
  broadcastUsers();
});

fastify.post<{
  Body: { name: string; vote: string };
}>('/api/vote', async (req, res) => {
  const { name, vote } = req.body;
  const user = users.get(name);
  if (vote.length > 3) return res.code(400).send();
  if (user) {
    user.vote = vote;
    broadcastUsers();
    res.code(204).send();
  } else {
    res.code(404).send();
  }
});

fastify.get('/api/results', async (req, res) => {
  const results = calcResults();
  broadcast('results', results);
  res.code(200).send(results);
});

fastify.delete('/api/results', async (req, res) => {
  users.forEach((user) => {
    user.vote = '';
  });
  broadcast('reset');
  broadcastUsers();
  res.code(204).send();
});

(async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();

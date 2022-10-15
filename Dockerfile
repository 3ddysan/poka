FROM node:18 as builder

WORKDIR /app

# set default node env
ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn

# copy project definition/dependencies files, for better reuse of layers
COPY package*.json pnpm-lock.yaml ./

# install dependencies here, for better reuse of layers
RUN npm install -g pnpm && \
    pnpm config set store-dir .pnpm-store && \
    pnpm audit fix && \
    pnpm install --ignore-scripts --frozen-lockfile

# copy all sources in the container (exclusions in .dockerignore file)
COPY . .

RUN pnpm build

# release layer (the only one in the final image)
FROM gcr.io/distroless/nodejs:18 AS release
COPY --from=builder /app /app
WORKDIR /app

EXPOSE 3000

CMD [ "--loader", "tsx", "./server/index.ts" ]
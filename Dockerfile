FROM node:18 as builder

WORKDIR /app

# copy project definition/dependencies files, for better reuse of layers
COPY package*.json pnpm-lock.yaml ./
COPY ./patches/ ./patches/

# install dependencies here, for better reuse of layers
RUN npm install -g pnpm
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store/v3 pnpm fetch
RUN pnpm install --frozen-lockfile

# copy all sources in the container (exclusions in .dockerignore file)
COPY . .

RUN pnpm build

# release layer (the only one in the final image)
FROM gcr.io/distroless/nodejs:18 AS release

WORKDIR /app

COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/server.mjs .

EXPOSE 3000

CMD [ "./server.mjs" ]
FROM oven/bun:latest as builder

WORKDIR /app
COPY package.json .
COPY bun.lockb .
RUN bun install --production --frozen-lockfile
COPY . .
RUN bun run build

FROM gcr.io/distroless/base-nossl
COPY --from=builder /app/dist /app
ENTRYPOINT ["/app/capybotta"]

"use strict";

const fastify = require("fastify")({ logger: true });
const app = require("./app");

const prefix =
  process.env.TUGBOAT_PREVIEW && process.env.TUGBOAT_TOKEN
    ? `/${process.env.TUGBOAT_PREVIEW}-${process.env.TUGBOAT_TOKEN}/`
    : "/";

async function start() {
  await fastify.register(app, { prefix });
  await fastify.listen({ port: 3000, host: "0.0.0.0" });
  fastify.log.info(`server listening on ${fastify.server.address().port}`);
}

start().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});

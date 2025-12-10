"use strict";

const fastify = require("fastify")({ logger: true });
const app = require("./app");

const prefix = process.env.TUGBOAT_SERVICE_URL_PATH
  ? `${process.env.TUGBOAT_SERVICE_URL_PATH}/`
  : "/";

async function start() {
  await fastify.register(app, { prefix });
  await fastify.listen({ port: 3000 });
  fastify.log.info(`server listening on ${fastify.server.address().port}`);
}

start().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});

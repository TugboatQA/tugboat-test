"use strict";

const fastify = require("fastify")({ logger: true });
const app = require("./app");

async function start() {
  await fastify.register(app, {
    prefix: process.env.TUGBOAT_SERVICE_URL_PATH || "/",
  });
  await fastify.listen({ port: 3000 });
  fastify.log.info(`server listening on ${fastify.server.address().port}`);
}

start().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});

"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    reply.header("bad-header", "some bad contenté");
    reply.header("characters", "有我他这");
    return { root: true };
  });
};

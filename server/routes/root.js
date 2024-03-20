"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    reply.header("båd", "super-bad");
    return { root: true };
  });
};

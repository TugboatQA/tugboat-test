"use strict";

module.exports = function (fastify, opts, done) {
  fastify.register(require("./status"));
  fastify.register(require("./character"));
  done();
};

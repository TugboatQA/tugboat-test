"use strict";

module.exports = async function (fastify, opts) {
  fastify.register(require("./plugins/static"));
  fastify.register(require("./plugins/sensible"));

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(require("./routes"), {
    prefix: process.env.TUGBOAT_SERVICE_URL_PATH || "/",
  });
};

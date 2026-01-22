"use strict";

const baseurlExists = process.env.TUGBOAT_PREVIEW && process.env.TUGBOAT_TOKEN;
const baseurl = baseurlExists
  ? `/${process.env.TUGBOAT_PREVIEW}-${process.env.TUGBOAT_TOKEN}/`
  : "/";

module.exports = async function (fastify, opts) {
  fastify.register(require("./plugins/static"));
  fastify.register(require("./plugins/sensible"));

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(require("./routes"));

  // Handle not found requests
  fastify.setNotFoundHandler((req, reply) => {
    // check if the affected route is equivalent to the baseurl without a trailing slash
    if (baseurlExists && req.url === baseurl.replace(/\/$/, "")) {
      return reply.redirect(baseurl);
    }
    return reply
      .code(404)
      .type("text/html")
      .sendFile("error.html", { root: fastify.publicRoot });
  });
};

"use strict";

const fp = require("fastify-plugin");
const path = require("path");

module.exports = fp(async function (fastify, opts) {
  fastify.addHook("onRequest", (request, reply, done) => {
    fastify.log.info(`request.url: ${request.url}`);
    fastify.log.info(
      `process.env.TUGBOAT_SERVICE_URL_PATH: ${process.env.TUGBOAT_SERVICE_URL_PATH}`
    );
    if (
      process.env.TUGBOAT_SERVICE_URL_PATH &&
      request.url === process.env.TUGBOAT_SERVICE_URL_PATH
    ) {
      return reply.redirect("/");
    }
    done();
  });
  fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "../public"),
    prefix: "/",
    index: "index.html",
    redirect: true,
    ignoreTrailingSlash: true,
  });
});

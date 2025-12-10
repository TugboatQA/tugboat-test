"use strict";

const fp = require("fastify-plugin");
const path = require("path");

module.exports = fp(async function (fastify, opts) {
  fastify.addHook("onRequest", (request, reply, done) => {
    if (request.url === "/") {
      return reply.redirect("/index.html");
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

"use strict";

const fp = require("fastify-plugin");
const path = require("path");

module.exports = fp(async function (fastify, opts) {
  const publicRoot = path.join(__dirname, "../public");

  fastify.register(require("@fastify/static"), {
    root: publicRoot,
    prefix: "/",
    index: "index.html",
    redirect: true,
    ignoreTrailingSlash: true,
  });

  // Decorate fastify with the public root path for use in sendFile
  fastify.decorate("publicRoot", publicRoot);
});

"use strict";

const fp = require("fastify-plugin");
const path = require("path");

const prefix = process.env.TUGBOAT_SERVICE_URL_PATH || "/";

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "../public"),
    prefix,
  });
});

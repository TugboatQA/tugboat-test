"use strict";

const fs = require("fs").promises;
const path = require("path");

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
  fastify.setNotFoundHandler(async (req, reply) => {
    // check if the affected route is equivalent to the baseurl without a trailing slash
    if (baseurlExists && req.url === baseurl.replace(/\/$/, "")) {
      return reply.redirect(baseurl);
    }

    const errorHtmlPath = path.join(fastify.publicRoot, "error.html");
    let errorHtml = await fs.readFile(errorHtmlPath, "utf-8");
    errorHtml = errorHtml.replace(
      /<head>/,
      `<head>\n    <base href="${baseurl}">`
    );

    return reply.code(404).type("text/html").send(errorHtml);
  });
};

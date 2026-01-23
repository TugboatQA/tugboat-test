const path = require("path");
const fs = require("fs").promises;

const TUGBOAT_DEFAULT_SERVICE_URL =
  process.env.TUGBOAT_DEFAULT_SERVICE_URL || "http://localhost:3000";

module.exports = async function (fastify, opts) {
  fastify.get("/valid", async function (request, reply) {
    const redirect = `${TUGBOAT_DEFAULT_SERVICE_URL}/character/h%C3%A5llo`;
    return reply.redirect(redirect);
  });

  fastify.get("/invalid", async function (request, reply) {
    const redirect = `${TUGBOAT_DEFAULT_SERVICE_URL}/character/hållo`;
    return reply.redirect(redirect);
  });

  fastify.get("/hållo", async function (request, reply) {
    let html = await fs.readFile(
      path.join(fastify.publicRoot, "index.html"),
      "utf-8"
    );
    html = html.replace(
      /<head>/,
      `<head>\n    <base href="${TUGBOAT_DEFAULT_SERVICE_URL}/">`
    );
    return reply.type("text/html").send(html);
  });

  fastify.get("/special-chars-headers", async function (request, reply) {
    reply.headers({ language: "français", greeting: "allô" });
    let html = await fs.readFile(
      path.join(fastify.publicRoot, "index.html"),
      "utf-8"
    );
    html = html.replace(
      /<head>/,
      `<head>\n    <base href="${TUGBOAT_DEFAULT_SERVICE_URL}/">`
    );
    return reply.type("text/html").send(html);
  });
};

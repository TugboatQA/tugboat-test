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
    return reply
      .type("text/html")
      .sendFile("index.html", { root: fastify.publicRoot });
  });

  fastify.get("/special-chars-headers", async function (request, reply) {
    reply.headers({ language: "français", greeting: "allô" });
    return reply
      .type("text/html")
      .sendFile("index.html", { root: fastify.publicRoot });
  });
};

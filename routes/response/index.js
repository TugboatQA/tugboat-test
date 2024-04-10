module.exports = async function (fastify, opts) {
  fastify.get("/long", async function (request, reply) {
    const greeting = "hello";

    setTimeout(() => {
      return reply.send(greeting);
    }, 60 * 1000);
  });
};

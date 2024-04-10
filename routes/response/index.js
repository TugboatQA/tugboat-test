module.exports = async function (fastify, opts) {
  fastify.get("/long", async function (request, reply) {
    const greeting = "hello";

    await wait(60 * 1000);
    return greeting;
  });
};

async function wait(time) {
  return new Promsise((resolve) => {
    setTimeout(resolve, time);
  });
}

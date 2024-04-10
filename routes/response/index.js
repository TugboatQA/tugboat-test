module.exports = async function (fastify, opts) {
  fastify.get("/long", async function (request, reply) {
    const greeting = "hello";

    await wait(60 * 1000);
    return greeting;
  });

  fastify.get("/long/:time", async function (request, reply) {
    const greeting = "hello";
    const { time } = request.params;
    const multiplier = time ? time : 1;

    await wait(multiplier * 60 * 1000);
    return greeting;
  });
};

async function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

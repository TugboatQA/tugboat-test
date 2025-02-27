const fastify = require("fastify");

const app = fastify({ logger: true });

app.get("/", async (req, reply) => {
  return "Hello World";
});

app.get("/large-header/:size", async (req, reply) => {
  let { size } = req.params;

  size = Number(size);

  const bigHeader = Buffer.alloc(size * 1024, "a").toString("utf-8");
  app.log.info(Buffer.byteLength(bigHeader, "utf-8"));
  reply.header("big-header", bigHeader);

  return { size };
});

app.log.info(app.server);

app.listen({ port: 3000, host: "0.0.0.0" }, () => {
  console.log("Server is running on port 3000");
});

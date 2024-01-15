"use strict";
const { TUGBOAT_DEFAULT_SERVICE_URL } = process.env;
const template = `
  <html>
    <head>
      <title>Tugboat Test Page</title>
    </head>
    <body>
      <h1>Tugboat Test</>
    </body>
  </html>
`;

module.exports = async function (fastify, opts) {
  fastify.get("/valid", async function (request, reply) {
    const redirect = `${TUGBOAT_DEFAULT_SERVICE_URL}/character/hello`;
    return reply.redirect(redirect);
  });

  fastify.get("/invalid", async function (request, reply) {
    const redirect = `${TUGBOAT_DEFAULT_SERVICE_URL}/character/hållo`;
    return reply.redirect(redirect);
  });

  fastify.get("/hello", async function (request, reply) {
    return reply.type("text/html").send(template);
  });
};

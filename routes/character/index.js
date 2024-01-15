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

const errTemplate = `
  <html>
    <head>
      <title>Tugboat Test Page Error</title>
    </head>
    <body>
      <h1>Tugboat Test</>
      <p>You've made it here by mistake</p>
    </body>
  </html>
`;

module.exports = async function (fastify, opts) {
  fastify.get("/valid", async function (request, reply) {
    const redirect = `${
      TUGBOAT_DEFAULT_SERVICE_URL || "localhost:3000"
    }/character/hello`;
    return reply.redirect(redirect);
  });

  fastify.get("/invalid", async function (request, reply) {
    const redirect = `${
      TUGBOAT_DEFAULT_SERVICE_URL || "localhost:3000"
    }/character/hållo`;
    return reply.redirect(redirect);
  });

  fastify.get("/hello", async function (request, reply) {
    return reply.type("text/html").send(template);
  });

  fastify.setErrorHandler(async function (err, request, reply) {
    if (
      err.code === 404 &&
      err.message === "Route GET:/character/h%EF%BF%BDllo not found"
    ) {
      return reply.code(404).type("text/html").send(errTemplate);
    }

    throw err;
  });
};

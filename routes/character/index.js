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
const templateSpecial = `
  <html>
    <head>
      <title>Tugboat Test Page</title>
    </head>
    <body>
      <h1>Tugboat Test</>
      <p>special character redirect</p>
    </body>
  </html>
`;

module.exports = async function (fastify, opts) {
  fastify.get("/valid", async function (request, reply) {
    const redirect = `${
      TUGBOAT_DEFAULT_SERVICE_URL || "http://localhost:3000"
    }/character/h%C3%A5llo`;
    return reply.redirect(redirect);
  });

  fastify.get("/invalid", async function (request, reply) {
    const redirect = `${
      TUGBOAT_DEFAULT_SERVICE_URL || "http://localhost:3000"
    }/character/hållo`;
    return reply.redirect(redirect);
  });

  fastify.get("/hållo", async function (request, reply) {
    return reply.type("text/html").send(template);
  });
};

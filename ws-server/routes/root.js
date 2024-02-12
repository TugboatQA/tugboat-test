"use strict";

module.exports = async function (fastify, opts) {
  fastify.register(require("@fastify/websocket"));
  fastify.register(async function (fastify) {
    fastify.get(
      "/*",
      { websocket: true },
      (connection /* SocketStream */, req /* FastifyRequest */) => {
        fastify.log.info("Client connected");
        connection.socket.send("🛁🐐 scrubadbub welcome to the TubGoat Server");

        connection.socket.on("message", (message) => {
          const parrotMessage = `🛁🐐: wow what a nice thing to say. Allow me to say it too. "${message.toString()}"`;
          connection.socket.send(parrotMessage);
        });
      }
    );
  });
};

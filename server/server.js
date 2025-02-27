const http = require("http");
const sizeof = require("object-sizeof");

const server = http.createServer({ maxHeaderSize: 48 }, (req, res) => {
  //   const bigHeader = Buffer.alloc(30, "a").toString("utf-8");
  //   res.setHeader("hello", bigHeader);

  console.log(sizeof(res.getHeaders()));
  res.end("Hello World");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

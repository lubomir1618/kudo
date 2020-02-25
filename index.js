const http = require("http");
const port = process.env.PORT || 3000;

http
  .createServer(function(req, res) {
    // Homepage
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("Welcome to the homepage!");
    }

    // About page
    else if (req.url === "/about") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("Welcome to the about page!");
    }

    // 404'd!
    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 error! File not found.");
    }
  })
  .listen(port, "localhost");

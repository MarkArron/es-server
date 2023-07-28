const express = require("express");
const app = express();
const http = require("http");
const { red, green } = require("colorette");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

require("./config/db")()
  .then(() => {
    const corsConfig = {
      origin: "http://localhost:3000", // Who's going to connect, can be array for many. Do not use wildcard (*)
      methods: ["GET", "POST", "PUT", "DELETE"], // List only` available methods
      credentials: true, // Must be set to true
      allowedHeaders: [
        "Origin",
        "Content-Type",
        "X-Requested-With",
        "Accept",
        "Authorization",
      ], // Allowed Headers to be received
    };

    app.use(cors(corsConfig));
    app.use(
      express.urlencoded({
        extended: true,
        limit: "50mb",
      })
    );
    app.use(express.json({ limit: "50mb" }));

    require("./routes")(app);

    const server = http.createServer(app);

    require("./config/socket")(new Server(server, { cors: corsConfig })); // connect socket

    const port = process.env.PORT || 5000;

    server.listen(port, () =>
      console.log(green(`server running on port ${port}`))
    );

    server.on("error", (error) => {
      console.log(red(`server failed - ${error.message}`));
    });
  })
  .catch((err) => {
    console.log(err);
  });

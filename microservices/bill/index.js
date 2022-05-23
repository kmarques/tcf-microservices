const dotenv = require("dotenv");
[".env", ".env.local"].forEach((path) => dotenv.config({ path }));

const express = require("express");
const app = express();
let amqp = require("amqplib/callback_api");
const Bill = require("./controllers/Bill");
const startChannel = require("./lib/amqp");

startChannel().then((channel) => {
  var queue = "create-bill";
  var msg = "Hello world";

  channel.assertQueue(queue, {
    durable: false,
  });

  channel.consume(queue, Bill.post);
});

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT);
});

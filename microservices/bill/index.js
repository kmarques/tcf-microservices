const dotenv = require("dotenv");
[".env", ".env.local"].forEach(path => dotenv.config({ path }));

const express = require("express");
const app = express();
let amqp = require("amqplib/callback_api");
const Bill = require("./controllers/Bill");

amqp.connect(
	"amqp://myuser2:mypassword2@rabbitmq2",
	function (error0, connection) {
		if (error0) {
			throw error0;
		}
		connection.createChannel(function (error1, channel) {
			if (error1) {
				throw error1;
			}
			var queue = "hello";
			var msg = "Hello world";

			channel.assertQueue(queue, {
				durable: false
			});

			channel.consume(queue, Bill.post);
		});
		// setTimeout(function () {
		// 	connection.close();
		// 	process.exit(0);
		// }, 500);
	}
);

app.use(
	express.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		}
	})
);

app.use("/orders", require("./routes/Order"));

app.listen(process.env.PORT || 3000, () => {
	console.log("Server is running on port " + process.env.PORT);
});

const dotenv = require("dotenv");
[".env", ".env.local"].forEach(path => dotenv.config({ path }));

const express = require("express");
const app = express();
let startChannel = require("./lib/amqp");
const Order = require("./controllers/Order");

startChannel().then(channel => {
	var queue = "create-order";
	
	channel.assertQueue(queue, {
		durable: false
	});
});

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

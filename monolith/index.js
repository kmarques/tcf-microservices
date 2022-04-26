require("dotenv").config();
const express = require("express");
const app = express();
console.log(process.env);
app.use(express.json());
const BillController = require("./controllers/Bill");

const middlewares = require("./middlewares");

app.use("/", require("./routes/security"));

app.use("/users", middlewares.security, require("./routes/User"));

app.use("/orders", middlewares.security, require("./routes/Order"));

app.post("/test/bill", BillController.post);

app.listen(process.env.PORT || 3000, () => {
	console.log("Server is running on port " + process.env.PORT);
});

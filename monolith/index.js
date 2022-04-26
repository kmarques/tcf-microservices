require("dotenv").config();
const express = require("express");
const app = express();
const pdf = require("./lib/pdf");
console.log(process.env);
app.use(express.json());

const middlewares = require("./middlewares");

app.use("/", require("./routes/security"));

app.use("/users", middlewares.security, require("./routes/User"));

app.use("/orders", middlewares.security, require("./routes/Order"));
app.get("/test/pdf", async (req, res) => {
  console.log("start");
  await pdf({
    billingAddress: "5 rue general, 75012 Paris",
    products: [
      {
        name: "Gourde de luxe",
        quantity: 2,
        price: 20,
      },
      {
        name: "Coco",
        quantity: 1,
        price: 12,
      }
    ],
  });
  res.json("ok");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT);
});

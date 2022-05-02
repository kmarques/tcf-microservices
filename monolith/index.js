const dotenv = require("dotenv");
[".env", ".env.local"].forEach((path) => dotenv.config({ path }));

const express = require("express");
const app = express();
const pdf = require("./lib/pdf");
const BillController = require("./controllers/Bill");
const InventoryController = require("../controllers/Inventory");

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use("/", require("./routes/security"));
app.use("/payment", require("./routes/payment"));
app.use(
  "/users",
  require("./middlewares/authentication"),
  require("./routes/User")
);
app.use(
  "/orders",
  require("./middlewares/authentication"),
  require("./routes/Order")
);
app.use(
  "/products",
  require("./middlewares/authentication"),
  require("./routes/Product")
);

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
      },
    ],
  });
  res.json("ok");
});
app.post("/test/bill", BillController.post);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT);
});

setInterval(() => {
  InventoryController.removeExpired();
}, 15 * 60 * 1000);
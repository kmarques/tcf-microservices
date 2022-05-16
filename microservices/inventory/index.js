const dotenv = require("dotenv");
[".env", ".env.local"].forEach((path) => dotenv.config({ path }));

const express = require("express");
const app = express();

const InventoryController = require("./controllers/Inventory");

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);


 app.use(
  
  require("./routes/Inventory")
 );

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port " + process.env.PORT);
});

// setInterval(() => {
//   InventoryController.removeExpired();
// }, 5 * 1000);

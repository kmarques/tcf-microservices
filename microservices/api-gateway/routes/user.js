const Router = require("express").Router;
const forwardRequest = require("../middlewares/forwardRequest");
const verifyToken = require("../middlewares/verifyToken");

const router = new Router();
router.get(
  "/users",
  verifyToken,
  forwardRequest(process.env.AUTHENTICATION_URL)
);

router.post(
  "/users",
  verifyToken,
  forwardRequest(process.env.AUTHENTICATION_URL)
);

router.get(
  "/users/:id",
  verifyToken,
  forwardRequest(process.env.AUTHENTICATION_URL)
);

router.put(
  "/users/:id",
  verifyToken,
  forwardRequest(process.env.AUTHENTICATION_URL)
);

router.delete(
  "/users/:id",
  verifyToken,
  forwardRequest(process.env.AUTHENTICATION_URL)
);

module.exports = router;

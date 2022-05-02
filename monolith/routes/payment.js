const Router = require("express").Router;
const PaymentController = require('../controllers/Payment')

const router = new Router();
router.post("/", PaymentController.createPaymentIntent);

router.post("/webhook", PaymentController.handleEvent)

module.exports = router;

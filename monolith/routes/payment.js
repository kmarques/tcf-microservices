const Router = require("express").Router;
const PaymentController = require('../controllers/Payment')

const router = new Router();
router.post("/create-payment-intent", PaymentController.createPaymentIntent);

module.exports = router;

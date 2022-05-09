const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Payment, Notification, OrderProduct, Order } = require("../models");
const format = require("../lib/error").formatError;
const Sequelize = require("sequelize");
const BillController = require("./Bill");

const findOrderById = async function (id, res) {
  const order = await Order.findOne({
    where: {
      id,
    },
    include: [OrderProduct],
  });
  if (order === null) {
    throw new Sequelize.ValidationError("Order not found", [
      new Sequelize.ValidationErrorItem(
        `Order ${id} not found`,
        "id",
        id,
        null,
        null,
        null,
        null
      ),
    ]);
  }
  return order;
};

const setPaymentStatus = async (event, status) => {
  const payment = await Payment.findOne({
    //where: {
    //  id: event.data.object.metadata.payment_id,
    //},
  });
  payment.status = status;
  await payment.save();
  return payment;
};

module.exports = {
  createPaymentIntent: async (req, res) => {
    const { id } = req.body;

    try {
      const payment = await Payment.create({
        status: "CREATED",
        OrderId: id,
      });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          order_id: id,
          payment_id: payment.id,
        },
      });

      payment.paymentIntentId = paymentIntent.id;
      await payment.save();

      res.send({
        clientSecret: paymentIntent.client_secret,
        totalPrice: paymentIntent.amount,
      });
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        res.status(400).json(format(err));
      } else {
        console.error(err);
        res.sendStatus(500);
      }
    }
  },
  handleEvent: async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.WEBHOOK_SECRET
      );
      const notification = await Notification.create({ body: event });
      await notification.save();
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      console.log(err.message);
      return;
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        await setPaymentStatus(event, "PROCESSING");
        break;
      case "charge.succeeded":
        const payment = await setPaymentStatus(event, "SUCCEEDED");
        console.log(payment);
        // USE rabbit MQ to create a channel
        await BillController.post(
          {
            body: {
              orderId: payment.OrderId,
            },
          },
          { json: () => {}, status: () => ({ json: () => {} }) }
        );
        break;
      case "payment_intent.canceled":
        await setPaymentStatus(event, "FAILED");
        break;
      case "payment_intent.payment_failed":
        await setPaymentStatus(event, "FAILED");
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
  },
};

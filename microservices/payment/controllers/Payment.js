const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Payment, Notification } = require("../models");
const format = require("../lib/error").formatError;
const Sequelize = require("sequelize");
const amqp = require("../lib/amqp");

const setPaymentStatus = async (event, status) => {
  console.log(event.data.object.payment_intent);
  const payment = await Payment.findOne({
    where: {
      paymentIntentId: event.data.object.payment_intent,
    },
  });
  console.log(payment, await Payment.findAll());
  payment.status = status;
  await payment.save();
  return payment;
};

module.exports = {
  createPaymentIntent: async (req, res) => {
    const { orderId, total } = req.body;

    try {
      const payment = await Payment.create({
        status: "CREATED",
        orderId,
      });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          order_id: orderId,
          payment_id: payment.id,
        },
      });

      payment.paymentIntentId = paymentIntent.client_secret;
      await payment.save();

      res.status(201).send({
        clientSecret: paymentIntent.client_secret,
        totalPrice: paymentIntent.amount,
      });
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        res.status(400).json(format(err));
      } else {
        console.error(err);
        res.status(500);
      }
    }
  },
  handleEvent: async (req, res) => {
    let event;

    if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "test") {
      event = req.body;
    } else if (process.env.NODE_ENV === "production") {
      const sig = req.headers["stripe-signature"];

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
    }

    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          await setPaymentStatus(event, "PROCESSING");
          break;
        case "charge.succeeded":
          await setPaymentStatus(event, "SUCCEEDED");
          const channel = await amqp();
          const queue = "update-order";

          await channel.assertQueue(queue, {
            durable: true,
          });

          const message = Buffer.from(
            JSON.stringify({
              order_id: event.data.object.metadata.order_id,
              status: "PAID",
            })
          );

          await channel.sendToQueue(queue, message);
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
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  },
};

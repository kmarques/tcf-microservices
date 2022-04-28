const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Payment, Notification, MockOrderProduct } = require("../models");

const calculateOrderAmount = (items) => {
    // Retrieve order_id and fetch all items
    let totalPrice = 0;
    items.forEach(item => {
        totalPrice += item.price;
    })

    return totalPrice;
};

const setPaymentStatus = async (event) => {
    const payment = await Payment.create({status: event.data.object.status});
    await payment.save()
}

module.exports = {
    createPaymentIntent: async (req, res) => {
        const { items } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "eur",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    },
    handleEvent: async (req, res) => {

        const sig = req.headers['stripe-signature'];
        let event;
      
        try {
          event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.WEBHOOK_SECRET);
          const notification = await Notification.create({body: event});
          await notification.save()
          const orderProduct = await MockOrderProduct.create({unitPrice: 1000, quantity: 3})
          await orderProduct.save()
        } catch (err) {
          res.status(400).send(`Webhook Error: ${err.message}`);
          console.log(err.message);
          return;
        }

        switch (event.type) {
            case 'payment_intent.canceled':
                setPaymentStatus(event);
                return res.status(200)
              case 'payment_intent.payment_failed':
                setPaymentStatus(event);
                return res.status(200)
              default:
                console.log(`Unhandled event type ${event.type}`);
        }
        res.json({ received: true });
    }
};

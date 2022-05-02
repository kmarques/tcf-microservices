const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Payment, Notification, OrderProduct } = require("../models");

const findOrderById = async function (id, res) {
    const order = await OrderProduct.findOne({
        where: {
            id
        }
    });
    if (order === null) {
        res.status(400).send(`Order with id: ${id} not found`)
    }
    return order.dataValues;
};

const calculateOrderAmount = async (id, res) => {
    const order = await findOrderById(id, res)
    const qty = order.quantity
    const unitPrice = order.unitPrice
    const totalPrice = unitPrice * qty
    return totalPrice;
};

const setPaymentStatus = async (event) => {
    const payment = await Payment.create({ status: event.data.object.status });
    await payment.save()
}

module.exports = {
    createPaymentIntent: async (req, res) => {
        const { id } = req.body;

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: await calculateOrderAmount(id, res),
                currency: "eur",
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            res.send({
                clientSecret: paymentIntent.client_secret,
                totalPrice: paymentIntent.amount
            });
        } catch (err) {
            console.log(err)
            res.status(400).send(`${err}`)
        }
        
    },
    handleEvent: async (req, res) => {

        const sig = req.headers['stripe-signature'];
        let event;

        try {
            event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.WEBHOOK_SECRET);
            const notification = await Notification.create({ body: event });
            await notification.save()
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

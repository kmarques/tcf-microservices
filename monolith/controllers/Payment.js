const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
    let totalPrice = 0;
    items.forEach(item => {
        totalPrice += item.price;
    })

    return totalPrice;
};


module.exports = {
    createPaymentIntent: async (req, res) => {
        const { items } = req.body;

        // Create a PaymentIntent with the order amount and currency
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
    }
};

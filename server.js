// This is your test secret API key.
const stripe = require('stripe')('sk_test_51MeWNWSFJfsNtxc8HbcRkFqIAMALQd8W0dZFJJIr9RiaijJJa9W0SnNzp9V5d9klNse1n7ZNpjI2J5HvaCcYnuEq00yUJmTZvo');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {currency: 'inr', product_data: {name: 'NGO-DONATION'}, unit_amount: 2000},
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:4242/success.html',
    cancel_url: 'http://localhost:4242/cancel.html',
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));

// New line added
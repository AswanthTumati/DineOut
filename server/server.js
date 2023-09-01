const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51NitvNSJe9bMOHTmOZciV0QSx02pAR3bM1aBKiArCiSxs8TlDiIPo9mnym64bQeJLIcNfFYULAsVAgzEzCkYRnw5007o9mOkzh');

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

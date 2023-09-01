/*import React from 'react'
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
    const grandTotal = location.state?.grandTotal || 0;


    const handleSubmit = async (event) => {
        event.preventDefault();
      };
    
      
    
  return (
    <div>
        <div>
            <div className='row'>
                <center>
                    <form onSubmit={handleSubmit}>
                        
                        <button type="submit" className='btn btn-primary'>
                        Pay ₹{grandTotal.toFixed(2)}
                        </button>
                    </form>
                </center>
            </div>
        </div>
        
    </div>
    
  )
}

export default PaymentPage
*/
/*
import React, { useState } from 'react';
import { CardElement, useStripe, useElements,Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NitvNSJe9bMOHTmYeesf4xpvKMlR3SPKhO442QFgriwo54PyKjJOmd7zaLlTvV59Y9nx1pyuTRRs9sNcumUdxSI00ZhkFRLHI'); // Replace with your Stripe public key

const PaymentPageWrapper = () => (
    <Elements stripe={stripePromise}>
      <PaymentPage />
    </Elements>
  );

const PaymentPage = () => {

    const location = useLocation();
    const grandTotal = location.state?.grandTotal || 0;
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: grandTotal * 100 }), // Amount in cents
    });

    const data = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.log(error);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!');
      setPaymentSuccess(true); // Set paymentSuccess to true
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" className="btn btn-primary">
          Pay ${grandTotal.toFixed(2)}
        </button>
      </form>
      
      {paymentSuccess && (
        <div className="alert alert-success mt-3">
          Payment successful! Thank you for your order.
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
*/


import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NitvNSJe9bMOHTmYeesf4xpvKMlR3SPKhO442QFgriwo54PyKjJOmd7zaLlTvV59Y9nx1pyuTRRs9sNcumUdxSI00ZhkFRLHI'); // Replace with your Stripe public key

const PaymentPageWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

const PaymentPage = () => {
  const location = useLocation();
  const grandTotal = location.state?.grandTotal || 0;
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: grandTotal * 100 }), // Amount in cents
      });

      const data = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.log(error);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='card'>
        <CardElement />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Pay ${grandTotal.toFixed(2)}
        </button>
      </form>

      {paymentSuccess && (
        <div className="alert alert-success mt-3">
          Payment successful! Thank you for your order.
        </div>
      )}
    </div>
  );
};

export default PaymentPageWrapper;



/** @format */

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button
        variant="standard"
        className="mt-4"
        type="submit"
        block
        disabled={loading}
      >
        {loading ? 'Processing payment...' : 'Make Payment'}
      </Button>
    </Form>
  );
};

const stripePromise = loadStripe(
  'pk_test_51JpysQSAmUXaSHPXv1qvipT3Zf08zM0QrfqR73xUN7LEJEx8SFwFuEmmxuQga7uxL2eKbTTVGid0h26oyIiFPvG500aP99DlRO'
);

const StripeContext = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default StripeContext;

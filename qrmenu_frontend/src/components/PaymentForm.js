/** @format */

import { useContext, useState } from 'react';
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
import AuthContext from '../context/AuthContext';
import { createPaymentIntent } from '../apis';

const PaymentForm = ({ amount, items, onDone }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const auth = useContext(AuthContext);
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      setLoading(true);
      const res = await createPaymentIntent(
        {
          payment_method: paymentMethod,
          amount,
          place: params.id,
          table: params.table,
          detail: items,
        },
        auth.token
      );

      if (res?.success) {
        toast(`Your order #${res.order} is getting ready`, { type: 'success' });
        onDone();
        setLoading(false);
      } else if (res?.error) {
        toast(res.error, { type: 'error' });
        setLoading(false);
      }
    }
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

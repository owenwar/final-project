import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = ({ cartItems }) => {
  const [productIds, setProductIds] = useState([]);

  useEffect(() => {
    // Assuming cartItems is an array of objects with an 'id' field
    const ids = cartItems.map(item => item.id);
    setProductIds(ids);
  }, [cartItems]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/stripe/create-checkout-session', { productIds });
      const sessionId = response.data.sessionId;
      const stripe = window.Stripe('pk_test_51NhjF1HWDzSlkllcfbupTpjRyQJ5YAeRTIhcxR3OTcd1mPEUUQoNjDTjBbCL6iMx7471r6mt0hiF26yOduBEhxAc00zpE4k3LU');
      stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error initiating Stripe Checkout:', error);
    }
  };

  return (
    <div>
      {/* Your product listing and Add to Cart buttons here */}
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Checkout;


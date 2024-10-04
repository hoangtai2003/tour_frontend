import React, { useState } from 'react';
import axios from 'axios';
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
const Test = () => {

  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/payment/create_payment_url', { amount });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  return (
    <>
        <Breadcrumbs pagename="Tours" />
        <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handlePayment}>Pay with VNPAY</button>
    </div>
    </>
    
  );
};

export default Test;
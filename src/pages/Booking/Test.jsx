import axios from 'axios';
import React, { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [paymentContent, setPaymentContent] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [language, setLanguage] = useState('vn');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseInt(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/payment/create_payment_url', { amount, bankCode, paymentContent, language });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  return (
    <>
        <Breadcrumbs pagename="Tours" />
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', border: '1px solid #ccc', borderRadius: '10px' }}>
        <h2>Thanh toán hóa đơn VN PAY</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>
                Loại hàng hóa:
                <input type="text" value="Thanh toán hóa đơn" readOnly style={{ width: '100%' }} />
            </label>
            </div>
            <div>
            <label>
                Số tiền:
                <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Nhập số tiền"
                required
                style={{ width: '100%' }}
                />
            </label>
            </div>
            <div>
            <label>
                Nội dung thanh toán:
                <input
                type="text"
                value={paymentContent}
                onChange={(e) => setPaymentContent(e.target.value)}
                placeholder="Nhập nội dung thanh toán"
                required
                style={{ width: '100%' }}
                />
            </label>
            </div>
            <div>
            <label>
                Ngân hàng:
                <select value={bankCode} onChange={(e) => setBankCode(e.target.value)} required style={{ width: '100%' }}>
                <option value="">Chọn ngân hàng</option>
                <option value="NCB">Ngân hàng NCB</option>
                <option value="VCB">Vietcombank</option>
                <option value="TCB">Techcombank</option>
                <option value="CTG">Vietinbank</option>
                </select>
            </label>
            </div>
            <div>
            <label>
                Ngôn ngữ:
                <select value={language} onChange={(e) => setLanguage(e.target.value)} required style={{ width: '100%' }}>
                <option value="vn">Tiếng Việt</option>
                <option value="eg">English</option>
                </select>
            </label>
            </div>
            <div style={{ marginTop: '20px' }}>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
                Xác nhận thanh toán
            </button>
            </div>
        </form>
        </div>
    
    </>

  );
};

export default PaymentForm;

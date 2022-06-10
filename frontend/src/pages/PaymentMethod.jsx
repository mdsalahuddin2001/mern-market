import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CheckoutSteps from '../components/CheckoutSteps';
import { useUserContext } from '../contexts/userContext';
const PaymentMethod = () => {
  const {
    shippingAddress,
    paymentMethod: payMthd,
    savePaymentMethod,
  } = useUserContext();
  const [paymentMethod, setPaymentMethod] = useState(
    payMthd ? payMthd : 'paypal'
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    navigate('/order');
  };

  return (
    <PaymentMethodWrapper className="section section-center">
      <CheckoutSteps step1 step2 step3 />
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <h2>Payment Method</h2>
      <form onSubmit={submitHandler}>
        <div className="input-group">
          <input
            type="radio"
            id="paypal"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="paypal">PayPal</label>
        </div>
        <div className="input-group">
          <input
            type="radio"
            id="stripe"
            value="stripe"
            checked={paymentMethod === 'stripe'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="stripe">Stripe</label>
        </div>
        <button className="btn">continue</button>
      </form>
    </PaymentMethodWrapper>
  );
};
const PaymentMethodWrapper = styled.section`
  form {
    margin-top: 5rem;
  }
  .input-group {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    input {
      height: 2rem;
      width: 2rem;
    }
    label {
      margin-left: 1rem;
      font-size: 1.8rem;
      font-weight: bold;
    }
  }
  .btn {
    margin-top: 2rem;
  }
`;
export default PaymentMethod;

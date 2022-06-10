import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';
import styled from 'styled-components';
import FormContainer from '../components/FormContainer';
import Input from '../components/Input';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';

const Shipping = () => {
  const { userInfo, shippingAddress } = useUserContext();
  const [name, setName] = useState(shippingAddress.name || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postCode, setPostCode] = useState(shippingAddress.postCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const navigate = useNavigate();

  const { saveAddressToLocalStorage } = useUserContext();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=shipping');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !address || !city || !postCode || !country) {
      return toast.error('Please provide all the informations');
    }
    saveAddressToLocalStorage({ name, address, city, postCode, country });
    navigate(redirect ? `/${redirect}` : '/payment-method');
  };
  return (
    <ShippingWrapper className="section section-center">
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <h2>Shipping Address</h2>
      <FormContainer onSubmit={submitHandler}>
        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          label="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          label="Postal Code"
          type="text"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
        />
        <Input
          label="country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <div className="form-group">
          <button type="submit" className="btn">
            Continue
          </button>
        </div>
      </FormContainer>
    </ShippingWrapper>
  );
};

const ShippingWrapper = styled.section``;
export default Shipping;

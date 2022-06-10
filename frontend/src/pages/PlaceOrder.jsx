import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { useUserContext } from '../contexts/userContext';
import { useCartContext } from '../contexts/cartContext';
import { useOrderContext } from '../contexts/orderContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils/getError';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from '../actions/orderActions';

const PlaceOrder = () => {
  const { shippingAddress, paymentMethod, userInfo } = useUserContext();
  const { cart, total_amount, clearCart } = useCartContext();
  const { dispatch, loading } = useOrderContext();
  const navigate = useNavigate();
  let shippingFee = 45;
  useEffect(() => {
    if (!paymentMethod) {
      navigate('/payment-method');
    }
    if (!userInfo) {
      navigate('/login?redirect=order');
    }
  }, [paymentMethod, navigate, userInfo]);

  //placeorder
  const placeOrder = async () => {
    dispatch({ type: ORDER_CREATE_REQUEST });
    try {
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cart,
          shippingAddress,
          paymentMethod,
          itemsPrice: total_amount,
          shippingPrice: shippingFee,
          taxPrice: 0,
          totalPrice: total_amount + 0 + shippingFee,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      clearCart();
      dispatch({ type: ORDER_CREATE_SUCCESS });
      localStorage.removeItem('cart');
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      dispatch({ type: ORDER_CREATE_FAIL, payload: getError(error) });
      toast.error(getError(error));
    }
  };

  return (
    <PlaceOrderWrapper className="section section-center">
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 step4 />
      <h2>Preview Order</h2>
      <div className="order-container">
        <div className="left">
          <div className="item">
            <h4>Shipping</h4>
            <p>
              <strong>Name: </strong>
              {shippingAddress.name}
            </p>
            <p>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.posCode}, {shippingAddress.country}
            </p>
            <Link to={`/shipping?redirect=order`}>Edit </Link>
          </div>
          <div className="item">
            <h4>Payment</h4>
            <p>
              <strong>Method: </strong> {paymentMethod}
            </p>
            <Link to="/payment-method">Edit</Link>
          </div>
          <div className="item">
            <div className="headings">
              <h4>Items</h4>
              <h4>Totals</h4>
            </div>
            {cart.map((item) => {
              return (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt="cart.name" />
                  <div className="info">
                    <Link to={`/product/${item.slug}`}>
                      <h4>{item.name}</h4>
                    </Link>
                    <p>
                      {item.amount}x
                      {item.discountedPrice ? item.discountedPrice : item.price}
                    </p>
                  </div>
                  <p className="total">
                    <strong>Tk.</strong>{' '}
                    {item.amount * item.discountedPrice || item.price}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="right item">
          <h4>Order Summary</h4>
          <p>
            <span>Items</span>
            <span>Tk. {total_amount}</span>
          </p>
          <hr />
          <p>
            <span>Shipping Fee</span>
            <span>Tk. {shippingFee}</span>
          </p>
          <hr />
          <p>
            <span>Tax </span>
            <span>Tk. {0}</span>
          </p>
          <hr />
          <p>
            <strong>Total </strong>
            <strong>Tk. {shippingFee + total_amount}</strong>
          </p>
          <hr />
          <button onClick={placeOrder} className="btn">
            Place Order
          </button>
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </PlaceOrderWrapper>
  );
};

const PlaceOrderWrapper = styled.section`
  .item {
    background-color: #fff;
    padding: 2rem;
    border-radius: 4px;
    font-size: 1.6rem;
    margin: 1rem 0;
    .headings {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    h4 {
      font-size: 1.8rem;
    }
    p {
      text-transform: capitalize;
    }
  }
  .cart-item {
    display: flex;
    align-items: center;
    margin: 4rem 0;
    img {
      width: 50px;
      height: 50px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      margin-right: 2rem;
    }
    .info {
      p {
        font-size: 1.4rem;
        margin: 0;
      }
      h4 {
        margin: 0;
      }
    }
    p {
      margin: 0;
    }
    .total {
      margin-left: auto;
    }
  }
  @media (min-width: 980px) {
    .order-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .left {
      flex: 8;
      margin-right: 5rem;
    }
    .right {
      flex: 4;
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 1rem 0;
      }
      .btn {
        display: block;
        width: 100%;
        margin-top: 2rem;
      }
    }
  }
`;
export default PlaceOrder;

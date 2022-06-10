import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useOrderContext } from '../contexts/orderContext';
import { useUserContext } from '../contexts/userContext';
import MessageBox from '../components/MessageBox';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Order = () => {
  const { loading, error, order, getOrder } = useOrderContext();

  const {
    shippingAddress,
    orderItems,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
  } = order;
  const { userInfo } = useUserContext();
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;

  useEffect(() => {
    if (!userInfo) {
      return navigate('/login');
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      getOrder({ orderId, userInfo });
    }
  }, [order, navigate, orderId, userInfo]);
  if (loading) {
    return <div className="loading"></div>;
  }
  if (error) {
    return <MessageBox>{error}</MessageBox>;
  }
  return (
    <OrderWrapper className="section section-center">
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h2>Order: {orderId}</h2>
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
              {shippingAddress.address}, {shippingAddress.city},
              {shippingAddress.postCode}, {shippingAddress.country}
            </p>
            {isDelivered ? (
              <MessageBox>Order Delevered</MessageBox>
            ) : (
              <MessageBox>Not Delivered</MessageBox>
            )}
          </div>
          <div className="item">
            <h4>Payment</h4>
            <p>
              <strong>Method: </strong> {paymentMethod}
            </p>
            {isPaid ? (
              <MessageBox variant="success">Paid</MessageBox>
            ) : (
              <MessageBox>Not Paid</MessageBox>
            )}
          </div>
          <div className="item">
            <div className="headings">
              <h4>Items</h4>
              <h4>Totals</h4>
            </div>
            {orderItems.map((item, index) => {
              return (
                <div className="cart-item" key={index}>
                  <img src={`/${item.image}`} alt="cart.name" />
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
            <span>Tk. {itemsPrice}</span>
          </p>
          <hr />
          <p>
            <span>Shipping Fee</span>
            <span>Tk. {shippingPrice}</span>
          </p>
          <hr />
          <p>
            <span>Tax </span>
            <span>Tk. {taxPrice}</span>
          </p>
          <hr />
          <p>
            <strong>Total </strong>
            <strong>Tk. {totalPrice}</strong>
          </p>
          <hr />
          <button className="btn">Make Payment</button>
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </OrderWrapper>
  );
};
const OrderWrapper = styled.section`
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
export default Order;

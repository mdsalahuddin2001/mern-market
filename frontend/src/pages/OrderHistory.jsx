import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import { useOrderContext } from '../contexts/orderContext';
import { useUserContext } from '../contexts/userContext';

const OrderHistory = () => {
  const { loading, error, getOrderHistory, orders } = useOrderContext();
  const { userInfo } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    getOrderHistory(userInfo);
  }, [navigate]);

  if (loading) {
    return <div className="loading"></div>;
  }
  if (error) {
    return (
      <section className="section section-center">
        <MessageBox>{error}</MessageBox>
      </section>
    );
  }
  return (
    <section className="section section-center">
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>{order.isDelivered ? order.deliveredAt : 'No'}</td>
                <td>
                  <Button
                    type="button"
                    variant="info"
                    onClick={() => navigate(`/order/${order._id}`)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default OrderHistory;

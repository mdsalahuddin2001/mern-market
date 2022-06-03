import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CartItem from '../components/CartItem';
import CartTotals from '../components/CartTotals';
import { useCartContext } from '../contexts/cartContext';

const Cart = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <section className="section section-center">
        <p style={{ fontSize: '1.8rem' }}>
          Your cart is emptpy.{' '}
          <Link style={{ textDecoration: 'underline' }} to="/">
            Go to shoping
          </Link>
        </p>
      </section>
    );
  }
  return (
    <CartWrapper className="section section-center">
      <h1>Shopping Cart</h1>
      {cart.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
      <CartTotals />
    </CartWrapper>
  );
};
const CartWrapper = styled.section``;
export default Cart;

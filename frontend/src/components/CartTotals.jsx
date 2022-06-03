import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../contexts/cartContext';
const CartTotals = () => {
  const { total_amount } = useCartContext();
  return (
    <CartTotalWrapper>
      <div>
        <article>
          <h5>
            Total: <span>{total_amount}Tk.</span>
          </h5>
        </article>
        <Link to="/checkout" className="btn">
          proceed to checkout
        </Link>
      </div>
    </CartTotalWrapper>
  );
};

const CartTotalWrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  article {
    h5 {
      span {
        font-weight: bold;
      }
    }
  }
`;
export default CartTotals;

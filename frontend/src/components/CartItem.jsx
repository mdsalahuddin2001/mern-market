import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import AmountButtons from './AmountButtons';
import Price from './Price';
import { useCartContext } from '../contexts/cartContext';

const CartItem = ({ product }) => {
  const { toggleAmount } = useCartContext();
  const { id, name, price, discountedPrice, image, max, amount } = product;
  const { removeItem } = useCartContext();

  // const increase = () => {
  //   setAmount((oldAmount) => {
  //     let tempAmount = oldAmount + 1;
  //     if (tempAmount > max) {
  //       tempAmount = max;
  //     }
  //     return tempAmount;
  //   });
  // };
  // const decrease = () => {
  //   setAmount((oldAmount) => {
  //     let tempAmount = oldAmount - 1;
  //     if (tempAmount < 1) {
  //       tempAmount = 1;
  //     }
  //     return tempAmount;
  //   });
  // };
  const increase = () => {
    toggleAmount(id, 'increase');
  };
  const decrease = () => {
    toggleAmount(id, 'decrease');
  };
  return (
    <CartItemWrapper>
      <div>
        <div className="details">
          <div className="img-container">
            <img src={image} alt="" />
          </div>
          <div className="item-info">
            <h4>{name}</h4>
            <Price price={price} discountedPrice={discountedPrice} />
          </div>
        </div>
        <div>
          <AmountButtons
            amount={amount}
            increase={increase}
            decrease={decrease}
          />
        </div>
        <div>
          <h4>sub total</h4>
          <p>
            Tk. {discountedPrice ? discountedPrice * amount : price * amount}
          </p>
        </div>
        <div>
          <button className="btn" onClick={() => removeItem(product.id)}>
            <FaTrash />
          </button>
        </div>
      </div>
    </CartItemWrapper>
  );
};
const CartItemWrapper = styled.div`
  background-color: #f4fbfc;
  &:nth-of-type(even) {
    background-color: #eff5f6;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  padding: 1rem 2rem;
  .details {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .img-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cartItem-right {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100px;
    margin-right: 2rem;
  }
`;
export default CartItem;

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AmountButtons from './AmountButtons';
import { useCartContext } from '../contexts/cartContext';
const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  // add to cart
  const { id, countInStock } = product;
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > countInStock) {
        tempAmount = countInStock;
      }
      return tempAmount;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };
  return (
    <Wrapper>
      <div className="amount-btns">
        <AmountButtons
          increase={increase}
          decrease={decrease}
          amount={amount}
        />
        <div className="btn-container">
          <Link
            to="/cart"
            className="btn"
            onClick={() => {
              addToCart({ id, amount, product });
            }}
          >
            add to cart
          </Link>
          <Link to="/cart" className="btn secondary">
            buy now
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin-top: 2rem;

  .amount-btns {
    margin: 2rem 0;
  }
  .btn-container {
    display: flex;
  }
  .btn {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    width: 160px;
    padding: 1rem 2rem;
    font-size: 1.4rem;
    margin-right: 1.5rem;
  }
  .btn.secondary {
    background-color: var(--secondary-color);
  }
`;
export default AddToCart;

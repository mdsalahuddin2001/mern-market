import styled from 'styled-components';
import Stars from '../Stars';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Price from '../Price';
import { useCartContext } from '../../contexts/cartContext';
const Discount = ({ price, discountedPrice }) => {
  let discount = Math.round(((price - discountedPrice) * 100) / price);

  return <DiscountWrapper>-{discount}%</DiscountWrapper>;
};
const DiscountWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.8);
  height: 40px;
  width: 40px;
  border-radius: 50%;
  z-index: 100;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;
function Product(product) {
  const { addToCart } = useCartContext();
  const {
    name,
    slug,
    isDiscount,
    price,
    discountedPrice,
    rating,
    numReviews,
    image,
    countInStock,
  } = product;
  return (
    <ProductWrapper>
      <Link to={`/product/${slug}`}>
        <div className="product-img">
          <img src={image} alt="product_image" />
        </div>
      </Link>

      <div className="product-info">
        <Link to={`/product/${slug}`}>
          <h4 className="product_title">{name}</h4>
        </Link>
        <Price price={price} discountedPrice={discountedPrice} />
        <div className="flex-center">
          <Stars stars={rating} reviews={numReviews} />
        </div>
      </div>
      {isDiscount && (
        <Discount price={price} discountedPrice={discountedPrice} />
      )}
      <div className="flex-center add-to-cart-btn-container">
        {countInStock > 0 ? (
          <button
            className="btn add-to-cart-btn"
            onClick={() => addToCart({ id: product.id, amount: 1, product })}
          >
            <BsFillCartCheckFill />
            Add to cart
          </button>
        ) : (
          <h4>Out of stock</h4>
        )}
      </div>
    </ProductWrapper>
  );
}
const ProductWrapper = styled.div`
  text-align: center;
  margin: 1rem;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);
  width: 90%;
  min-height: 400px;

  .product-info {
    padding: 1rem;
  }
  .price-group {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    p {
      margin: 0 1rem;
    }
  }
  .normal-price {
    text-decoration: line-through;
    opacity: 0.5;
  }
  .price {
    margin-bottom: 0.5rem;
  }
  .add-to-cart-btn-container {
    position: absolute;
    bottom: 30px;
    width: 100%;
    .add-to-cart-btn {
      padding: 0.5rem 1.5rem;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: capitalize;
      cursor: pointer;
      font-size: 1.2rem;
      svg {
        font-size: 2rem;
        margin-right: 0.8rem;
      }
    }
  }
  @media (min-width: 576px) {
    max-width: 220px;
  }
`;
export default Product;

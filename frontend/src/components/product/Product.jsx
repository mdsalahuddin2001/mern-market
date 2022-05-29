import styled from 'styled-components';
import Stars from '../Stars';
const Discount = ({ discount }) => {
  return (
    <DiscountWrapper>
      <h1>hello</h1>
    </DiscountWrapper>
  );
};
const DiscountWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: var(--clr-primary-1);
  height: 30px;
  width: 30px;
  border-radius: 50%;
  z-index: 100;
`;
function Product(product) {
  const {
    name,
    images,
    isDiscount,
    price,
    discountedPrice,
    rating,
    numReviews,
  } = product;
  return (
    <ProductWrapper>
      <div className="product-img">
        <img src={images[0]} alt="product_image" />
      </div>
      <div className="product-info">
        <h4 className="product_title">{name}</h4>
        {isDiscount ? (
          <div className="price-group">
            <p className="discounted-price">Tk.{discountedPrice}</p>
            <p className="normal-price">Tk. {price}</p>
          </div>
        ) : (
          <p className="price">Tk. {price}</p>
        )}
        <div className="flex-center">
          <Stars stars={rating} reviews={numReviews} />
        </div>
      </div>
      <Discount />
    </ProductWrapper>
  );
}
const ProductWrapper = styled.div`
  text-align: center;
  border: 1px solid gray;
  margin: 1rem;
  position: relative;
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
`;
export default Product;

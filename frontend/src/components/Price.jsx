import styled from 'styled-components';

const Price = ({ price, discountedPrice, fontSize }) => {
  return (
    <PriceWrapper fontSize={fontSize}>
      {discountedPrice ? (
        <div className="price-group">
          <p className="discounted-price">
            <strong>Tk. {discountedPrice}</strong>
          </p>
          <p className="normal-price">
            <strong>Tk. </strong> {price}
          </p>
        </div>
      ) : (
        <p className="price">
          <strong>Tk. {price}</strong>
        </p>
      )}
    </PriceWrapper>
  );
};
const PriceWrapper = styled.div`
  .price-group {
    display: flex;
    align-items: center;
    font-size: ${(props) => props.fontSize};
  }
  .normal-price {
    text-decoration: line-through;
    opacity: 0.5;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    font-size: ${(props) => props.fontSize};
  }
  .price {
    margin-bottom: 0.5rem;
    font-size: ${(props) => props.fontSize};
  }
`;
export default Price;

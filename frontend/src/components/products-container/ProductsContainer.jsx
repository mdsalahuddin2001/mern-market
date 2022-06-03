import styled from 'styled-components';
import Product from '../../components/product/Product';

function ProductsContainer({ products }) {
  return (
    <ProductContainerWrapper className="section">
      <div className="section-center">
        <h2>Featured Products</h2>
        <div className="product-center">
          {products.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </ProductContainerWrapper>
  );
}

const ProductContainerWrapper = styled.section`
  .product-center {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  @media (min-width: 400px) {
    .product-center {
      flex-direction: row;
    }
  }
`;

export default ProductsContainer;

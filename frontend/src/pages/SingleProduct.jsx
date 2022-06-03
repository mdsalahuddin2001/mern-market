import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Stars from '../components/Stars';
import ProductImages from '../components/ProductImages';
import Price from '../components/Price';
import AddToCart from '../components/AddToCart';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox';
import { useGlobalContext } from '../contexts/appContext';

const SingleProductPage = () => {
  const { fetchProduct, loading, error, product } = useGlobalContext();
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchProduct(slug);
  }, [slug]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);
  if (loading) {
    return (
      <section className="page-100 flex-center">
        <Loading />
      </section>
    );
  }
  if (error) {
    return <MessageBox>{error}</MessageBox>;
  }

  const {
    name,
    price,
    discountedPrice,
    countInStock,
    rating,
    numReviews,
    images,
    brand,
    summery,
  } = product;

  return (
    <Wrapper>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={rating} reviews={numReviews} />
            <Price
              price={price}
              discountedPrice={discountedPrice}
              fontSize="2rem"
            />
            <p className="desc">{summery}</p>
            <p className="info">
              <span>Available : </span>
              {countInStock > 0 ? 'In stock' : 'out of stock'}
            </p>
            <p className="info">
              <span>SKU :</span>
              {slug}
            </p>
            <p className="info">
              <span>Brand :</span>
              {brand}
            </p>
            {countInStock > 0 ? (
              <AddToCart product={product} />
            ) : (
              <h2>Out of stock</h2>
            )}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--primary-color);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }
`;

export default SingleProductPage;

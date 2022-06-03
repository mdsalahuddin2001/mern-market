import ProductsContainer from '../components/products-container/ProductsContainer';

import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import MessageBox from '../components/MessageBox';
import { useGlobalContext } from '../contexts/appContext';

const Home = () => {
  const { fetchProducts, products, error, loading } = useGlobalContext();

  useEffect(() => {
    fetchProducts();
  }, []);
  if (error) {
    return <MessageBox>{error}</MessageBox>;
  }
  return (
    <>
      <Helmet>
        <title>Mern Market</title>
      </Helmet>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <ProductsContainer products={products} />
      )}
    </>
  );
};

export default Home;

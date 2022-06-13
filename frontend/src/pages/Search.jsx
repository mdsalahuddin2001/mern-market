import axios from 'axios';
import { useEffect, useState } from 'react';
import { useReducer } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import MessageBox from '../components/MessageBox';
import Stars from '../components/Stars';
import { getError } from '../utils/getError';
import Product from '../components/product/Product';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        products: [...action.payload.products],
        page: action.payload.pages,
        countProducts: action.payload.countProducts,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const prices = [
  {
    name: 'Tk. 1 - Tk. 1000',
    value: '1-1000',
  },
  {
    name: 'Tk. 1001 - Tk. 5000',
    value: '1001-5000',
  },
  {
    name: 'Tk. 5001 - Tk. 10000',
    value: '5001-10000',
  },
];
const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },
  {
    name: '3stars & up',
    rating: 3,
  },
  {
    name: '2stars & up',
    rating: 2,
  },
  {
    name: '1star & up',
    rating: 1,
  },
];
const Search = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const query = searchParams.get('query') || 'all';
  const price = searchParams.get('price') || 'all';
  const rating = searchParams.get('rating') || 'all';
  const order = searchParams.get('order') || 'newest';
  const page = searchParams.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
      products: [],
    });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        console.log(data);
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };
    fetchData();
  }, [category, order, page, price, query, rating]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, []);
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;

    return `/search?page=${filterPage}&query=${filterQuery}&category=${filterCategory}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}`;
  };
  return (
    <section className="section section-center">
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <h3>Department</h3>
      <Row>
        <Col>
          <div>
            <ul>
              <li>
                <Link
                  className={category === 'all' ? 'fw-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  Any
                </Link>
              </li>
              {categories.map((cat) => {
                return (
                  <li key={cat}>
                    <Link
                      className={category === cat ? 'fw-bold' : ''}
                      to={getFilterUrl({ category: cat })}
                    >
                      {cat}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={price === 'all' ? 'fw-bold' : ''}
                  to={getFilterUrl({ price: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? 'fw-bold' : ''}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link to={getFilterUrl({ rating: r.rating })}>
                    <Stars caption=" & up" stars={r.rating} />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={getFilterUrl({ rating: 'all' })}
                  className={rating === 'all' ? 'fw-bold' : ''}
                >
                  <Stars caption=" & up" stars={0} />
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <div className="loading"></div>
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md="6">
                  {countProducts === 0 ? 'No' : countProducts} Results
                  {query !== 'all' && ' : ' + query}
                  {category !== 'all' && ' : ' + category}
                  {price !== 'all' && ' : ' + price}
                  {rating !== 'all' && ' : ' + rating + ' & up'}
                  {query !== 'all' ||
                  rating !== 'all' ||
                  category !== 'all' ||
                  price !== 'all' ? (
                    <Button
                      variant="light"
                      onClick={() => navigate('/search')}
                      className="ms-4"
                    >
                      <FaTimes />
                    </Button>
                  ) : null}
                </Col>
                <Col className="text-end">
                  Sort by{' '}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrival</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="higest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product {...product} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Col>
      </Row>
      <div>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            className="mx-1"
            to={getFilterUrl({ page: x + 1 })}
          >
            <Button className={Number(page) === x + 1 ? 'fw-bold' : ''}>
              {x + 1}
            </Button>
          </LinkContainer>
        ))}
      </div>
    </section>
  );
};

export default Search;

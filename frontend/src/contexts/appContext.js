import axios from 'axios';
import { createContext, useContext, useReducer } from 'react';
import { getError } from '../utils/getError';
import appReducer from '../reducers/appReducer';
import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_BEGIN,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_SUCCESS,
} from '../actions/productsAction';
const AppContext = createContext();
const initialState = {
  loading: false,
  error: '',
  products: [],
  product: {},
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  // Fetch  Products
  const fetchProducts = async () => {
    dispatch({ type: FETCH_PRODUCTS_BEGIN });
    try {
      const { data } = await axios.get('/api/products');
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCTS_FAIL, payload: getError(error) });
    }
  };
  // Fetch Product
  const fetchProduct = async (slug) => {
    dispatch({ type: FETCH_PRODUCT_BEGIN });
    try {
      const { data } = await axios.get(`/api/products/slug/${slug}`);
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCT_FAIL, payload: getError(error) });
    }
  };

  return (
    <AppContext.Provider value={{ ...state, fetchProducts, fetchProduct }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;

import axios from 'axios';
import { createContext, useContext, useReducer, useState } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Fetch  Products
  const fetchProducts = async () => {
    dispatch({ type: FETCH_PRODUCTS_BEGIN });
    try {
      const {
        data: { products },
      } = await axios.get('/api/products');

      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCTS_FAIL, payload: getError(error) });
    }
  };
  // Fetch Product
  const fetchProduct = async (slug) => {
    dispatch({ type: FETCH_PRODUCT_BEGIN });
    try {
      const { data } = await axios.get(`/api/products/${slug}`);
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCT_FAIL, payload: getError(error) });
    }
  };
  // toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // close sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchProducts,
        fetchProduct,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;

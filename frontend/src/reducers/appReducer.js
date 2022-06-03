import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_BEGIN,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_SUCCESS,
} from '../actions/productsAction';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return { ...state, loading: true };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case FETCH_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case FETCH_PRODUCT_BEGIN:
      return { ...state, loading: true };
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case FETCH_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;

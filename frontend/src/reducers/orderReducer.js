import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
} from '../actions/orderActions';

const reducer = (state, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false };
    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_LIST_MY_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_MY_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case ORDER_LIST_MY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;

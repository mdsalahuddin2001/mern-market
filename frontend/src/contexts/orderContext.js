import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import {
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
} from '../actions/orderActions';
import orderReducer from '../reducers/orderReducer';
import { getError } from '../utils/getError';
const OrderContext = createContext();

const initialState = {
  loading: false,
  error: '',
  order: { shippingAddress: {}, orderItems: [{}] },
  orders: [],
};
const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const getOrder = async ({ orderId, userInfo }) => {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ORDER_DETAILS_FAIL, payload: getError(error) });
    }
  };
  // get order history
  const getOrderHistory = async (userInfo) => {
    dispatch({ type: ORDER_LIST_MY_REQUEST });
    try {
      const { data } = await axios.get(`/api/orders/mine`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ORDER_LIST_MY_FAIL, payload: getError(error) });
    }
  };
  return (
    <OrderContext.Provider
      value={{ ...state, dispatch, getOrder, getOrderHistory }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
export default OrderProvider;

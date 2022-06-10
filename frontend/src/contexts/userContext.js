import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import userReducer from '../reducers/userReducer';
import { getError } from '../utils/getError';
import {
  SAVE_ADDRESS_TO_LOCAL_STORAGE,
  SAVE_PAYMENT_METHOD,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../actions/userActions';
import { toast } from 'react-toastify';

const userInfoFromLocalStorage = localStorage.getItem('userInfo');
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress');
const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod');
const UserContext = createContext();
const initialState = {
  error: '',
  loading: false,
  userInfo: userInfoFromLocalStorage
    ? JSON.parse(userInfoFromLocalStorage)
    : null,
  shippingAddress: shippingAddressFromLocalStorage
    ? JSON.parse(shippingAddressFromLocalStorage)
    : {},
  paymentMethod: paymentMethodFromLocalStorage
    ? paymentMethodFromLocalStorage
    : 'paypal',
};
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  // Login user
  const login = async ({ email, password }) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Login successful');
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: getError(error) });
      toast.error(getError(error));
    }
  };
  // Register user
  const signup = async ({ name, email, password }) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
      const { data } = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: getError(error) });
      toast.error(getError(error));
    }
  };
  // update user
  const updateProfile = async ({ name, email, password }) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    try {
      const { data } = await axios.put(
        `/api/auth/profile`,
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${state.userInfo.token}`,
          },
        }
      );
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Profile updated successfully');
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAIL, payload: getError(error) });
    }
  };
  // Sign Out user
  const logout = () => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem('userInfo');
  };

  // const dispatchError = (msg) => {
  //   dispatch({ type: USER_LOGIN_FAIL, payload: msg });
  // };

  // Save address to localStorage
  const saveAddressToLocalStorage = ({
    name,
    address,
    city,
    postCode,
    country,
  }) => {
    const addressToSave = { name, address, city, postCode, country };
    dispatch({
      type: SAVE_ADDRESS_TO_LOCAL_STORAGE,
      payload: addressToSave,
    });
    localStorage.setItem('shippingAddress', JSON.stringify(addressToSave));
  };

  // Save payment method
  const savePaymentMethod = (paymentMethod) => {
    dispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethod });
    localStorage.setItem('paymentMethod', paymentMethod);
  };
  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout,
        saveAddressToLocalStorage,
        signup,
        savePaymentMethod,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserProvider;

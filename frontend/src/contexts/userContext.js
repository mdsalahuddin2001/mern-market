import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import userReducer from '../reducers/userReducer';
import { getError } from '../utils/getError';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../actions/userActions';
import { toast } from 'react-toastify';

const userInfoFromLocalStorage = localStorage.getItem('userInfo');
const UserContext = createContext();
const initialState = {
  error: '',
  loading: false,
  userInfo: userInfoFromLocalStorage
    ? JSON.parse(userInfoFromLocalStorage)
    : null,
};
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
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

  const logout = () => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem('userInfo');
  };
  // const dispatchError = (msg) => {
  //   dispatch({ type: USER_LOGIN_FAIL, payload: msg });
  // };
  return (
    <UserContext.Provider value={{ ...state, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserProvider;

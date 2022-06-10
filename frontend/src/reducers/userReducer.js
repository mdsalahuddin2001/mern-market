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

const reducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, error: '', userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, error: '', userInfo: action.payload };
    case UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return { ...state, loading: false, error: '', userInfo: null };
    case SAVE_ADDRESS_TO_LOCAL_STORAGE:
      return { ...state, loading: 'false', error: '', address: action.payload };
    case SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};
export default reducer;

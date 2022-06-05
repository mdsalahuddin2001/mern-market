import {
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
    case USER_LOGOUT:
      return { loading: false, error: '', userInfo: null };
    default:
      return state;
  }
};
export default reducer;

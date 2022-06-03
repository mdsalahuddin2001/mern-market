import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTAL,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions/cartActions';
import cartReducer from '../reducers/cartReducer';
const getCartFromLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};
const initialState = {
  cart: getCartFromLocalStorage(),
  total_items: 0,
  total_amount: 0,
};
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // Add To Cart
  const addToCart = ({ id, amount, product }) => {
    dispatch({ type: ADD_TO_CART, payload: { id, amount, product } });
  };
  // Remove Item From Cart
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  // Toggle Cart Amount
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };
  // Clear Cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    dispatch({ type: COUNT_CART_TOTAL });
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

export default CartProvider;

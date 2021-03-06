import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTAL,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions/cartActions';

const reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, product } = action.payload;
    const tempItem = state.cart.find((item) => item.id === id);
    if (tempItem) {
      const tempCart = state.cart.map((item) => {
        if (item.id === tempItem.id) {
          let newAmount = item.amount + amount;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id,
        name: product.name,
        slug: product.slug,
        amount,
        image: product.image,
        price: product.price,
        discountedPrice: product.discountedPrice,
        max: product.countInStock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const filteredCart = state.cart.filter(
      (item) => item.id !== action.payload
    );
    return { ...state, cart: filteredCart };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'increase') {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === 'decrease') {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === COUNT_CART_TOTAL) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price, discountedPrice } = cartItem;
        total.total_items += amount;
        total.total_amount += discountedPrice
          ? discountedPrice * amount
          : price * amount;
        return total;
      },
      { total_items: 0, total_amount: 0 }
    );
    return { ...state, total_items, total_amount };
  }
  return state;
};

export default reducer;

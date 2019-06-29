import actionTypes from '../constants/actionTypes';

const initialCartState = {
  cartId: null,
  cartItems: []
};

export const cart = (state = initialCartState, action) => {
  switch (action.type) {
    case actionTypes.GENERATE_UNIQUE_ID:
      return Object.assign({}, state, { cartId: action.id }
      );
    case actionTypes.ADD_TO_CART_SUCCESS:
      return Object.assign({}, state, { cartItems: action.data }
      );
    default:
      return state;
  }
};

import actionTypes from '../constants/actionTypes';

const initialCartState = {
  cartId: null,
  cartItems: [],
  orderId: null,
  orders: [],
  orderTableLoading: false
};

export const cart = (state = initialCartState, action) => {
  switch (action.type) {
    case actionTypes.GENERATE_UNIQUE_ID:
      return Object.assign({}, state, { cartId: action.id }
      );
    case actionTypes.ADD_TO_CART_SUCCESS:
      return Object.assign({}, state, { cartItems: action.data }
      );
    case actionTypes.CREATE_ORDER_SUCCESS:
      return Object.assign({}, state, { orderId: action.data.orderId }
      );
    case actionTypes.REMOVE_ITEM_SUCCESS:
      return Object.assign({}, state, { cartItems: 
        state.cartItems.filter(item =>
          item.item_id !== action.id
        )}
      );
    case actionTypes.GET_ORDERS:
      return Object.assign({}, state, {
        orders: action.data,
        orderTableLoading: false
      });
    case actionTypes.ORDERS_TABLE_LOADING:
      return Object.assign({}, state,
        { orderTableLoading: action.bool }
      );
    default:
      return state;
  }
};

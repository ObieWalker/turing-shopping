import { combineReducers } from 'redux'
import { products } from './productsReducer';
import { users } from './usersReducer';
import { cart } from './cartReducer';
import { shipping } from './shippingReducer';

const rootReducer = combineReducers({
  products,
  users,
  cart,
  shipping
});

export default rootReducer;
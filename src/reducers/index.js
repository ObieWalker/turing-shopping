import { combineReducers } from 'redux'
import { products } from './productsReducer';
import { users } from './usersReducer'
import { cart } from './cartReducer'

const rootReducer = combineReducers({
  products,
  users,
  cart
});

export default rootReducer;
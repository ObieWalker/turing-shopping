import expect from 'expect';
import { cart } from '../../reducers/cartReducer';
import actionTypes from '../../constants/actionTypes';
import { users } from '../__mocks__/userData';
import { cartId } from '../__mocks__/userData'
import { products } from '../__mocks__/productsData';
import { orderId } from '../__mocks__/ordersData';

describe('Cart reducer', () => {
  const initialCartState = {
    cartId: null,
    cartItems: [],
    orderId: null,
    orders: [],
    orderTableLoading: false
  };
  const state = {};
  it('should return initial state', () => {
    expect(cart(undefined, {})).toEqual(initialCartState);
  });
  it('should handle generating a unique id', () => {
    const generateCartId = {
      type: actionTypes.GENERATE_UNIQUE_ID,
      id: cartId
    };
    expect(cart({}, generateCartId)).toEqual({
      cartId
    });
  });
  it('should handle adding to cart success', () => {
    const addToCart = {
      type: actionTypes.ADD_TO_CART_SUCCESS,
      data: products[1]
    };
    expect(cart(state, addToCart)).toEqual({
      cartItems: products[1]
    });
  });
  it('should handle create order success', () => {
    const createOrder = {
      type: actionTypes.CREATE_ORDER_SUCCESS,
      data: {
        orderId
      }
    };
    expect(cart(state, createOrder)).toEqual({
      orderId
    });
  });
  it('should handle remove item success', () => {
    let newState = {cartItems: products}
    const removeItem = {
      type: actionTypes.REMOVE_ITEM_SUCCESS,
      id: 12121
    };
    expect(cart(newState, removeItem)).toEqual({
      cartItems: products
    });
  });
  it('should handle get orders success', () => {
    const getOrders = {
      type: actionTypes.GET_ORDERS,
      data: products
    };
    expect(cart(state, getOrders)).toEqual({
      orderTableLoading: false,
      orders: products
    });
  });
  it('should handle orders table loading success', () => {
    const ordersTableLoading = {
      type: actionTypes.ORDERS_TABLE_LOADING,
      bool: true
    };
    expect(cart(state, ordersTableLoading)).toEqual({
      orderTableLoading: true,
    });
  });
});
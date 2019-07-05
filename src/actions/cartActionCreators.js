import { notification } from 'antd';
import actionTypes from '../constants/actionTypes';
import { asyncHandler } from '../helpers/customMethods';
import cartRequests from "../requests/cartRequests";

const addToCartSuccess = (data) => {
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    data
  }
}

const addToCartFailure = (error) => {
  return {
    type: actionTypes.ADD_TO_CART_FAILURE,
    error
  }
}

const createOrderSuccess = (data) => {
  return {
    type: actionTypes.CREATE_ORDER_SUCCESS,
    data
  }
}

const createOrderFailure = (error) => {
  return {
    type: actionTypes.CREATE_ORDER_FAILURE,
    error
  }
}

const removeItemSuccess = (id) => {
  return {
    type: actionTypes.REMOVE_ITEM_SUCCESS,
    id
  }
}

const removeItemFailure = (error) => {
  return {
    type: actionTypes.REMOVE_ITEM_FAILURE,
    error
  }
}

const getOrdersSuccess = (data) => {
  return {
    type: actionTypes.GET_ORDERS,
    data
  }
}

const ordersTableLoading = bool => {
  return {
    type: actionTypes.ORDERS_TABLE_LOADING,
    bool
  }
}

export const addToCart = (product) => {
  return async(dispatch) => {
    const promise = cartRequests.addToCart(product)
    const { ok, response, error } = await asyncHandler(promise);
    if (ok) {
      return dispatch(addToCartSuccess(response.data));
    }
    notification.open({
      message: 'Error',
    });
    return dispatch(addToCartFailure(error.response))
  }
}

export const createOrder = (cart_id, shipping_id, tax_id) => {
  const orderParams = {
    cart_id, shipping_id, tax_id
  }
  return async(dispatch) => {
    const promise = cartRequests.createOrder(orderParams);
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(createOrderSuccess(response.data));
    }
    notification.open({
      message: 'Error',
    });
    return dispatch(createOrderFailure(error.response))
  }
}

export const makePayment = (
  stripeToken, order_id, description, amount, currency
) => {

  const paymentParams = {
    stripeToken,
    order_id, description, amount, currency
  }
  
  return async(dispatch) => {
    const promise = cartRequests.makePayment(paymentParams);
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(addToCartSuccess([]));
    }
    notification.open({
      message: error.response.data,
    });
    return
  }
}

export const removeItem = (id) => {
  return async(dispatch) => {
    const promise = cartRequests.removeItem(id)
    const { ok, response, error } = await asyncHandler(promise);
    if (ok) {
      return dispatch(removeItemSuccess(id));
    }
    notification.open({
      message: error.response.message,
    });
    return dispatch(removeItemFailure(error.response))
  }
}

export const deleteCart = (id) => {
  return async(dispatch) => {
    const promise = cartRequests.deleteCart(id)
    const { ok, error } = await asyncHandler(promise);
    if (ok) {
      return dispatch(addToCartSuccess([]));
    }
    notification.open({
      message: error.response.message,
    });
    return
  }
}

export const getOrders = () => {
  return async(dispatch) => {
    dispatch(ordersTableLoading(true));
    const promise = cartRequests.getOrders();
    const { ok, response, error } = await asyncHandler(promise);
    if (ok) {
      return dispatch(getOrdersSuccess(response.data));
    }
    notification.open({
      message: error.response.message,
    });
    return
  }
}
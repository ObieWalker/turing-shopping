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

export const addToCart = (product) => {
  return async(dispatch) => {
    const promise = cartRequests.addToCart(product)
    const { ok, response, error } = await asyncHandler(promise);
    if (ok) {
      console.log("response>>", response)
      return dispatch(addToCartSuccess(response.data));
    }
    console.log("error>>", error.message)
    notification.open({
      message: 'Error',
      // description: ,
    });
    return dispatch(addToCartFailure(error.response))
  }
}
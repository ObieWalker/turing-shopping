import actionTypes from '../constants/actionTypes';
import { asyncHandler } from '../helpers/customMethods';
import productsRequests from "../requests/productsRequests";


const getProductsSuccess = (data) => {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    data
  }
}

const getProductsFailure = (error) => {
  return {
    type: actionTypes.GET_PRODUCTS_FAILURE,
    error
  }
}

const getProductSuccess = (data) => {
  return {
    type: actionTypes.GET_PRODUCT_SUCCESS,
    data
  }
}

const getProductFailure = (error) => {
  return {
    type: actionTypes.GET_PRODUCT_FAILURE,
    error
  }
}

const getProductReviewsSuccess = (data) => {
  return {
    type: actionTypes.GET_PRODUCT_REVIEWS_SUCCESS,
    data
  }
}

const getProductReviewsFailure = (error) => {
  return {
    type: actionTypes.GET_PRODUCT_REVIEWS_FAILURE,
    error
  }
}

export const getAllProducts = (page) => {
  return async (dispatch) => {

    const promise = productsRequests.getProducts(page)
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(getProductsSuccess(response.data));
    }
    return dispatch(getProductsFailure(error.response));
  }
}

export const getProduct = (id) => {
  return async (dispatch) => {

    const promise = productsRequests.getProduct(id)
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(getProductSuccess(response.data));
    }
    return dispatch(getProductFailure(error.response));
  }
}

export const getProductReviews = (id) => {
  return async (dispatch) => {

    const promise = productsRequests.getProductReviews(id)
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(getProductReviewsSuccess(response.data));
    }
    return dispatch(getProductReviewsFailure(error.response));
  }
}
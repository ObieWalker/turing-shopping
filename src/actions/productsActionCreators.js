import actionTypes from '../constants/actionTypes';
import { asyncHandler } from '../helpers/customMethods';
import productsRequests from "../requests/productsRequests";
import { paginatedResponse } from '../helpers/paginatedResponse';


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

const productCardLoading = bool => {
  return {
    type: actionTypes.PRODUCT_CARD_LOADING,
    bool
  }
}

export const getAllProducts = (page) => {
  return async (dispatch) => {

    const promise = productsRequests.getProducts(page)
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(getProductsSuccess(paginatedResponse(response.data, page)));
    }
    return dispatch(getProductsFailure(error.response));
  }
}

export const getProduct = (id) => {
  return async (dispatch) => {

    dispatch(productCardLoading(true));
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

export const getProductsByDepartment = (id, page) => {
  return async (dispatch) => {

    const promise = productsRequests.getProductsByDepartment(id, page)
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(getProductsSuccess(paginatedResponse(response.data, page)));
    }
    return dispatch(getProductsFailure(error.response));
  }
}

export const getProductsByCategory = (id, page) => {
  return async (dispatch) => {

    const promise = productsRequests.getProductsByCategory(id, page)
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(getProductsSuccess(paginatedResponse(response.data, page)))
    }
    return dispatch(getProductsFailure(error.response));
  }
}

export const search = (value, page) => {
  return async (dispatch) => {

    const promise = productsRequests.search(value, page)
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(getProductsSuccess(paginatedResponse(response.data, page)));
    }
    return dispatch(getProductsFailure(error.response));
  }
}
import actionTypes from '../constants/actionTypes';
import { asyncHandler } from '../helpers/customMethods';
import shippingRequests from "../requests/shippingRequests";

const getRegionsSuccess = (data) => {
  return {
    type: actionTypes.GET_REGIONS_SUCCESS,
    data
  }
}

const getRegionsFailure = (error) => {
  return {
    type: actionTypes.GET_REGIONS_FAILURE,
    error
  }
}

const getUserDetailsSuccess = (data) => {
  return {
    type: actionTypes.GET_USER_DETAILS_SUCCESS,
    data
  }
}

const getUserDetailsFailure = (error) => {
  return {
    type: actionTypes.GET_USER_DETAILS_FAILURE,
    error
  }
}

const makePurchaseSuccess = (data) => {
  return {
    type: actionTypes.MAKE_PURCHASE_SUCCESS,
    data
  }
}

const makePurchaseFailure = () => {
  return {
    type: actionTypes.GMAKE_PURCHASE_FAILURE
  }
}

export const getRegions = () => {
  return async (dispatch) => {
    const promise = shippingRequests.getRegions()
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(getRegionsSuccess(response.data));
    }
    return dispatch(getRegionsFailure(error.response));
  }
}

export const getUserDetails = () => {
  return async (dispatch) => {
    const promise = shippingRequests.getUserDetails()
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(getUserDetailsSuccess(response.data));
    }
    return dispatch(getUserDetailsFailure(error.response));
  }
}

export const updateAddress = (values) => {
  return async (dispatch) => {
    const promise = shippingRequests.updateAddress(values)
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(getUserDetailsSuccess(response.data));
    }
    return dispatch(getUserDetailsFailure(error.response));
  }
}

export const makeCharge = (token) => {
  return async (dispatch) => {
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });

    if (response.ok) {
      return dispatch(makePurchaseSuccess(response));
    }
    return dispatch(makePurchaseFailure());
  }
}

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

const getShippingRegionsSuccess = (data) => {
  return {
    type: actionTypes.SHIPPING_REGIONS_SUCCESS,
    data
  }
}

const getShippingRegionsFailure = (error) => {
  return {
    type: actionTypes.SHIPPING_REGIONS_FAILURE,
    error
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

export const getShippingRegions = (shippingRegionId) => {
  return async (dispatch) => {
    const promise = shippingRequests.getShippingRegions(shippingRegionId)
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      return dispatch(getShippingRegionsSuccess(response.data));
    }
    return dispatch(getShippingRegionsFailure(error.response));
  }
}

import { notification } from 'antd';
import actionTypes from '../constants/actionTypes';
import { asyncHandler } from '../helpers/customMethods';
import userRequests from "../requests/userRequests";
import httpClient from '../helpers/httpClient';


const signInSuccess = (data) => {
  return {
    type: actionTypes.SIGNING_IN_SUCCESS,
    data
  }
}

const signInFailure = (error) => {
  return {
    type: actionTypes.SIGNING_IN_FAILURE,
    error
  }
}

const registerSuccess = (data) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    data
  }
}

const registerFailure = (error) => {
  return {
    type: actionTypes.REGISTER_FAILURE,
    error
  }
}

const logOutUser = (data = {}) => {
  return {
    type: actionTypes.LOGOUT_USER,
    data
  }
}

const generateUniqueIdSuccess = (id) => {
  return {
    type: actionTypes.GENERATE_UNIQUE_ID,
    id
  }
}

export const signInUser = (user) => {

  return async(dispatch) => {
    const promise = userRequests.signInUser(user)
    const { ok, response, error } = await asyncHandler(promise);

    if (ok) {
      httpClient.setAuthorizationToken(response.data.accessToken);
      localStorage.removeItem('accessToken');
      localStorage.setItem('accessToken', response.data.accessToken);

      return dispatch(signInSuccess(response.data.customer));
    }
    notification.open({
      message: 'Error',
      description: error.response.data.error.message,
    });
    return dispatch(signInFailure(error.response))
  }
}

export const registerUser = (user) => {
  return async(dispatch) => {
    const promise = userRequests.registerUser(user)
    const { ok, response, error } = await asyncHandler(promise);
    if (ok) {
      httpClient.setAuthorizationToken(response.data.accessToken);
      localStorage.removeItem('accessToken');
      localStorage.setItem('accessToken', response.data.accessToken);
      return dispatch(registerSuccess(response.data.customer));
    }
    notification.open({
      message: 'Error',
      description: error.response.data.error.message,
    });
    return dispatch(registerFailure(error.response))
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    httpClient.setAuthorizationToken();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('persist:root')
    return dispatch(logOutUser());
  }
}

export const generateUniqueId = () => {
  return async(dispatch) => {
    const promise = userRequests.generateUniqueId()
    const { ok, response } = await asyncHandler(promise);
    if (ok) {
      return dispatch(generateUniqueIdSuccess(response.data.cart_id));
    }
  }
}

export const updateInfo = (values) => {
  return async(dispatch) => {
    const promise = userRequests.updateInfo(values)
    const { ok, response, error } = await asyncHandler(promise);
    if (ok) {
      return dispatch(signInSuccess(response.data));
    }
    notification.open({
      message: 'Error',
      description: error.response.data.error.message,
    });
    return dispatch(signInFailure(error.response))
  }
}
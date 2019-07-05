import expect from 'expect';
import { users as userReducer } from '../../reducers/usersReducer';
import actionTypes from '../../constants/actionTypes';
import { users } from '../__mocks__/userData';
import { cartId } from '../__mocks__/userData'
import { products } from '../__mocks__/productsData';
import { productReviews } from '../__mocks__/productsReviewsData';
import { regions } from '../__mocks__/regionsData';
import { shippingRegions } from '../__mocks__/shippingRegionsData';

describe('User reducer', () => {
  const initialUsersState = {
    error: null,
    user: {},
    authenticated: false
  };
  const state = {};
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialUsersState);
  });
  it('should handle signing in success', () => {
    const signIn = {
      type: actionTypes.SIGNING_IN_SUCCESS,
      data: users[2]
    };
    expect(userReducer({}, signIn)).toEqual({
      user: users[2],
      authenticated: true
    });
  });
  it('should handle sign in failure', () => {
    const loginFailure = {
      type: actionTypes.REGISTER_FAILURE,
    };
    expect(userReducer(state, loginFailure)).toEqual({});
  });
  it('should handle register success', () => {
    const registerSuccess = {
      type: actionTypes.REGISTER_SUCCESS,
      data: users[2]
    };
    expect(userReducer(state, registerSuccess)).toEqual({
      user: users[2],
      authenticated: true
    });
  });
  it('should handle register failure', () => {
    const registerFailure = {
      type: actionTypes.REGISTER_FAILURE,
    };
    expect(userReducer(state, registerFailure)).toEqual({});
  });
  it('should handle logout', () => {
    const logoutSuccess = {
      type: actionTypes.LOGOUT_USER,
      data: {}
    };
    expect(userReducer(state, logoutSuccess)).toEqual({
      user: {},
      authenticated: false
    });
  });
});
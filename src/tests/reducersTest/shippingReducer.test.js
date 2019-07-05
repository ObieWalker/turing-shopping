import expect from 'expect';
import { shipping } from '../../reducers/shippingReducer';
import actionTypes from '../../constants/actionTypes';
import { users } from '../__mocks__/userData';
import { cartId } from '../__mocks__/userData'
import { products } from '../__mocks__/productsData';
import { productReviews } from '../__mocks__/productsReviewsData';
import { regions } from '../__mocks__/regionsData';
import { shippingRegions } from '../__mocks__/shippingRegionsData';

describe('Shipping reducer', () => {
  const initialShippingState = {
    shippingRegions: [],
    shippingDetails: {
      customer_id: null,
      name: "",
      email: "",
      address_1: "",
      address_2: "",
      city: "",
      region: "",
      postal_code: "",
      country: "",
      shipping_region_id: 1,
      day_phone: "+351323213511235",
      eve_phone: "+452436143246123",
      mob_phone: "+351323213511235",
      credit_card: "XXXXXXXX5100"
    },
    shipping_regions: []
  };
  const state = {};
  it('should return initial state', () => {
    expect(shipping(undefined, {})).toEqual(initialShippingState);
  });
  it('should handle get regions success', () => {
    const getRegions = {
      type: actionTypes.GET_REGIONS_SUCCESS,
      data: regions
    };
    expect(shipping({}, getRegions)).toEqual({
      shippingRegions: regions.slice(1)
    });
  });
  it('should handle get user details success', () => {
    const getUserSuccess = {
      type: actionTypes.GET_USER_DETAILS_SUCCESS,
      data: users[1]
    };
    expect(shipping(state, getUserSuccess)).toEqual({
      shippingDetails: users[1]
    });
  });
  it('should handle getting shipping regions success', () => {
    const cardLoading = {
      type: actionTypes.SHIPPING_REGIONS_SUCCESS,
      data: shippingRegions
    };
    expect(shipping(state, cardLoading)).toEqual({
      shipping_regions: shippingRegions
    });
  });
});
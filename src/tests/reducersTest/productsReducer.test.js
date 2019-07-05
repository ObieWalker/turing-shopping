import expect from 'expect';
import { products as productsReducer} from '../../reducers/productsReducer';
import actionTypes from '../../constants/actionTypes';
import { users } from '../__mocks__/userData';
import { cartId } from '../__mocks__/userData'
import { products } from '../__mocks__/productsData';
import { productReviews } from '../__mocks__/productsReviewsData';

describe('Products reducer', () => {
  const initialProductsState = {
    rows: [],
    totalProducts: 0,
    currentPage: 1,
    error: null,
    product: {
      product_id: null,
      name: '',
      description: '',
      price: 0,
      discounted_price: 0,
      image: '',
      image_2: '',
      thumbnail: '',
      display: 0,
    },
    productLoading: false,
    reviews: []
  };
  const state = {};
  it('should return initial state', () => {
    expect(productsReducer(undefined, {})).toEqual(initialProductsState);
  });
  it('should handle get products success', () => {
    const getProductsSuccess = {
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      data: {
        rows: products,
        totalProducts: 10,
        currentPage: 1
      }
    };
    expect(productsReducer({}, getProductsSuccess)).toEqual({
      rows: products,
      totalProducts: 10,
      currentPage: 1
    });
  });
  it('should handle get product success', () => {
    const getProductSuccess = {
      type: actionTypes.GET_PRODUCT_SUCCESS,
      data: products[1]
    };
    expect(productsReducer(state, getProductSuccess)).toEqual({
      productLoading: false,
      product: products[1],
    });
  });
  it('should handle product card loading', () => {
    const cardLoading = {
      type: actionTypes.PRODUCT_CARD_LOADING,
      bool: true
    };
    expect(productsReducer(state, cardLoading)).toEqual({
      productLoading: true
    });
  });
  it('should handle get products reviews success', () => {
    const getProductReviews = {
      type: actionTypes.GET_PRODUCT_REVIEWS_SUCCESS,
      data: productReviews
    };
    expect(productsReducer(state, getProductReviews)).toEqual({
      reviews: productReviews
    });
  });
});
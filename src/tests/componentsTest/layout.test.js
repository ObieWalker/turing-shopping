import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import connect, { Main } from '../../components/layout/index.js';
import { users as usersData } from '../__mocks__/userData' 
import { products as productsData } from '../__mocks__/productsData'
import { orders as ordersData } from '../__mocks__/ordersData';


let mountedComponent;
let props;
const mockStore = configureStore();

let wrapper;
const user = usersData[1]
const users = { usersData }
const products = {productsData}
const cart = {
  cartId: 111,
  cartItems: productsData,
  orderId: 221,
  orders: ordersData,
  orderTableLoading: false
};
const openAuthModal = jest.fn();
const setProductsState = jest.fn();
const handleVisibility = jest.fn();
const openCheckoutModal = jest.fn();
const openCart = jest.fn();
const onClose = jest.fn();
const toggleSignInModalVisibility = jest.fn();
const resetProducts = jest.fn(() => Promise.resolve({}));
const clickProduct = jest.fn(() => Promise.resolve({}));
const changePage = jest.fn(() => Promise.resolve({}));
const signInUser = jest.fn(() => Promise.resolve({}));
const registerUser = jest.fn(() => Promise.resolve({}));
const logout = jest.fn(() => Promise.resolve({}));
const generateUniqueId = jest.fn(() => Promise.resolve({}));
const addToCart = jest.fn(() => Promise.resolve({}));
const chooseCategory = jest.fn(() => Promise.resolve({}));
const getAllProducts = jest.fn(() => Promise.resolve({}));
const searchForProduct = jest.fn(() => Promise.resolve({}));
const search = jest.fn(() => Promise.resolve({}));
const getProductsByDepartment = jest.fn(() => Promise.resolve({}));
const getProductsByCategory = jest.fn(() => Promise.resolve({}));
const getShippingRegions = jest.fn(() => Promise.resolve({}));
const getProduct = jest.fn(() => Promise.resolve({}));
const getProductReviews = jest.fn(() => Promise.resolve({}));
const logoutUser = jest.fn(() => Promise.resolve({}));

const getComponent = () => {
  if (!mountedComponent) {
    props = {
      user,
      users,
      products,
      cart,
      openAuthModal,
      setProductsState,
      handleVisibility,
      openCheckoutModal,
      openCart,
      onClose,
      toggleSignInModalVisibility,
      resetProducts,
      clickProduct,
      changePage,
      signInUser,
      registerUser,
      logout,
      generateUniqueId,
      addToCart,
      chooseCategory,
      searchForProduct,
      getAllProducts,
      getProduct,
      getProductReviews,
      logoutUser,
      getProductsByDepartment,
      getProductsByCategory,
      search,
      getShippingRegions
    };
    mountedComponent = shallow(<Main {...props} />);
  }
  return mountedComponent;
};

describe('Layout Component', () => {
  beforeEach(() => {});
  wrapper = getComponent();

  it('component successfully rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a method that handles toggle modal visibility', () => {
    wrapper.instance().toggleModalVisibility();
    expect(wrapper.state().productModalVisible).toEqual(true);
  });
  it('should have a method that handles toggle sign in modal visibility', () => {
    wrapper.instance().toggleSignInModalVisibility();
    expect(wrapper.state().signInModalVisible).toEqual(true);
  });
  it('should have a method that handles auth modal visibility', () => {
    wrapper.instance().openAuthModal();
    expect(wrapper.state().signInModalVisible).toEqual(true);
  });
  it('should have a method that handles cart visibility', () => {
    wrapper.instance().openCart();
    expect(wrapper.state().cartVisible).toEqual(true);
  });
  it('should have a method that handles close visibility', () => {
    wrapper.instance().onClose();
    expect(wrapper.state().cartVisible).toEqual(false);
  });
  it('should have a method that handles checkout modal visibility', () => {
    wrapper.instance().openCheckoutModal();
    expect(wrapper.state().checkoutVisible).toEqual(true);
  });
  it('should have a method that handles closes checkout modal', () => {
    wrapper.instance().handleVisibility();
    expect(wrapper.state().checkoutVisible).toEqual(false);
  });
  it('should have a method that sets product state', () => {
    wrapper.instance().setProductsState(1, null, null);
    expect(wrapper.state().department).toEqual(1);
  });
  it('should have a method that handles page change state', () => {
    wrapper.instance().changePage(1);
    expect(wrapper.state().page).toEqual(1);
  });
  it('should have a method that handles preset products', () => {
    wrapper.instance().resetProducts();
    expect(wrapper.state().page).toEqual(1);
  });
});

describe('Connected Component', () => {
  describe('Connected mountedLogin', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        getAllProducts,
        getProduct,
        getProductReviews,
        signInUser,
        registerUser,
        logoutUser,
        generateUniqueId,
        addToCart,
        getProductsByDepartment,
        getProductsByCategory,
        search,
        getShippingRegions
      });
      wrapper = shallow(<connect store={store}
        getAllProducts={getAllProducts}
        getProduct={getProduct}
        getProductReviews={getProductReviews}
        signInUser={signInUser}
        registerUser={registerUser}
        logoutUser={logoutUser}
        generateUniqueId={generateUniqueId}
        addToCart={addToCart}
        getProductsByDepartment={getProductsByDepartment}
        getProductsByCategory={getProductsByCategory}
        search={search}
        getShippingRegions={getShippingRegions}
      />);
      expect(wrapper.length).toBe(1);
    });
  });
});

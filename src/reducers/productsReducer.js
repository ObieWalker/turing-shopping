import actionTypes from '../constants/actionTypes';

const initialProductsState = {
  rows: [],
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
    display: 0
  },
  reviews: []
};

export const products = (state = initialProductsState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return Object.assign({}, state, { rows: action.data.rows }
      );
    
    case actionTypes.GET_PRODUCT_SUCCESS:
      return Object.assign({}, state, { product: action.data }
    );
    case actionTypes.GET_PRODUCT_REVIEWS_SUCCESS:
    return Object.assign({}, state, { reviews: action.data }
  );
    default:
      return state;
  }
};

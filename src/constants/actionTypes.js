const actionTypes = {
  
  //PRODUCTS
  GET_PRODUCTS_SUCCESS        : 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_FAILURE        : 'GET_PRODUCTS_FAILURE',
  GET_PRODUCT_SUCCESS         : 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_FAILURE         : 'GET_PRODUCT_FAILURE',
  GET_PRODUCT_REVIEWS_SUCCESS : 'GET_PRODUCT_REVIEWS_SUCCESS',
  GET_PRODUCT_REVIEWS_FAILURE : 'GET_PRODUCT_REVIEWS_FAILURE',
  PRODUCT_CARD_LOADING        : 'PRODUCT_CARD_LOADING',

  //USER
  SIGNING_IN_SUCCESS  : 'SIGNING_IN_SUCCESS',
  SIGNING_IN_FAILURE  : 'SIGNING_IN_FAILURE',
  REGISTER_SUCCESS    : 'REGISTER_SUCCESS',
  REGISTER_FAILURE    : 'REGISTER_SUCCESS',
  LOGOUT_USER         : 'LOGOUT_USER',
  GENERATE_UNIQUE_ID  : 'GENERATE_UNIQUE_ID',

  //CART
  ADD_TO_CART_SUCCESS   : 'ADD_TO_CART_SUCCESS',
  ADD_TO_CART_FAILURE   : 'ADD_TO_CART_FAILURE',
  CREATE_ORDER_SUCCESS  : 'CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILURE  : 'CREATE_ORDER_FAILURE',
  REMOVE_ITEM_SUCCESS   : 'REMOVE_ITEM_SUCCESS',
  REMOVE_ITEM_FAILURE   : 'REMOVE_ITEM_FAILURE',
  GET_ORDERS            : 'GET_ORDERS',
  ORDERS_TABLE_LOADING  : 'ORDERS_TABLE_LOADING',

  //SHIPPING
  GET_REGIONS_SUCCESS       : 'GET_REGIONS_SUCCESS',
  GET_REGIONS_FAILURE       : 'GET_REGIONS_FAILURE',
  SHIPPING_REGIONS_SUCCESS  : 'SHIPPING_REGIONS_SUCCESS',
  SHIPPING_REGIONS_FAILURE  : 'SHIPPING_REGIONS_FAILURE',

  //USER
  GET_USER_DETAILS_SUCCESS  : 'GET_USER_DETAILS_SUCCESS',
  GET_USER_DETAILS_FAILURE  : 'GET_USER_DETAILS_FAILURE',

  //PURCHASE
  MAKE_PURCHASE_SUCCESS     : 'MAKE_PURCHASE_SUCCESS',
  MAKE_PURCHASE_FAILURE     : 'MAKE_PURCHASE_FAILURE'
}

export default actionTypes;

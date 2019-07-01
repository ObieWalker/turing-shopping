
function setPageNumber(page=1) {
  if (page){
    return `${`?page=${page}`}`
  } return ""
}

function setQueryString (value, page=1) {
  return `query_string=${value}&page=${page}`
}

//API ROUTES
export const ROUTES = {

  //PRODUCT ROUTES
  getProductsURL              :     (page) => `/products${setPageNumber(page)}`,
  getProductURL               :     (id)   => `/products/${id}`,
  getProductReviewsURL        :     (id)   => `products/${id}/reviews`,
  getProductsByDepartmentURL  :     (id, page)   => `/products/inDepartment/${id}${setPageNumber(page)}`,
  getProductsByCategoryURL    :     (id, page)  =>  `/products/inCategory/${id}${setPageNumber(page)}`,
  searchURL                   :     (value, page) => `/products/search?${setQueryString(value, page)}`,
  updateInfoURL               :               '/customer',

  //USER ROUTES
  signInUserURL               :              'customers/login',
  registerUserURL             :              'customers',
  generateUniqueIdURL         :              'shoppingcart/generateUniqueId',
  updateInfo                  :              '/customer',

  //CART ROUTES
  addToCartURL                :              '/shoppingcart/add',

  //SHIPPING ROUTES
  getRegionsURL               :              '/shipping/regions',
  getUserDetailsURL           :              '/customer',
  updateAddressURL            :              '/customers/address',
}

function setPageNumber(page) {
  if (page){
    return `${`?page=${page}`}`
  } return ""
}

//API ROUTES
export const ROUTES = {

  //PRODUCT ROUTES
  getProductsURL:     (page)  => `/products${setPageNumber(page)}`,
  getProductURL:      (id)    => `/products/${id}`,
  getProductReviewsURL:(id)   => `products/${id}/reviews`,

  //USER ROUTES
  signInUserURL:                  'customers/login',
  registerUserURL:                'customers',
  generateUniqueIdURL:            `shoppingcart/generateUniqueId`,

  //CART ROUTES
  addToCartURL:                   '/shoppingcart/add',
}
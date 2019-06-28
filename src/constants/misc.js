
function setPageNumber(page) {
  if (page){
    return `${`?page=${page}`}`
  } return ""
}

//API routes
export const ROUTES = {

  getProductsURL:     (page)  => `/products${setPageNumber(page)}`,
  getProductURL:      (id)    => `/products/${id}`,
  getProductReviewsURL:(id)   => `products/${id}/reviews` 
}
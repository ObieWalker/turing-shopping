import { ROUTES } from '../constants/misc';
import client from '../helpers/httpClient';

export default {
  getProducts(page) {
    return client.get(ROUTES.getProductsURL(page));
  },

  getProduct(id) {
    return client.get(ROUTES.getProductURL(id));
  },

  getProductReviews(id) {
    return client.get(ROUTES.getProductReviewsURL(id));
  },

  getProductsByDepartment(id, page) {
    return client.get(ROUTES.getProductsByDepartmentURL(id, page));
  },

  getProductsByCategory(id, page) {
    return client.get(ROUTES.getProductsByCategoryURL(id, page));
  },

  search(value, page) {
    return client.get(ROUTES.searchURL(value, page));
  }

}
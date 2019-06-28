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
  }

}
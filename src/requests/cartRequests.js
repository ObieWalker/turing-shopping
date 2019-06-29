import { ROUTES } from '../constants/misc';
import client from '../helpers/httpClient';

export default {
  addToCart(product) {
    return client.post(ROUTES.addToCartURL, (product));
  },

}
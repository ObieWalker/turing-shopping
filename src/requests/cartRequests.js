import { ROUTES } from '../constants/misc';
import client from '../helpers/httpClient';

export default {
  addToCart(product) {
    return client.post(ROUTES.addToCartURL, (product));
  },

  createOrder(orderParams) {
    return client.post(ROUTES.createOrderURL, (orderParams));
  },

  makePayment(paymentParams) {
    return client.post(ROUTES.makePaymentURL, (paymentParams));
  },

  removeItem(id) {
    return client.delete(ROUTES.removeItemURL(id))
  },

  deleteCart(id) {
    return client.delete(ROUTES.deleteCartURL(id))
  },

  getOrders() {
    return client.get(ROUTES.getOrdersURL)
  }
}
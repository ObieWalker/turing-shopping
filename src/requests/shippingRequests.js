import { ROUTES } from '../constants/misc';
import client from '../helpers/httpClient';

export default {
  getRegions() {
    return client.get(ROUTES.getRegionsURL);
  },

  getUserDetails() {
    return client.get(ROUTES.getUserDetailsURL);
  },

  updateAddress(values) {
    return client.put(ROUTES.updateAddressURL, values);
  }
}
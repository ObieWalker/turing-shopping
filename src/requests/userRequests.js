import { ROUTES } from '../constants/misc';
import client from '../helpers/httpClient';

export default {
  signInUser(user) {
    return client.post(ROUTES.signInUserURL, user);
  },

  registerUser(user) {
    return client.post(ROUTES.registerUserURL, (user));
  },

  generateUniqueId(){
    return client.get(ROUTES.generateUniqueIdURL);
  }
}
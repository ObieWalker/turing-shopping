
import axios from 'axios';

const httpClient = axios.create({
  baseURL:`${process.env.REACT_APP_API_URL}`,
});

function setAuthorizationToken(token) {
  const defaultHeaders = this.defaults.headers.common || {};

  if (token) {
    defaultHeaders.Authorization = `Token ${token}`;
  } else {
    delete defaultHeaders.Authorization;
  }
}

export default Object.assign(httpClient, {
  setAuthorizationToken
});
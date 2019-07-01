
import axios from 'axios';

const httpClient = axios.create({
  baseURL:`${process.env.REACT_APP_API_URL}`,
});

function setAuthorizationToken(accessToken) {
  const headers = this.defaults.headers.common || {};

  if (accessToken) {
    headers["USER-KEY"] = localStorage.getItem('accessToken')
  } else {
    delete headers["USER-KEY"];
  }
}

export default Object.assign(httpClient, {
  setAuthorizationToken
});
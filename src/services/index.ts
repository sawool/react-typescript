import {
  signupRequest,
  signinRequest,
  signoutRequest,
  isValidRequest,
} from './authentication';
import {
  materialPostRequest,
  materialGetRequest,
  materialPutRequest,
} from './material';
import { menuPostRequest, menuPutRequest, menuGetRequest } from './menu';
import axios from 'axios';

const Api = {
  signupRequest,
  signinRequest,
  isValidRequest,
  signoutRequest,
  materialGetRequest,
  materialPostRequest,
  materialPutRequest,
  menuPostRequest,
  menuPutRequest,
  menuGetRequest,
};

// Axios 인터셉터를 이용해서 JWT 세팅
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export function getToken() {
  let cookies = document.cookie.split(';');
  let tokenValue = '';

  cookies.forEach((cookie) => {
    let cookieArr = cookie.trimLeft().split('=');
    if (cookieArr[0] === 'token') {
      tokenValue = cookieArr[1];
    }
  });

  return tokenValue;
}

export default Api;

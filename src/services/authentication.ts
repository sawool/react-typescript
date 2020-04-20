import axios from 'axios';

type SignRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = SignRequest & {
  username: string;
};

export type SignInRequest = SignRequest & {};

export type SignInReponse = {
  email: string;
  username: string;
};

export async function signupRequest(payload: SignUpRequest) {
  console.log('axios - signupRequest');
  console.log(payload);

  return await axios.post<SignUpRequest>('api/user/signup', payload);
}

export async function signinRequest(payload: SignInRequest) {
  console.log('axios - signinRequest');
  console.log(payload);

  return await axios.post<SignInRequest>('api//user/signin', payload);
}

export async function isValidRequest() {
  console.log('axios - isValidRequest');

  const jwt = getToken();
  return await axios.post(
    'api//user/current',
    {},
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );
}

function getToken() {
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

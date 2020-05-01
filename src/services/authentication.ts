import axios from 'axios';

type SignRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = SignRequest & {
  username: string;
};

export type SignInRequest = SignRequest & {};

export type UserInfo = {
  email: string;
  username: string;
};

export async function signupRequest(payload: SignUpRequest) {
  console.log('axios - signupRequest');
  console.log(payload);

  await axios.post('api/user/signup', payload);

  return true;
}

export async function signinRequest(payload: SignInRequest) {
  console.log('axios - signinRequest');
  console.log(payload);

  const response = await axios.post<UserInfo>('api//user/signin', payload);
  return response.data;
}

export async function isValidRequest() {
  console.log('axios - isValidRequest');

  const jwt = getToken();
  await axios.post(
    'api//user/current',
    {},
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );

  return true;
}

export async function signoutRequest() {
  console.log('axios - signoutRequest');

  const jwt = getToken();
  await axios.post(
    'api//user/signout',
    {},
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );

  return true;
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

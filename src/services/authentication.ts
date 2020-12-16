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

  const response = await axios.post<UserInfo>('api/user/signin', payload);
  return response.data;
}

export async function isValidRequest() {
  console.log('axios - isValidRequest');

  const response = await axios.post<UserInfo>('api/user/current');

  return response.data;
}

export async function signoutRequest() {
  console.log('axios - signoutRequest');

  await axios.post('api/user/signout');

  return true;
}

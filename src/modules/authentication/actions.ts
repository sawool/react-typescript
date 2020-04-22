import { createAsyncAction } from 'typesafe-actions';

// Actions
export const AUTH_SIGNIN = 'authenticatoin/AUTH_SIGNIN';
export const AUTH_SIGNIN_SUCCESS = 'authenticatoin/AUTH_SIGNIN_SUCCESS';
export const AUTH_SIGNIN_FAILURE = 'authenticatoin/AUTH_SIGNIN_FAILURE';
export const AUTH_SIGNUP = 'authenticatoin/AUTH_SIGNUP';
export const AUTH_SIGNUP_SUCCESS = 'authenticatoin/AUTH_SIGNUP_SUCCESS';
export const AUTH_SIGNUP_FAILURE = 'authenticatoin/AUTH_SIGNUP_FAILURE';
export const AUTH_VALID = 'authenticatoin/AUTH_VALID';
export const AUTH_VALID_SUCCESS = 'authenticatoin/AUTH_VALID_SUCCESS';
export const AUTH_VALID_FAILURE = 'authenticatoin/AUTH_VALID_FAILURE';

// Action Creator
export const authSigninAsync = createAsyncAction(
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE
)<
  { email: string; password: string },
  undefined,
  { error?: string; message: string }
>();

export const authSignupAsync = createAsyncAction(
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE
)<
  { email: string; username: string; password: string },
  undefined,
  { error?: string; message: string }
>();

export const authValidAsync = createAsyncAction(
  AUTH_VALID,
  AUTH_VALID_SUCCESS,
  AUTH_VALID_FAILURE
)<undefined, undefined, { error?: string; message: string }>();

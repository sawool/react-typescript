import { createAsyncAction } from 'typesafe-actions';

// Actions
export const AUTH_SIGNIN = 'auth/SIGNIN';
export const AUTH_SIGNIN_SUCCESS = 'auth/SIGNIN_SUCCESS';
export const AUTH_SIGNIN_FAILURE = 'auth/SIGNIN_FAILURE';
export const AUTH_SIGNUP = 'auth/SIGNUP';
export const AUTH_SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
export const AUTH_SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE';
export const AUTH_VALID = 'auth/VALID';
export const AUTH_VALID_SUCCESS = 'auth/VALID_SUCCESS';
export const AUTH_VALID_FAILURE = 'auth/VALID_FAILURE';

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

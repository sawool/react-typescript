import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { UserInfo } from '../../services/authentication';

// Actions
export const AUTH_SIGNIN = 'auth/SIGNIN';
export const AUTH_SIGNIN_SUCCESS = 'auth/SIGNIN_SUCCESS';
export const AUTH_SIGNIN_FAILURE = 'auth/SIGNIN_FAILURE';
export const AUTH_SIGNOUT = 'auth/SIGNOUT';
export const AUTH_SIGNOUT_SUCCESS = 'auth/SIGNOUT_SUCCESS';
export const AUTH_SIGNOUT_FAILURE = 'auth/SIGNOUT_FAILURE';

// Action Creator
export const authSigninAsync = createAsyncAction(
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE
)<{ email: string; password: string }, UserInfo, AxiosError>();

export const authSignoutAsync = createAsyncAction(
  AUTH_SIGNOUT,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_SIGNOUT_FAILURE
)<undefined, undefined, AxiosError>();

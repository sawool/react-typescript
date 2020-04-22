import { createReducer } from 'typesafe-actions';
import { AuthenticationAction, AuthenticationState } from './types';
import {
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE,
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_VALID,
  AUTH_VALID_SUCCESS,
  AUTH_VALID_FAILURE,
} from './actions';

// 초기 상태
const initialState: AuthenticationState = {
  signin: {
    status: 'INIT',
    error: '',
    message: '',
  },
  signup: {
    status: 'INIT',
    error: '',
    message: '',
  },
  valid: {
    status: 'INIT',
    error: '',
    message: '',
  },
};

const authentication = createReducer<AuthenticationState, AuthenticationAction>(
  initialState,
  {
    [AUTH_SIGNIN]: (state) => ({
      ...state,
      signin: {
        status: 'WAITING',
        error: '',
        message: '',
      },
    }),
    [AUTH_SIGNIN_SUCCESS]: (state) => ({
      ...state,
      signin: {
        status: 'SUCCESS',
        error: '',
        message: '',
      },
    }),
    [AUTH_SIGNIN_FAILURE]: (state, action) => ({
      ...state,
      signin: {
        status: 'FAILURE',
        error: action.payload.message,
        message: action.payload.message,
      },
    }),
    [AUTH_SIGNUP]: (state) => ({
      ...state,
      signup: {
        status: 'WAITING',
        error: '',
        message: '',
      },
    }),
    [AUTH_SIGNUP_SUCCESS]: (state) => ({
      ...state,
      signup: {
        status: 'SUCCESS',
        error: '',
        message: '',
      },
    }),
    [AUTH_SIGNUP_FAILURE]: (state, action) => ({
      ...state,
      signup: {
        status: 'FAILURE',
        error: action.payload.message,
        message: action.payload.message,
      },
    }),
    [AUTH_VALID]: (state) => ({
      ...state,
      valid: {
        status: 'WAITING',
        error: '',
        message: '',
      },
    }),
    [AUTH_VALID_SUCCESS]: (state) => ({
      ...state,
      valid: {
        status: 'SUCCESS',
        error: '',
        message: '',
      },
    }),
    [AUTH_VALID_FAILURE]: (state, action) => ({
      ...state,
      valid: {
        status: 'FAILURE',
        error: action.payload.message,
        message: action.payload.message,
      },
    }),
  }
);

export default authentication;

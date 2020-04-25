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
import { authAsyncState } from '../../lib/reducerUtils';

// 초기 상태
const initialState: AuthenticationState = {
  signin: authAsyncState.initial(),
  signup: authAsyncState.initial(),
  valid: authAsyncState.initial(),
};

const authentication = createReducer<AuthenticationState, AuthenticationAction>(
  initialState,
  {
    [AUTH_SIGNIN]: (state) => ({
      ...state,
      signin: authAsyncState.request(),
    }),
    [AUTH_SIGNIN_SUCCESS]: (state) => ({
      ...state,
      signin: authAsyncState.success(),
    }),
    [AUTH_SIGNIN_FAILURE]: (state, action) => ({
      ...state,
      signin: authAsyncState.failure(action.payload.message),
    }),
    [AUTH_SIGNUP]: (state) => ({
      ...state,
      signup: authAsyncState.request(),
    }),
    [AUTH_SIGNUP_SUCCESS]: (state) => ({
      ...state,
      signup: authAsyncState.success(),
    }),
    [AUTH_SIGNUP_FAILURE]: (state, action) => ({
      ...state,
      signup: authAsyncState.failure(action.payload.message),
    }),
    [AUTH_VALID]: (state) => ({
      ...state,
      valid: authAsyncState.request(),
    }),
    [AUTH_VALID_SUCCESS]: (state) => ({
      ...state,
      valid: authAsyncState.success(),
    }),
    [AUTH_VALID_FAILURE]: (state, action) => ({
      ...state,
      valid: authAsyncState.failure(action.payload.message),
    }),
  }
);

export default authentication;

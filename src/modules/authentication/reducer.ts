import { createReducer, getType } from 'typesafe-actions';
import { AuthenticationAction, AuthenticationState } from './types';
import { authSigninAsync, authSignoutAsync, authValidAsync } from './actions';
import { asyncState } from '../../lib/reducerUtils';

// 초기 상태
const initialState: AuthenticationState = {
  auth: asyncState.initial(),
};

const authentication = createReducer<AuthenticationState, AuthenticationAction>(
  initialState
)
  .handleAction(
    [authSigninAsync.request, authSigninAsync.success, authSigninAsync.failure],
    // createAsyncReducer(authSigninAsync, 'auth')
    (state, action): AuthenticationState => {
      const request = getType(authSigninAsync.request);
      const success = getType(authSigninAsync.success);
      const failure = getType(authSigninAsync.failure);

      switch (action.type) {
        case request:
          return {
            ...state,
            auth: asyncState.request(),
          };
        case success:
          return { ...state, auth: asyncState.success(action.payload) };
        case failure:
          return { ...state, auth: asyncState.failure(action.payload) };
        default:
          return state;
      }
    }
  )
  .handleAction(
    [
      authSignoutAsync.request,
      authSignoutAsync.success,
      authSignoutAsync.failure,
    ],
    //createAsyncReducer(authSignoutAsync, 'auth')
    (state, action) => {
      const request = getType(authSignoutAsync.request);
      const success = getType(authSignoutAsync.success);
      const failure = getType(authSignoutAsync.failure);

      switch (action.type) {
        case request:
          return {
            ...state,
            auth: asyncState.request(),
          };
        case success:
          return { ...state, auth: asyncState.success() };
        case failure:
          return { ...state, auth: asyncState.failure(action.payload) };
        default:
          return state;
      }
    }
  )
  .handleAction(
    [authValidAsync.request, authValidAsync.success, authValidAsync.failure],
    // createAsyncReducer(authValidAsync, 'auth')
    (state, action) => {
      const request = getType(authValidAsync.request);
      const success = getType(authValidAsync.success);
      const failure = getType(authValidAsync.failure);

      switch (action.type) {
        case request:
          return {
            ...state,
            auth: asyncState.request(),
          };
        case success:
          console.log(asyncState.success())
          return { ...state, auth: asyncState.success(action.payload) };
        case failure:
          return { ...state, auth: asyncState.failure(action.payload) };
        default:
          return state;
      }
    }
  );
export default authentication;

import { createReducer } from 'typesafe-actions';
import { AuthenticationAction, AuthenticationState } from './types';
import { authSigninAsync, authSignoutAsync } from './actions';
import { asyncState, createAsyncReducer } from '../../lib/reducerUtils';

// 초기 상태
const initialState: AuthenticationState = {
  auth: asyncState.initial(),
};

const authentication = createReducer<AuthenticationState, AuthenticationAction>(
  initialState
)
  .handleAction(
    [authSigninAsync.request, authSigninAsync.success, authSigninAsync.failure],
    createAsyncReducer(authSigninAsync, 'auth')
  )
  .handleAction(
    [
      authSignoutAsync.request,
      authSignoutAsync.success,
      authSignoutAsync.failure,
    ],
    createAsyncReducer(authSignoutAsync, 'auth')
  );

export default authentication;

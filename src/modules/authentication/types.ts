import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { AuthAsyncState } from '../../lib/reducerUtils';

export type AuthenticationAction = ActionType<typeof actions>;

export type AuthenticationState = {
  signin: AuthAsyncState;
  signup: AuthAsyncState;
  valid: AuthAsyncState;
};

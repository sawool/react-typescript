import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type AuthenticationAction = ActionType<typeof actions>;

export type AuthenticationState = {
  signin: {
    status: string;
    error: string;
    message: string;
  };
  signup: {
    status: string;
    error: string;
    message: string;
  };
  valid: {
    status: string;
    error: string;
    message: string;
  };
};

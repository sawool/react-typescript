import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { AsyncState } from '../../lib/reducerUtils';
import { UserInfo } from '../../services/authentication';
import { AxiosError } from 'axios';

export type AuthenticationAction = ActionType<typeof actions>;

export type AuthenticationState = {
  auth: AsyncState<UserInfo, AxiosError>;
};

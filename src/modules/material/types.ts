import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { AsyncState } from '../../lib/reducerUtils';
import { MaterialPayload } from '../../services/material';
import { AxiosError } from 'axios';

export type MaterialAction = ActionType<typeof actions>;

export type MaterialState = {
  materials: AsyncState<Array<MaterialPayload>, AxiosError>;
};

import { getType } from 'typesafe-actions';
import { AnyAction } from 'redux';
import { AsyncActionGroup } from './types';

// async request 용 (추후 사용할 예정)
export type AsyncState<T, E = any> = {
  loading: boolean;
  data: T | null;
  error: E | null;
};

export const asyncState = {
  initial: <T, E = any>(initialData?: T): AsyncState<T, E> => ({
    loading: false,
    data: initialData || null,
    error: null,
  }),
  request: <T, E = any>(data?: T): AsyncState<T, E> => ({
    loading: true,
    data: data || null,
    error: null,
  }),
  success: <T, E = any>(data?: T): AsyncState<T, E> => ({
    loading: false,
    data: data || null,
    error: null,
  }),
  failure: <T, E>(error: E): AsyncState<T, E> => ({
    loading: false,
    data: null,
    error: error,
  }),
};

type AnyAsyncActionCreator = AsyncActionGroup<any, any, any, any, any, any>;

export function createAsyncReducer<
  S,
  AC extends AnyAsyncActionCreator,
  K extends keyof S
>(asyncActionCreator: AC, key: K) {
  return (state: S, action: AnyAction) => {
    const [request, success, failure] = [
      asyncActionCreator.request,
      asyncActionCreator.success,
      asyncActionCreator.failure,
    ].map(getType);

    switch (action.type) {
      case request:
        return {
          ...state,
          [key]: asyncState.request(),
        };
      case success:
        return {
          ...state,
          [key]: asyncState.success(action.payload),
        };
      case failure:
        return {
          ...state,
          [key]: asyncState.failure(action.payload),
        };
      default:
        return state;
    }
  };
}

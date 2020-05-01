import { PayloadAction } from 'typesafe-actions';
import { call, put } from 'redux-saga/effects';
import { AsyncActionGroup } from './types';

type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

function isPayloadAction<P>(action: any): action is PayloadAction<string, P> {
  return action.payload !== undefined;
}

export default function createAsyncSaga<
  T1 extends string,
  P1,
  T2 extends string,
  P2,
  T3 extends string,
  P3
>(
  asyncActionCreator: AsyncActionGroup<T1, P1, T2, P2, T3, P3>,
  promiseCreator: PromiseCreatorFunction<P1, P2>
) {
  return function* saga(action: ReturnType<typeof asyncActionCreator.request>) {
    try {
      const result = isPayloadAction<P1>(action)
        ? yield call(promiseCreator, action.payload)
        : yield call(promiseCreator);
      yield put(asyncActionCreator.success(result));
    } catch (err) {
      yield put(asyncActionCreator.failure(err));
    }
  };
}

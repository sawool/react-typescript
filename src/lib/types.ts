import { EmptyActionCreator, PayloadActionCreator } from 'typesafe-actions';

export type AsyncActionGroup<
  T1 extends string,
  P1,
  T2 extends string,
  P2,
  T3 extends string,
  P3
> = {
  request: EmptyActionCreator<T1> | PayloadActionCreator<T1, P1>;
  success: EmptyActionCreator<T2> | PayloadActionCreator<T2, P2>;
  failure: EmptyActionCreator<T3> | PayloadActionCreator<T3, P3>;
};

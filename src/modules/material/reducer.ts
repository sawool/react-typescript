import { createReducer } from 'typesafe-actions';
import { MaterialAction, MaterialState } from './types';
import {
  // postMaterialAsync,
  getMaterialAsync,
  // putMaterialAsync,
} from './actions';
import { asyncState, createAsyncReducer } from '../../lib/reducerUtils';

// 초기 상태
const initialState: MaterialState = {
  materials: asyncState.initial(),
};

const material = createReducer<MaterialState, MaterialAction>(initialState)
  // .handleAction(
  //   [
  //     postMaterialAsync.request,
  //     postMaterialAsync.success,
  //     postMaterialAsync.failure,
  //   ],
  //   createAsyncReducer(postMaterialAsync, 'materials')
  // )
  // .handleAction(
  //   [
  //     putMaterialAsync.request,
  //     putMaterialAsync.success,
  //     putMaterialAsync.failure,
  //   ],
  //   createAsyncReducer(putMaterialAsync, 'materials')
  // )
  .handleAction(
    [
      getMaterialAsync.request,
      getMaterialAsync.success,
      getMaterialAsync.failure,
    ],
    createAsyncReducer(getMaterialAsync, 'materials')
  );

export default material;

import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { MaterialPayload } from '../../services/material';

// Actions
// export const POST_MATERIAL = 'material/POST';
// export const POST_MATERIAL_SUCCESS = 'material/POST_SUCCESS';
// export const POST_MATERIAL_FAILURE = 'material/POST_FAILURE';
export const GET_MATERIAL = 'material/GET';
export const GET_MATERIAL_SUCCESS = 'material/GET_SUCCESS';
export const GET_MATERIAL_FAILURE = 'material/GET_FAILURE';
// export const PUT_MATERIAL = 'material/PUT';
// export const PUT_MATERIAL_SUCCESS = 'material/PUT_SUCCESS';
// export const PUT_MATERIAL_FAILURE = 'material/PUT_FAILURE';

// Action Creator
// export const postMaterialAsync = createAsyncAction(
//   POST_MATERIAL,
//   POST_MATERIAL_SUCCESS,
//   POST_MATERIAL_FAILURE
// )<MaterialPayload, boolean, AxiosError>();

export const getMaterialAsync = createAsyncAction(
  GET_MATERIAL,
  GET_MATERIAL_SUCCESS,
  GET_MATERIAL_FAILURE
)<undefined, Array<MaterialPayload>, AxiosError>();

// export const putMaterialAsync = createAsyncAction(
//   PUT_MATERIAL,
//   PUT_MATERIAL_SUCCESS,
//   PUT_MATERIAL_FAILURE
// )<MaterialPayload, boolean, AxiosError>();

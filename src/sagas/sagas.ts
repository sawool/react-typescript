import { takeLatest, fork } from 'redux-saga/effects';
import {
  AUTH_SIGNIN,
  AUTH_SIGNOUT,
  AUTH_VALID,
  authSigninAsync,
  authSignoutAsync,
  authValidAsync,
} from '../modules/authentication';
import {
  // POST_MATERIAL,
  GET_MATERIAL,
  // postMaterialAsync,
  getMaterialAsync,
} from '../modules/material';
import Api from '../services';
import createAsyncSaga from '../lib/createAsyncSaga';

const signoutRequest = createAsyncSaga(authSignoutAsync, Api.signoutRequest);
const signinRequest = createAsyncSaga(authSigninAsync, Api.signinRequest);
const validRequest = createAsyncSaga(authValidAsync, Api.isValidRequest);
// const postMaterialRequest = createAsyncSaga(
//   postMaterialAsync,
//   Api.materialPostRequest
// );
const getMaterialRequest = createAsyncSaga(
  getMaterialAsync,
  Api.materialGetRequest
);

export function* watchSignin() {
  yield takeLatest(AUTH_SIGNIN, signinRequest);
}

export function* watchSignout() {
  yield takeLatest(AUTH_SIGNOUT, signoutRequest);
}

export function* watchValid() {
  yield takeLatest(AUTH_VALID, validRequest);
}

// export function* watchPostMaterial() {
//   yield takeLatest(POST_MATERIAL, postMaterialRequest);
// }

export function* watchGetMaterial() {
  yield takeLatest(GET_MATERIAL, getMaterialRequest);
}

export default function* root() {
  yield fork(watchSignin);
  yield fork(watchSignout);
  yield fork(watchValid);
  // yield fork(watchPostMaterial);
  yield fork(watchGetMaterial);
}

import { takeLatest, fork } from 'redux-saga/effects';
import { AUTH_SIGNIN, AUTH_SIGNOUT } from '../modules/authentication';
import { authSigninAsync, authSignoutAsync } from '../modules/authentication';
import Api from '../services';
import createAsyncSaga from '../lib/createAsyncSaga';

const signoutRequest = createAsyncSaga(authSignoutAsync, Api.signoutRequest);
const signinRequest = createAsyncSaga(authSigninAsync, Api.signinRequest);

export function* watchSignin() {
  yield takeLatest(AUTH_SIGNIN, signinRequest);
}

export function* watchSignout() {
  yield takeLatest(AUTH_SIGNOUT, signoutRequest);
}

export default function* root() {
  yield fork(watchSignin);
  yield fork(watchSignout);
}

import { call, put, takeLatest, fork } from 'redux-saga/effects';
import {
  AUTH_SIGNIN,
  AUTH_SIGNUP,
  AUTH_VALID,
} from '../modules/authentication';
import {
  authSigninAsync,
  authSignupAsync,
  authValidAsync,
} from '../modules/authentication';
import Api from '../services';

function* signupRequest(action: ReturnType<typeof authSignupAsync.request>) {
  console.log('saga - signupRequest');

  try {
    yield call(Api.signupRequest, action.payload);
    yield put(authSignupAsync.success());
  } catch (error) {
    yield put(
      authSignupAsync.failure({
        message: error.response.data.message,
      })
    );
  }
}

function* signinRequest(action: ReturnType<typeof authSigninAsync.request>) {
  console.log('saga - signinRequest');

  try {
    const res = yield call(Api.signinRequest, action.payload);
    console.log(res);
    yield put(authSigninAsync.success());
  } catch (error) {
    yield put(
      authSigninAsync.failure({
        message: error.response.data.message,
      })
    );
  }
}

function* isValidRequest() {
  console.log('saga - isValidRequest');

  try {
    const res = yield call(Api.isValidRequest);
    console.log(res);
    yield put(authValidAsync.success());
  } catch (error) {
    yield put(
      authValidAsync.failure({
        message: error.response.data.message,
      })
    );
  }
}

export function* watchSignin() {
  yield takeLatest(AUTH_SIGNIN, signinRequest);
}

export function* watchSignup() {
  yield takeLatest(AUTH_SIGNUP, signupRequest);
}

export function* watchValid() {
  yield takeLatest(AUTH_VALID, isValidRequest);
}

export default function* root() {
  yield fork(watchSignin);
  yield fork(watchSignup);
  yield fork(watchValid);
}

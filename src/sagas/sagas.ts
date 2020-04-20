import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { signin, signup } from '../modules/authentication';
import Api from '../services';

function* signupRequest(action: ReturnType<typeof signup>) {
  console.log('saga - signupRequest');

  try {
    yield call(Api.signupRequest, action.payload);
    yield put({ type: 'AUTH_SIGNUP_SUCCESS' });
  } catch (error) {
    yield put({
      type: 'AUTH_SIGNUP_FAILURE',
      message: error.response.data.message,
    });
  }
}

function* signinRequest(action: ReturnType<typeof signin>) {
  console.log('saga - signinRequest');

  try {
    const res = yield call(Api.signinRequest, action.payload);
    console.log(res);
    yield put({ type: 'AUTH_SIGNIN_SUCCESS' });
  } catch (error) {
    yield put({
      type: 'AUTH_SIGNIN_FAILURE',
      message: error.response.data.message,
    });
  }
}

function* isValidRequest() {
  console.log('saga - isValidRequest');

  try {
    const res = yield call(Api.isValidRequest);
    console.log(res);
    yield put({ type: 'AUTH_VALID_SUCCESS' });
  } catch (error) {
    yield put({
      type: 'AUTH_VALID_FAILURE',
      message: error.response.data.message,
    });
  }
}

export function* watchSignin() {
  yield takeLatest('AUTH_SIGNIN', signinRequest);
}

export function* watchSignup() {
  yield takeLatest('AUTH_SIGNUP', signupRequest);
}

export function* watchValid() {
  yield takeLatest('AUTH_VALID', isValidRequest);
}

export default function* root() {
  yield fork(watchSignin);
  yield fork(watchSignup);
  yield fork(watchValid);
}

import update from 'immutability-helper';

// Actions
const AUTH_SIGNIN = 'AUTH_SIGNIN' as const;
const AUTH_SIGNIN_SUCCESS = 'AUTH_SIGNIN_SUCCESS' as const;
const AUTH_SIGNIN_FAILURE = 'AUTH_SIGNIN_FAILURE' as const;
const AUTH_SIGNUP = 'AUTH_SIGNUP' as const;
const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS' as const;
const AUTH_SIGNUP_FAILURE = 'AUTH_SIGNUP_FAILURE' as const;
const AUTH_VALID = 'AUTH_VALID' as const;
const AUTH_VALID_SUCCESS = 'AUTH_VALID_SUCCESS' as const;
const AUTH_VALID_FAILURE = 'AUTH_VALID_FAILURE' as const;

// Action Creators
/* SIGNIN */
export const signin = (email: string, password: string) => ({
  type: AUTH_SIGNIN,
  payload: {
    email,
    password,
  },
});

export const signinSuccess = (email: string) => ({
  type: AUTH_SIGNIN_SUCCESS,
});

export const signinFailure = (error: string, message: string) => ({
  type: AUTH_SIGNIN_FAILURE,
  error,
  message,
});

export const signup = (email: string, username: string, password: string) => ({
  type: AUTH_SIGNUP,
  payload: {
    email,
    username,
    password,
  },
});

export const signupSuccess = () => ({
  type: AUTH_SIGNUP_SUCCESS,
});

export const signupFailure = (error: string, message: string) => ({
  type: AUTH_SIGNUP_FAILURE,
  error,
  message,
});

export const valid = () => ({
  type: AUTH_VALID,
});

export const validSuccess = () => ({
  type: AUTH_VALID_SUCCESS,
});

export const validFailure = (error: string, message: string) => ({
  type: AUTH_VALID_FAILURE,
  error,
  message,
});

// Action type 선언
export type AuthenticationAction =
  | ReturnType<typeof signin>
  | ReturnType<typeof signinSuccess>
  | ReturnType<typeof signinFailure>
  | ReturnType<typeof signup>
  | ReturnType<typeof signupSuccess>
  | ReturnType<typeof signupFailure>
  | ReturnType<typeof valid>
  | ReturnType<typeof validSuccess>
  | ReturnType<typeof validFailure>;

// State
// 1. state type 선언
export type AuthenticationState = {
  signin: {
    status: string;
    error: string;
    message: string;
  };
  signup: {
    status: string;
    error: string;
    message: string;
  };
  valid: {
    status: string;
    error: string;
    message: string;
  };
};

// 2. initial state 세팅
const initialState: AuthenticationState = {
  signin: {
    status: 'INIT',
    error: '',
    message: '',
  },
  signup: {
    status: 'INIT',
    error: '',
    message: '',
  },
  valid: {
    status: 'INIT',
    error: '',
    message: '',
  },
};

// 리듀서
function authentication(
  state: AuthenticationState = initialState,
  action: AuthenticationAction
): AuthenticationState {
  console.log('reducer - ' + action.type);
  switch (action.type) {
    case AUTH_SIGNIN:
      return update(state, {
        signin: {
          status: { $set: 'WAITING' },
        },
      });
    case AUTH_SIGNIN_SUCCESS:
      return update(state, {
        signin: {
          status: { $set: 'SUCCESS' },
        },
      });
    case AUTH_SIGNIN_FAILURE:
      return update(state, {
        signin: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
          message: { $set: action.message },
        },
      });
    case AUTH_SIGNUP:
      return update(state, {
        signup: {
          status: { $set: 'WAITING' },
        },
      });
    case AUTH_SIGNUP_SUCCESS:
      return update(state, {
        signup: {
          status: { $set: 'SUCCESS' },
        },
      });
    case AUTH_SIGNUP_FAILURE:
      return update(state, {
        signup: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
          message: { $set: action.message },
        },
      });
    default:
      return state;
  }
}

export default authentication;

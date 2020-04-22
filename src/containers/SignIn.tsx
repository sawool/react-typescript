import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '../modules';
import { authSigninAsync } from '../modules/authentication';
import { SignInRequest } from '../services/authentication';
import SignCommon from '../components/SignCommon';

type SignInComponentProps = RouteComponentProps<any> & {};

function SignIn({ history }: SignInComponentProps) {
  const { status, message } = useSelector(
    (state: RootStateType) => state.authentication.signin
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'SUCCESS') {
      history.push('/home');
    }
  }, [history, status]);

  const handleLogin = (data: SignInRequest) => {
    console.log(data);
    dispatch(
      authSigninAsync.request({ email: data.email, password: data.password })
    );
  };

  return (
    <>
      <SignCommon
        isSignUp={false}
        handleLogin={handleLogin}
        errorMessage={message}
      />
    </>
  );
}

export default withRouter(SignIn);

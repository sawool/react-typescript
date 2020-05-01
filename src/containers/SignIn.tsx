import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '../modules';
import { authSigninAsync } from '../modules/authentication';
import { SignInRequest } from '../services/authentication';
import SignCommon from '../components/SignCommon';

type SignInComponentProps = RouteComponentProps<any> & {};

function SignIn({ history }: SignInComponentProps) {
  const { loading, data, error } = useSelector(
    (state: RootStateType) => state.authentication.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading === false && data) {
      history.push('/home');
    }
  }, [data, history, loading]);

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
        errorMessage={error?.response?.data.message}
      />
    </>
  );
}

export default withRouter(SignIn);

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootStateType } from '../modules';
import { authSignupAsync } from '../modules/authentication';
import { SignUpRequest } from '../services/authentication';
import SignCommon from '../components/SignCommon';

type SignUpComponentProps = RouteComponentProps<any> & {};

function SignUp({ history }: SignUpComponentProps) {
  const { status, message } = useSelector(
    (state: RootStateType) => state.authentication.signup
  );
  const dispatch = useDispatch();

  const handleJoin = (data: SignUpRequest) => {
    dispatch(
      authSignupAsync.request({
        email: data.email,
        username: data.username,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (status === 'SUCCESS') {
      history.push('/signin');
    }
  }, [history, status]);

  return (
    <SignCommon
      isSignUp={true}
      handleJoin={handleJoin}
      errorMessage={message}
    />
  );
}

export default withRouter(SignUp);

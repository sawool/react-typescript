import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { SignUpRequest } from '../services/authentication';
import Api from '../services';
import SignCommon from '../components/SignCommon';

type SignUpComponentProps = RouteComponentProps<any> & {};

function SignUp({ history }: SignUpComponentProps) {
  const [message, setMessage] = useState('');

  const handleJoin = (data: SignUpRequest) => {
    try {
      Api.signupRequest(data);
      history.push('/signin');
    } catch (error) {
      setMessage(error?.response?.data.message);
    }
  };

  return (
    <SignCommon
      isSignUp={true}
      handleJoin={handleJoin}
      errorMessage={message}
    />
  );
}

export default withRouter(SignUp);

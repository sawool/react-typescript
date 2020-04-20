import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './SignCommon.css';
import { Link } from 'react-router-dom';
import { SignInRequest, SignUpRequest } from '../services/authentication';

type SignCommonProps = {
  isSignUp: Boolean;
  errorMessage?: string;
  handleLogin: (data: SignInRequest) => void;
  handleJoin: (data: SignUpRequest) => void;
};

function SignCommon({
  isSignUp,
  errorMessage,
  handleLogin,
  handleJoin,
}: SignCommonProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signUpHtml = (
    <>
      <span>이미 가입되어 있으면 </span>
      <Link to="/signin">Sign In</Link>
    </>
  );

  const singInHtml = (
    <>
      <span>가입하시겠습니까 ? </span>
      <Link to="/signup">Sign Up</Link>
    </>
  );

  const handleSubmit = (e: React.FormEvent) => {
    if (isSignUp) {
      let joinData: SignUpRequest = {
        email,
        username,
        password,
      };
      handleJoin(joinData);
    } else {
      let loginData: SignInRequest = {
        email,
        password,
      };
      handleLogin(loginData);
    }

    e.preventDefault();
  };

  return (
    <div className="signCommon">
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicLabel">
          <h3> {isSignUp ? 'Sing Up' : 'Sing In'} </h3>
        </Form.Group>

        {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}

        {isSignUp ? (
          <Form.Group className="username" controlId="formBasicUsername">
            <Form.Label>
              Username <span className="requiredText">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
            />
          </Form.Group>
        ) : null}

        <Form.Group className="email" controlId="formBasicEmail">
          <Form.Label>
            Email address <span className="requiredText">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="password" controlId="formBasicPassword">
          <Form.Label>
            Password <span className="requiredText">*</span>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button className="button" variant="primary" type="submit">
          {isSignUp ? 'Sing Up' : 'Sing In'}
        </Button>

        <Form.Label className="label">
          {isSignUp ? signUpHtml : singInHtml}
        </Form.Label>
      </Form>
    </div>
  );
}

SignCommon.defaultProps = {
  isSignUp: true,
  errorMessage: '',
  handleLogin: () => {
    console.log('handle login');
  },
  handleJoin: () => {
    console.log('handle join');
  },
};

export default SignCommon;

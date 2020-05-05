import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';

type HeaderProps = RouteComponentProps<any> & {
  isSignin: boolean;
  username: string;
};

function Header({ isSignin, username, history }: HeaderProps) {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="header">
        <Navbar.Brand className="mr-auto">React with Typescript</Navbar.Brand>
        <Form className="form" inline>
          {isSignin ? (
            <Form.Label className="username">{username}</Form.Label>
          ) : (
            <Button
              variant="outline-light"
              onClick={() => history.push('/signin')}
            >
              Signin
            </Button>
          )}
        </Form>
      </Navbar>
    </>
  );
}

export default withRouter(Header);

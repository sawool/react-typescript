import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import ProfileDropdown from './ProfileDropdown';
import './Header.css';

type HeaderProps = RouteComponentProps<any> & {
  isSignin?: boolean;
  username?: string;
  email?: string;
};

function Header({ isSignin, username, email, history }: HeaderProps) {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="header">
        <Navbar.Brand as={Link} to="/home" className="mr-auto">
          React with Typescript
        </Navbar.Brand>
        <Form className="form" inline>
          {isSignin ? (
            <ProfileDropdown username={username} email={email} />
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

Header.defaultProps = {
  isSignin: false,
  username: '',
};

export default withRouter(Header);

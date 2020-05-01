import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Api from '../services';

type HomeComponentProps = RouteComponentProps<any> & {};

function Home({ history }: HomeComponentProps) {
  const handleClick = async () => {
    try {
      await Api.isValidRequest();
    } catch (err) {
      console.error(err.response.data.message);
      history.push('/signin');
    }
  };

  const handleSingout = async () => {
    try {
      await Api.signoutRequest();
      history.push('/signin');
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleClick}>Check Validation</Button>
      <Button onClick={handleSingout}>Sign Out</Button>
    </div>
  );
}

export default withRouter(Home);

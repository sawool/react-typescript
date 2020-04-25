import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { authValidAsync } from '../modules/authentication';
import { RootStateType } from '../modules';

type HomeComponentProps = RouteComponentProps<any> & {};

function Home({ history }: HomeComponentProps) {
  const { status, message } = useSelector(
    (state: RootStateType) => state.authentication.valid
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'FAILURE') history.push('/signin');
  }, [history, status]);

  useEffect(() => {
    if (message) alert(message);
  }, [message]);

  const handleClick = async () => {
    dispatch(authValidAsync.request());
  };

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleClick}>Check Validation</Button>
    </div>
  );
}

export default withRouter(Home);

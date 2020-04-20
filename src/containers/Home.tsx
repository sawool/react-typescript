import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { valid } from '../modules/authentication';
import { RootStateType } from '../modules';

function Home() {
  const { message } = useSelector(
    (state: RootStateType) => state.authentication.valid
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) alert(message);
  }, [message]);

  const handleClick = async () => {
    dispatch(valid());
  };

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleClick}>Check Validation</Button>
    </div>
  );
}

export default Home;

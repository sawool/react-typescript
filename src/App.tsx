import React from 'react';
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import Header from './components/Header';
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Route exact path="/" component={SignIn} />
      <Route path="/home" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/header" component={Header} />
    </>
  );
}

export default App;

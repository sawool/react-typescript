import React from 'react';
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import Header from './components/Header';
import Material from './components/Material';
import SideMenu from './components/SideMenu';
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Route exact path="/" component={SignIn} />
      <Route path="/home" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/header" component={Header} />
      <Route path="/material" component={Material} />
      <Route path="/sideMenu" component={SideMenu} />
    </>
  );
}

export default App;

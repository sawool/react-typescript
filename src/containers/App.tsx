import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { RootStateType } from '../modules';

import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Header from '../components/Header';
import Material from './Material';
import MaterialList from './MaterialList';
import SideMenu from '../components/SideMenu';
import './App.css';

type AppComponentProps = RouteComponentProps<any> & {};

function App({ location }: AppComponentProps) {
  const { data } = useSelector(
    (state: RootStateType) => state.authentication.auth
  );

  // useEffect(() => {
  //   const beforeunloadListener = (ev: BeforeUnloadEvent) => {
  //     ev.preventDefault();
  //     console.log(ev);

  //     return false;
  //     // console.log('delete data');
  //     // localStorage.removeItem('state');'
  //   };

  //   window.addEventListener('beforeunload', beforeunloadListener);

  //   return () => {
  //     window.removeEventListener('beforeunload', beforeunloadListener);
  //   };
  // }, []);

  const re = /(signin|signup)/;
  const isAuth = re.test(location.pathname);

  return (
    <Container className="app-container" fluid>
      {isAuth ? undefined : (
        <Row>
          <Col>
            <Header
              isSignin={data ? true : false}
              username={data?.username}
            ></Header>
          </Col>
        </Row>
      )}
      <main className="app-container-main">
        <Row className="app-container-main-row">
          {isAuth ? undefined : (
            <Col sm={2}>
              <SideMenu></SideMenu>
            </Col>
          )}
          <Col>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/material" component={Material} />
            <Route path="/materials" component={MaterialList} />
            <Route path="/sideMenu" component={SideMenu} />
          </Col>
        </Row>
      </main>
    </Container>
  );
}

export default App;

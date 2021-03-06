import React from 'react';
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
import Menu from './Menu';
import User from './User';
import './App.css';

type AppComponentProps = RouteComponentProps<any> & {};

function App({ location }: AppComponentProps) {
  const { data } = useSelector(
    (state: RootStateType) => state.authentication.auth
  );

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
              email={data?.email}
            ></Header>
          </Col>
        </Row>
      )}
      <main className="app-container-main">
        <Row className="app-container-main-row">
          {data ? (
            <Col sm={2}>
              <SideMenu></SideMenu>
            </Col>
          ) : undefined}
          <Col>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/material" component={Material} />
            <Route path="/materials" component={MaterialList} />
            <Route path="/menu" component={Menu} />
            <Route path="/user" component={User} />
          </Col>
        </Row>
      </main>
    </Container>
  );
}

export default App;

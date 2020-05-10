import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import Header from './components/Header';
import Material from './components/Material';
import SideMenu from './components/SideMenu';
import './App.css';

type AppComponentProps = RouteComponentProps<any> & {};

function App({ location }: AppComponentProps) {
  const re = /(signin|signup)/;
  const isAuth = re.test(location.pathname);

  return (
    <Container className="app-container" fluid>
      {isAuth ? undefined : (
        <Row>
          <Col>
            <Header></Header>
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
            <Route path="/sideMenu" component={SideMenu} />
          </Col>
        </Row>
      </main>
    </Container>
  );
}

export default App;

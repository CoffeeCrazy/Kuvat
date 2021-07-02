import React, { Component, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Etusivu from './components/Etusivu';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Photos from './components/Photos';
import Kuva from './components/Kuva';

interface State{
                  merkit : any[],
                  tiedotHaettu : boolean,
                  virhe : string
                }
const App : React.FC = () => {

  const [data, setData] = useState<State>({
      merkit : [],
      tiedotHaettu : false,
      virhe : ""
  }
  );
  
  return (
    <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/Etusivu">Etusivu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/Photos">Kuvat</Nav.Link>
              </Nav>
          </Navbar.Collapse>
        </Navbar>
      <Container> 
        <Route exact path="/" component={Photos}></Route>
        <Route exact path="/Photos/" component={Photos}></Route>
        <Route exact path="/Photos/:indeksi" component={Photos}></Route>
        <Route exact path="/Etusivu" component={Etusivu}></Route>
        <Route exact path="/kuva/:indeksi" component={Kuva}></Route>
      </Container>
    </Router>
  )
}
export default App;
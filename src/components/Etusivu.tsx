import React, { Component, useEffect, useState } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Etusivu : React.FC = () => {
  return (
    
    <Jumbotron>
    <h1>Tervetuloa!</h1>
    <p>
        Täältä löydät <b>mahtavan</b> kokoelman kuvia. Paina alhaalla olevaa nappia tutustuaksesi niihin!
    </p>
    <p>
        <Button variant="primary" as={Link} to="/Photos" >Selaa Kuvia</Button>
    </p>
    </Jumbotron>
    
  )
}
export default Etusivu;
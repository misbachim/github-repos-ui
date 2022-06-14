import React from 'react';
import './App.css';
import logo from './logo.png';
import { Github } from './features/github/Github';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Image className="w-25 p-3" fluid src={logo} />
      <Github />
    </Container>
  );
}

export default App;

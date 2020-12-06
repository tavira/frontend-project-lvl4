import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Channels from './components/channels';
import InputMessage from './components/inputMessage/inputMessage';
import Messages from './components/messages/messages';

const App = () => (
  <Container fluid>
    <Row>
      <Col lg={3} style={{ borderRight: '1px solid gray' }}><Channels /></Col>
      <Col>
        <Messages style={{ height: '80vh', overflowY: 'scroll' }} />
        <InputMessage />
      </Col>
    </Row>
  </Container>
);

export default App;

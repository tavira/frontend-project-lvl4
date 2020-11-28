import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Channels from './components/channels';
import InputMessage from './components/inputMessage/inputMessage';
import Messages from './components/messages';

const App = () => (
  <Container fluid>
    <Row>
      <Col lg={3} style={{ borderRight: '1px solid gray' }}><Channels /></Col>
      <Col lg={{ span: 8, offset: 1 }}>
        <Row lg={1} data-testid="messages-block">
          <Messages style={{ height: '80vh', overflowY: 'scroll' }} />
        </Row>
        <Row lg={1}>
          <InputMessage />
        </Row>
      </Col>
    </Row>
  </Container>
);

export default App;

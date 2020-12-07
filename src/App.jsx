import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Channels from './components/channels';
import InputMessage from './components/inputMessage/inputMessage';
import Messages from './components/messages/messages';

const App = () => (
  <Row className="h-100">
    <Col lg={3} className="h-100">
      <Channels />
    </Col>
    <Col lg={9} className="h-100 d-flex flex-column justify-content-between">
      <Messages style={{ height: '85%' }} />
      <InputMessage />
    </Col>
  </Row>
);

export default App;

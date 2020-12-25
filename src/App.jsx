import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Channels from './components/channels/Channels';
import InputMessage from './components/inputMessage/InputMessage';
import Messages from './components/messages/Messages';

const App = () => (
  <Row className="h-100">
    <Col lg={3} className="mh-100 d-flex flex-column">
      <Channels />
    </Col>
    <Col lg={9} className="d-flex flex-column mh-100 mb-1 overflow-hidden">
      <Messages />
      <InputMessage />
    </Col>
  </Row>
);

export default App;

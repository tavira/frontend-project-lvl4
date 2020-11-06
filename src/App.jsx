import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import Channels from './components/channels';
import EditedMessage from './components/editedMessage';
import UserContext from './contexts/UserContext';

const App = () => (
  <Container fluid>
    <Row>
      <Col lg={3}><Channels /></Col>
      <Col lg={9}><EditedMessage /></Col>
    </Row>
  </Container>
);

const render = (store, username) => {
  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default render;

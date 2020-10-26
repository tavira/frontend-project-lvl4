import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Channels from './components/channels';

const App = ({ state }) => (
  <Container fluid>
    <Row>
      <Col lg={3}><Channels channels={state.channels} /></Col>
    </Row>
  </Container>
);

const render = (gon) => {
  ReactDOM.render(
    <App state={gon} />,
    document.getElementById('chat'),
  );
};

App.propTypes = {
  state: PropTypes.shape({
    channels: PropTypes.array.isRequired,
  }).isRequired,
};

export default render;

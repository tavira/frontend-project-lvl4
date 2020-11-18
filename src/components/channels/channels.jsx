import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dropdown, Button, ButtonGroup, Row, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddChannel from './addChannel';
import {
  selectChannels,
  switchChannel,
} from './channelsSlice';

const Channels = () => {
  const channels = useSelector(selectChannels);

  return (
    <Row data-testid="channels">
      <Col>
        <Row><h2>Channels</h2></Row>
        <Row><AddChannel /></Row>
        <Row data-testid="channels-list"><ChannelsList channels={channels} /></Row>
      </Col>
    </Row>
  );
};

const ChannelsList = ({ channels }) => (
  channels.map((channel) => (
    <Channel key={channel.id} channel={channel} />
  ))
);

const Channel = ({ channel }) => {
  const { id, name } = channel;
  const dispatch = useDispatch();

  return (
    <Dropdown as={ButtonGroup} style={{ width: '100%' }}>
      <Button
        variant="outline-primary"
        style={{ textAlign: 'left' }}
        onClick={() => dispatch(switchChannel({ id }))}
      >
        {name}
      </Button>
    </Dropdown>
  );
};

Channel.propTypes = {
  channel: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    removable: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Channels;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dropdown, Button, ButtonGroup, Row, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddChannel from './addChannel';
import {
  selectChannels,
  switchChannel,
  renameChannel,
} from './channelsSlice';
import RenameModal from '../modals/RenameModal';

const Channels = () => {
  const channels = useSelector(selectChannels);

  return (
    <Row data-testid="channels">
      <Col>
        <Row><h2>Channels</h2></Row>
        <Row style={{ paddingTop: '10px' }}><AddChannel /></Row>
        <Row
          data-testid="channels-list"
          style={{ paddingTop: '10px' }}
        >
          <ChannelsList channels={channels} />
        </Row>
      </Col>
    </Row>
  );
};

const ChannelsList = ({ channels }) => (
  channels.map((channel) => (
    <Channel key={channel.id} channel={channel} />
  ))
);

const renderModal = ({ modalInfo, hideModal }) => {
  switch (modalInfo.type) {
    case 'no-modal':
      return null;
    case 'rename':
      return (
        <RenameModal
          info={modalInfo.data}
          hideModal={hideModal}
          action={renameChannel}
        />
      );
    default:
      throw new Error(`unknown state: ${modalInfo.state}`);
  }
};

const Channel = ({ channel }) => {
  const { id, name, removable } = channel;

  const [modalInfo, setModalInfo] = useState({ type: 'no-modal', data: null });
  const hideModal = () => setModalInfo({ type: 'no-modal', data: null });

  const dispatch = useDispatch();

  return (
    <>
      <Dropdown
        as={ButtonGroup}
        style={{ width: '100%' }}
        variant="outline-secondary"
      >
        <Button
          variant="outline-secondary"
          style={{ width: '100%', textAlign: 'left' }}
          onClick={() => dispatch(switchChannel({ id }))}
        >
          {name}
        </Button>
        {
          removable && (
            <>
              <Dropdown.Toggle variant="outline-secondary" split={false} />
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setModalInfo({ type: 'rename', data: channel })}>
                  Rename
                </Dropdown.Item>
              </Dropdown.Menu>
            </>
          )
        }
      </Dropdown>
      {renderModal({ modalInfo, hideModal })}
    </>
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

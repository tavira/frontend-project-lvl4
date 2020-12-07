import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dropdown, Button, ButtonGroup, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AddChannel from './addChannel';
import {
  selectChannels,
  switchChannel,
  renameChannel,
  removeChannel,
} from './channelsSlice';
import RenameModal from '../modals/renameModal';
import RemoveModal from '../modals/removeModal';

const Channels = () => {
  const [t] = useTranslation();
  const channels = useSelector(selectChannels);

  return (
    <div className="d-flex flex-column h-100">
      <Row><h2>{t('channels.header')}</h2></Row>
      <Row><AddChannel /></Row>
      <Row
        data-testid="channels-list"
        className="mt-2 pt-1"
        style={{ overflowY: 'scroll' }}
      >
        <ChannelsList channels={channels} />
      </Row>
    </div>
  );
};

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
    case 'remove':
      return (
        <RemoveModal
          info={modalInfo.data}
          hideModal={hideModal}
          action={removeChannel}
        />
      );
    default:
      throw new Error(`unknown state: ${modalInfo.state}`);
  }
};

const ChannelsList = ({ channels }) => {
  const [modalInfo, setModalInfo] = useState({ type: 'no-modal', data: null });
  const hideModal = () => setModalInfo({ type: 'no-modal', data: null });

  return (
    <>
      {
        channels.map(
          (channel) => <Channel key={channel.id} channel={channel} setModalInfo={setModalInfo} />,
        )
      }
      {renderModal({ modalInfo, hideModal })}
    </>
  );
};

const Channel = ({ channel, setModalInfo }) => {
  const { id, name, removable } = channel;

  const dispatch = useDispatch();

  return (
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
                <Dropdown.Item onClick={() => setModalInfo({ type: 'remove', data: channel })}>
                  Remove
                </Dropdown.Item>
              </Dropdown.Menu>
            </>
          )
        }
    </Dropdown>
  );
};

ChannelsList.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

Channel.propTypes = {
  channel: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    removable: PropTypes.bool.isRequired,
  }).isRequired,
  setModalInfo: PropTypes.func.isRequired,
};

export default Channels;

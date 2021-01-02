import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dropdown, Button, ButtonGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AddChannel from './AddChannel';
import {
  selectChannels,
  switchChannel,
} from './channelsSlice';
import RenameModal from '../modals/RenameModal';
import RemoveModal from '../modals/RemoveModal';
import api from '../../api';

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectChannels);

  return (
    <>
      <h2 className="flex-grow-0 flex-shrink-1">{t('channels.header')}</h2>
      <AddChannel />
      <div
        data-testid="channels-list"
        className="mt-2 pt-1 flex-grow-1 flex-shrink-1 overflow-auto"
      >
        <ChannelsList channels={channels} />
      </div>
    </>
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
          action={api.renameChannel}
        />
      );
    case 'remove':
      return (
        <RemoveModal
          info={modalInfo.data}
          hideModal={hideModal}
          action={api.removeChannel}
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
      className="w-100"
      variant="outline-secondary"
    >
      <Button
        className="text-truncate w-100 text-left"
        title={name}
        variant="outline-secondary"
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

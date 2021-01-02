import React from 'react';
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
import { openModal } from '../modals/modalsSlice';

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

const ChannelsList = ({ channels }) => (
  <>
    {
        channels.map(
          (channel) => <Channel key={channel.id} channel={channel} />,
        )
      }
  </>
);

const Channel = ({ channel }) => {
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
                <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renaming', context: channel }))}>
                  Rename
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(openModal({ type: 'removing', context: channel }))}>
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
};

export default Channels;

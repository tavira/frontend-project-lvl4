import React from 'react';
import PropTypes from 'prop-types';


const renderChannel = (channel) => (
  <li key={channel.id}>{channel.name}</li>
);

const renderChannelList = (channels) => (
  channels.map(renderChannel)
);

const ChannelsList = ({ channels }) => (
  <>
    <h2>Channels</h2>
    <ul>{renderChannelList(channels)}</ul>
  </>
);

ChannelsList.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      removable: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ChannelsList;

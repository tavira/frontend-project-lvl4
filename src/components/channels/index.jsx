import React from 'react';
import { useSelector } from 'react-redux';


const renderChannel = (channel) => (
  <li key={channel.id}>{channel.name}</li>
);

const renderChannelList = (channels) => (
  channels.map(renderChannel)
);

const ChannelsList = () => {
  const channels = useSelector((state) => state.channels.entities);
  console.log('channels', channels);
  return (
    <>
      <h2>Channels</h2>
      <ul>{renderChannelList(channels)}</ul>
    </>
  );
};

export default ChannelsList;

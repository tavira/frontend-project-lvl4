import React from 'react';
import { useSelector } from 'react-redux';
import AddChannel from './addChannel';
import { selectChannels } from './channelsSlice';


const renderChannel = (channel) => (
  <li key={channel.id}>{channel.name}</li>
);

const renderChannelList = (channels) => (
  channels.map(renderChannel)
);

const ChannelsList = () => {
  const channels = useSelector(selectChannels);
  return (
    <>
      <h2>Channels</h2>
      <AddChannel />
      <ul>{renderChannelList(channels)}</ul>
    </>
  );
};

export default ChannelsList;

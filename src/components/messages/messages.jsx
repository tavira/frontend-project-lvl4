import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectCurrentChannelMessages } from './messagesSlice';
import { selectCurrentChannel } from '../channels/channelsSlice';

const Message = ({ username, text }) => (
  <div>
    <p>
      <b>
        {username}
        {': '}
      </b>
      {text}
    </p>
  </div>
);

const MessagesList = ({ messages, style }) => (
  <div style={style} data-testid="messages">
    {messages.map((msg) => (<Message key={msg.id} username={msg.username} text={msg.message} />))}
  </div>
);

const Messages = ({ style }) => {
  const messages = useSelector(selectCurrentChannelMessages);
  const { name: currentChannelName } = useSelector(selectCurrentChannel);
  return (
    <div data-testid="messages-block">
      <h2>
        {'# '}
        {currentChannelName}
      </h2>
      <MessagesList messages={messages} style={style} />
    </div>
  );
};

Messages.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
};

Messages.defaultProps = {
  style: {},
};

MessagesList.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
  messages: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      username: PropTypes.string,
      message: PropTypes.string,
      channelId: PropTypes.number,
    }),
  ).isRequired,
};

MessagesList.defaultProps = {
  style: {},
};

Message.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Messages;

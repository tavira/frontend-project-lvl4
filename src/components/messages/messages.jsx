import React, { useEffect, useRef } from 'react';
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

const MessagesList = ({ messages }) => {
  const messagesRef = useRef();
  useEffect(() => {
    if (messagesRef.current.lastChild) {
      messagesRef.current.lastChild.scrollIntoView();
    }
  });

  return (
    <div
      data-testid="messages"
      className="border-top border-secondary px-1 py-2 h-100 bg-light"
      style={{ overflowY: 'scroll' }}
      ref={messagesRef}
    >
      {messages.map((msg) => (<Message key={msg.id} username={msg.username} text={msg.message} />))}
    </div>
  );
};

const Messages = ({ style }) => {
  const messages = useSelector(selectCurrentChannelMessages);
  const { name: currentChannelName } = useSelector(selectCurrentChannel);
  return (
    <div data-testid="messages-block" style={style}>
      <h2 className="text-truncate" title={currentChannelName}>
        {'# '}
        {currentChannelName}
      </h2>
      <MessagesList messages={messages} />
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
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Message.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Messages;

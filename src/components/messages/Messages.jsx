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
      className="border-top border-secondary px-1 py-2 bg-light overflow-auto flex-grow-1"
      ref={messagesRef}
    >
      {messages.map((msg) => (<Message key={msg.id} username={msg.username} text={msg.message} />))}
    </div>
  );
};

const Messages = () => {
  const messages = useSelector(selectCurrentChannelMessages);
  const { name: currentChannelName } = useSelector(selectCurrentChannel);
  return (
    <div data-testid="messages-block" className="d-flex flex-column flex-grow-1 overflow-hidden">
      <h2 className="text-truncate pb-2" title={currentChannelName}>
        {'# '}
        {currentChannelName}
      </h2>
      <MessagesList messages={messages} />
    </div>
  );
};

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Message.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Messages;

import { messageDelivered } from '../components/messages/messagesSlice';
import { channelAdded } from '../components/channels/channelsSlice';

export default (socket) => (store) => {
  socket.on('connect', () => {
    socket.on('newMessage', ({ data: { attributes } }) => {
      store.dispatch(messageDelivered(attributes));
    });
    socket.on('newChannel', ({ data: { attributes } }) => {
      store.dispatch(channelAdded(attributes));
    });
  });
  return (next) => (action) => next(action);
};

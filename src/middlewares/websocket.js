import { messageDelivered } from '../components/messages/messagesSlice';
import {
  channelAdded,
  channelRenamed,
  channelRemoved,
} from '../components/channels/channelsSlice';

export default (socket) => (store) => {
  socket.on('connect', () => {
    socket.on('newMessage', ({ data: { attributes } }) => {
      store.dispatch(messageDelivered(attributes));
    });
    socket.on('newChannel', ({ data: { attributes } }) => {
      store.dispatch(channelAdded(attributes));
    });
    socket.on('renameChannel', ({ data: { attributes } }) => {
      store.dispatch(channelRenamed(attributes));
    });
    socket.on('removeChannel', ({ data: { id } }) => {
      store.dispatch(channelRemoved({ id }));
    });
  });
  return (next) => (action) => next(action);
};

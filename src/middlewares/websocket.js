import { messageDelivered } from '../components/messages/messagesSlice';


export default (socket) => (store) => {
  socket.on('connect', () => {
    socket.on('newMessage', ({ data: { attributes } }) => {
      store.dispatch(messageDelivered(attributes));
    });
  });
  return (next) => (action) => next(action);
};

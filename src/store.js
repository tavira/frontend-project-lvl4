import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './components/channels/channelsSlice';
import editedMessageReducer from './components/editedMessage/editedMessageSlice';


export default (initialState = {}) => configureStore({
  reducer: {
    channels: channelsReducer,
    editedMessage: editedMessageReducer,
  },
  preloadedState: {
    channels: {
      entities: initialState.channels,
      currentChannelId: initialState.currentChannelId,
    },
  },
  devTools: process.env.NODE_ENV !== 'production',
});

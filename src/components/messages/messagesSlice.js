import {
  createSlice, createEntityAdapter, createSelector,
} from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
const selectCurrentChannelMessages = createSelector(
  (state) => state.channels.currentChannelId,
  (state) => messagesSelectors.selectAll(state),
  (currentChannelId, messages) => (
    messages.filter((message) => message.channelId === currentChannelId)
  ),
);

export const slice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    messageDelivered(state, action) {
      messagesAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: {
    'channels/channelRemoved': (state, { payload }) => {
      const removedChannelId = payload.id;
      const messageIdsToRemove = Object.values(state.entities)
        .filter(
          (message) => message.channelId === removedChannelId,
        )
        .map((message) => message.id);
      messagesAdapter.removeMany(state, messageIdsToRemove);
    },
  },
});

export default slice.reducer;
export const {
  messageDelivered,
} = slice.actions;
export { selectCurrentChannelMessages };

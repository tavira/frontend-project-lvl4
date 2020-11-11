import { createSlice, createSelector } from '@reduxjs/toolkit';

const selectCurrentChannelName = createSelector(
  (state) => state.channels.currentChannelId,
  (state) => state.channels.entities,
  (currentChannelId, channels) => channels.find((channel) => channel.id === currentChannelId).name,
);

export const slice = createSlice({
  name: 'channels',
  initialState: {
    entities: [],
    currentChannelId: null,
  },
});

export default slice.reducer;

export { selectCurrentChannelName };

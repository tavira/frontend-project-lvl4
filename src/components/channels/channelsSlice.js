import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'channels',
  initialState: {
    entities: [],
    currentChannelId: null,
  },
});

export default slice.reducer;

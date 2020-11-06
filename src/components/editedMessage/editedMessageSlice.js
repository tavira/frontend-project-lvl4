import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiSendMessage } from '../../api';

const postMessage = createAsyncThunk(
  'editedMessage/postMessage',
  async (values, { getState, rejectWithValue }) => {
    const { channels: { currentChannelId } } = getState();
    try {
      const response = await apiSendMessage(values, currentChannelId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const editedMessageSlice = createSlice({
  name: 'editedMessage',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default editedMessageSlice.reducer;
export { postMessage };

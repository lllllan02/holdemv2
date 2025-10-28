import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { WebSocketState } from '../../types';

const initialState: WebSocketState = {
  connected: false,
  connecting: false,
  error: null,
};

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setConnecting: (state, action: PayloadAction<boolean>) => {
      state.connecting = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
      state.connecting = false;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    update: (state, action: PayloadAction<Partial<WebSocketState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setConnecting, setConnected, setError, update } = websocketSlice.actions;
export default websocketSlice.reducer;


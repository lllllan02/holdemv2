import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GameState, GameRoom } from '../../types';
import api from '../../services/api';

const initialState: GameState = {
  currentRoom: null,
  isLoading: false,
  error: null,
};

// 加入游戏
export const joinGame = createAsyncThunk(
  'game/join',
  async ({ roomId, fingerprint }: { roomId: string; fingerprint: string }, { rejectWithValue }) => {
    try {
      const result = await api.joinGame(roomId, { fingerprint });
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<GameRoom>) => {
      state.currentRoom = action.payload;
    },
    clearRoom: (state) => {
      state.currentRoom = null;
    },
    updateRoom: (state, action: PayloadAction<Partial<GameRoom>>) => {
      if (state.currentRoom) {
        state.currentRoom = { ...state.currentRoom, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(joinGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRoom = action.payload;
        state.error = null;
      })
      .addCase(joinGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setRoom, clearRoom, updateRoom } = gameSlice.actions;
export default gameSlice.reducer;


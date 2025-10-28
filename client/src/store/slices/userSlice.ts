import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, UserState } from '../../types';
import api from '../../services/api';
import { initFingerprint } from '../../utils/fingerprint';

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// 初始化用户
export const initializeUser = createAsyncThunk(
  'user/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const fingerprint = await initFingerprint();
      
      // 尝试从服务器获取用户信息
      try {
        const user = await api.getUser(fingerprint);
        return user;
      } catch (error) {
        // 用户不存在，创建新用户
        const newUser = await api.createUser({
          fingerprint,
          nickname: `玩家${Date.now().toString().slice(-6)}`,
          chips: 500,
          points: 100,
        });
        return newUser;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 更新用户信息
export const updateUser = createAsyncThunk(
  'user/update',
  async ({ fingerprint, data }: { fingerprint: string; data: Partial<User> }, { rejectWithValue }) => {
    try {
      const user = await api.updateUser(fingerprint, data);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    updateChips: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.chips = action.payload;
      }
    },
    updatePoints: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.points = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(initializeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser, updateChips, updatePoints } = userSlice.actions;
export default userSlice.reducer;


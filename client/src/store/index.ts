import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import gameReducer from './slices/gameSlice';
import websocketReducer from './slices/websocketSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    websocket: websocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['websocket/update'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


import { configureStore } from '@reduxjs/toolkit';
import newsListSlice from './slices/newsListSlice';

export const store = configureStore({
  reducer: {
    newsList:newsListSlice,
  },
});
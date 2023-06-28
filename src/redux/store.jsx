import { configureStore } from '@reduxjs/toolkit';
import coinsSlice from './coins/coinsSlice';

const store = configureStore({
  reducer: {
    coins: coinsSlice,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import assetsSlice from './assets/assetsSlice';
import symbolSlice from './symbol/symbolSlice';

const store = configureStore({
  reducer: {
    assets: assetsSlice,
    symbol: symbolSlice,
  },
});

export default store;

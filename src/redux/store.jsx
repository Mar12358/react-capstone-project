import { configureStore } from '@reduxjs/toolkit';
import assetsSlice from './assets/assetsSlice';
import ratesSlice from './rates/ratesSlice';

const store = configureStore({
  reducer: {
    assets: assetsSlice,
    rates: ratesSlice,
  },
});

export default store;

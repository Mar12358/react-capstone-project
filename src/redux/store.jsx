import { configureStore } from '@reduxjs/toolkit';
import assetsSlice from './assets/assetsSlice';
import ratesSlice from './rates/ratesSlice';
import symbolSlice from './symbol/symbolSlice';

const store = configureStore({
  reducer: {
    assets: assetsSlice,
    rates: ratesSlice,
    symbol: symbolSlice,
  },
});

export default store;

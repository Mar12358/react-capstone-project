import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const urlRates = 'https://api.coincap.io/v2/rates';

const initialState = {
  rates: [],
  isLoading: false,
  error: undefined,
};

export const getRates = createAsyncThunk(
  'Rates/getRates',
  async (thunkAPI) => {
    try {
      const resp = await axios(urlRates);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    /* reserveRocket: (state, action) => {
      const rocketId = action.payload;
      const newState = state;
      newState.assets = state.rockets.map((rocket) => (
        rocket.rocket_id !== rocketId ? rocket : { ...rocket, reserved: true }
      ));
    },
    cancelReserveRocket: (state, action) => {
      const rocketId = action.payload;
      const newState = state;
      newState.rockets = state.rockets.map((rocket) => (
        rocket.rocket_id !== rocketId ? rocket : { ...rocket, reserved: false }
      ));
    }, */
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRates.pending, (state) => {
        const pendingState = state;
        pendingState.isLoading = true;
      })
      .addCase(getRates.fulfilled, (state, action) => {
        const fulfilledState = state;
        fulfilledState.isLoading = false;
        fulfilledState.rates = action.payload;
      })
      .addCase(getRates.rejected, (state) => {
        const rejectedState = state;
        rejectedState.isLoading = false;
      });
  },
});

// export const { reserveRocket, cancelReserveRocket } = assetsSlice.actions;
export default ratesSlice.reducer;

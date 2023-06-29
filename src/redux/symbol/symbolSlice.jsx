import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  symbol: [],
  isLoading: false,
  error: undefined,
};

export const getSymbol = (id) => createAsyncThunk(
  'Symbol/getSymbol',
  async (thunkAPI) => {
    try {
      const resp = await axios(`https://api.coincap.io/v2/assets/${id}`);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const symbolSlice = createSlice({
  name: 'symbol',
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
      .addCase(getSymbol.pending, (state) => {
        const pendingState = state;
        pendingState.isLoading = true;
      })
      .addCase(getSymbol.fulfilled, (state, action) => {
        const fulfilledState = state;
        fulfilledState.isLoading = false;
        fulfilledState.symbol = action.payload;
      })
      .addCase(getSymbol.rejected, (state) => {
        const rejectedState = state;
        rejectedState.isLoading = false;
      });
  },
});

// export const { reserveRocket, cancelReserveRocket } = assetsSlice.actions;
export default symbolSlice.reducer;

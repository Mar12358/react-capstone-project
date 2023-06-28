import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const urlAssets = 'https://api.coincap.io/v2/assets';
const urlRates = 'https://api.coincap.io/v2/rates';

const initialState = {
  assets: [],
  rates: [],
  isLoading: false,
  error: undefined,
};

export const getAssets = createAsyncThunk(
  'Assets/getAssets',
  async (thunkAPI) => {
    try {
      const resp = await fetch(urlAssets);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getRates = createAsyncThunk(
  'Rates/getRates',
  async (thunkAPI) => {
    try {
      const resp = await fetch(urlRates);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const coinsSlice = createSlice({
  name: 'assets',
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
      .addCase(getAssets.pending, (state) => {
        const pendingState = state;
        pendingState.isLoading = true;
      })
      .addCase(getAssets.fulfilled, (state, action) => {
        const fulfilledState = state;
        fulfilledState.isLoading = false;
        fulfilledState.assets = action.payload;
      })
      .addCase(getAssets.rejected, (state) => {
        const rejectedState = state;
        rejectedState.isLoading = false;
      });
  },
});

// export const { reserveRocket, cancelReserveRocket } = coinsSlice.actions;
export default coinsSlice.reducer;

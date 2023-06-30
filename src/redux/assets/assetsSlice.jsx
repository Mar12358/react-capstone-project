import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const urlAssets = 'https://api.coincap.io/v2/assets';

const initialState = {
  assets: [],
  isLoading: false,
  error: undefined,
};

export const getAssets = createAsyncThunk(
  'Assets/getAssets',
  async (thunkAPI) => {
    try {
      const resp = await axios(urlAssets);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    /* searchAssetByName: (state, action) => {
      const newState = state;
      const assetName = action.payload;
      console.log(assetName);
      // newState.assets = state.assets.filter((asset) => asset.name === assetName);
    }, */
    /* cancelReserveRocket: (state, action) => {
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

export const { searchAssetByName } = assetsSlice.actions;
export default assetsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const urlAssets = 'https://api.coincap.io/v2/assets';

const initialState = {
  assets: [],
  filterData: [],
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
    filter: (state, { payload }) => {
      const filteredData = state.assets.data.filter((element) => {
        const name = element.name.toLowerCase();
        return name.includes(payload.toLowerCase());
      });
      return { ...state, filterData: filteredData };
    },
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
        fulfilledState.filterData = action.payload.data;
      })
      .addCase(getAssets.rejected, (state) => {
        const rejectedState = state;
        rejectedState.isLoading = false;
      });
  },
});

export const { filter } = assetsSlice.actions;
export default assetsSlice.reducer;

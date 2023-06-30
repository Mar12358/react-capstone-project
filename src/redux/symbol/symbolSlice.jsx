import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  symbol: [],
  isLoading: false,
  error: undefined,
};

export const getSymbol = createAsyncThunk(
  'Symbol/getSymbol',
  async (id, thunkAPI) => {
    try {
      const resp = await axios(`https://api.coincap.io/v2/assets/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const symbolSlice = createSlice({
  name: 'symbol',
  initialState,
  reducers: {},
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
        rejectedState.isLoading = true;
        rejectedState.isRejected = true;
      });
  },
});

// export const { reserveRocket, cancelReserveRocket } = assetsSlice.actions;
export default symbolSlice.reducer;

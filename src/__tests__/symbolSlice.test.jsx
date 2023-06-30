import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import symbolReducer, { getSymbol } from '../redux/symbol/symbolSlice';

const mockStore = configureStore([thunk]);
jest.mock('axios');

describe('symbolSlice', () => {
  describe('reducers', () => {
    it('should handle getSymbol function', () => {
      const initialState = {
        symbol: [],
        isLoading: false,
      };
      const symbolData = { id: 'bitcoin', name: 'Bitcoin' };
      const nextState = symbolReducer(initialState, {
        type: getSymbol.fulfilled.type,
        payload: symbolData,
      });
      expect(nextState.symbol).toEqual(symbolData);
      expect(nextState.isLoading).toBe(false);
    });

    it('should handle getSymbol function when pending', () => {
      const initialState = {
        symbol: [],
        isLoading: false,
      };
      const nextState = symbolReducer(initialState, {
        type: getSymbol.pending.type,
      });
      expect(nextState.isLoading).toBe(true);
    });

    it('should handle getSymbol function when rejected', () => {
      const initialState = {
        symbol: [],
        isLoading: false,
        isRejected: false,
      };
      const nextState = symbolReducer(initialState, {
        type: getSymbol.rejected.type,
      });
      expect(nextState.isLoading).toBe(true);
      expect(nextState.isRejected).toBe(true);
    });
  });

  describe('actions', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
    });

    it('should dispatch getSymbol action and fulfill', async () => {
      const symbolData = { id: 'bitcoin', name: 'Bitcoin' };
      const resp = { data: symbolData };
      axios.get.mockResolvedValueOnce(resp);

      await store.dispatch(getSymbol('bitcoin'));

      const actions = store.getActions();
      expect(actions[0].type).toBe(getSymbol.pending.type);
      expect(actions[1].type).toBe(getSymbol.rejected.type);

      await store.dispatch(getSymbol.fulfilled(symbolData));
      expect(actions[2].type).toEqual(getSymbol.fulfilled.type);
      expect(actions[2].payload).toBe(symbolData);
    });

    it('should dispatch getSymbol action and reject', async () => {
      const error = 'Rejected';
      axios.get.mockRejectedValueOnce(error);

      await store.dispatch(getSymbol('bitcoin'));

      const actions = store.getActions();
      expect(actions[0].type).toEqual(getSymbol.pending.type);
      expect(actions[1].type).toEqual(getSymbol.rejected.type);
      expect(actions[1].error.message).toEqual(error);
    });
  });
});

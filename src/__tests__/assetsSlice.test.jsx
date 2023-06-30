import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import assetsReducer, { getAssets, filter } from '../redux/assets/assetsSlice';

const mockStore = configureStore([thunk]);
jest.mock('axios');
describe('assetsSlice', () => {
  describe('reducers', () => {
    it('should handle filter function', () => {
      const initialState = {
        assets: {
          data: [
            { id: 'bitcoin', name: 'bitcoin' },
            { id: 'dogecoin', name: 'dogecoin' },
          ],
        },
        filterData: [],
      };
      const nextState = assetsReducer(initialState, filter('dogecoin'));
      expect(nextState.filterData.length).toBe(1);
      expect(nextState.filterData[0].name).toBe('dogecoin');
    });
  });
  describe('actions', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
    });

    it('Should create an action to get Assets', async () => {
      const mockPayload = [{ id: 'bitcoin' }, { name: 'Bitcoin' }];
      axios.get.mockResolvedValueOnce({ data: mockPayload });

      await store.dispatch(getAssets());

      const actions = store.getActions();
      expect(actions[0].type).toBe(getAssets.pending.type);
      expect(actions[1].type).toBe(getAssets.rejected.type);
      await store.dispatch(getAssets.fulfilled(mockPayload));

      expect(actions[2].type).toBe(getAssets.fulfilled.type);
      expect(actions[2].payload).toEqual(mockPayload);
    });
  });
});

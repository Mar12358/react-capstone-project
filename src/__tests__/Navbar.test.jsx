import configureStore from 'redux-mock-store';
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import renderer from 'react-test-renderer';
import Navbar from '../components/Navbar';
import assetsReducer, { filter } from '../redux/assets/assetsSlice';

const mockStore = configureStore([thunk]);
jest.mock('axios');

describe('Navbar.jsx renders propperly', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Navbar />
          </Router>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Search Bar filters correctly (Reducer Works)', () => {
  it('should handle the filter action', () => {
    const initialState = {
      assets: {
        data: [{ name: 'bitcoin', id: 'bitcoin' },
          { name: 'ethereum', id: 'ethereum' }],
      },
    };

    const action = filter('bitcoin');
    const newState = assetsReducer(initialState, action);
    expect(newState.filterData.some((obj) => obj.name === 'bitcoin')).toBe(true);
    expect(newState.filterData.some((obj) => obj.name === 'ethereum')).toBe(false);
  });
});

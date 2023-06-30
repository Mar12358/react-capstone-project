import configureStore from 'redux-mock-store';
import React from 'react';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';

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
            <Layout />
          </Router>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

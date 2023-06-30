import configureStore from 'redux-mock-store';
import React from 'react';
import thunk from 'redux-thunk';
import {
  MemoryRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';
import Assets from '../routes/Assets';
import Symbol from '../routes/Symbol';

const mockStore = configureStore([thunk]);
jest.mock('axios');

describe('App.jsx renders propperly', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('Matches snapshot correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Navigate to="/assets" />} />
              <Route path="assets" element={<Assets />} />
              <Route path="/assets/:id" element={<Symbol />} />
            </Route>
          </Routes>
        </Router>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

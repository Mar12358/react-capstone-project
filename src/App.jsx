import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Assets from './routes/Assets';
import Details from './routes/Symbol';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Navigate to="/assets" />} />
      <Route path="assets" element={<Assets />} />
      <Route path="/assets/:id" element={<Details />} />
    </Route>
  </Routes>
);

export default App;

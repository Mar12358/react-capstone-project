import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Assets from './routes/Assets';
import Symbol from './routes/Symbol';
import Search from './routes/Search';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Navigate to="/assets" />} />
      <Route path="assets" element={<Assets />} />
      <Route path="/assets/:id" element={<Symbol />} />
      <Route path="/search/:id" element={<Search />} />
    </Route>
  </Routes>
);

export default App;

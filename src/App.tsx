import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import 'app.module.scss';

export const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<div>App</div>} />
    </Routes>
  </Router>
);

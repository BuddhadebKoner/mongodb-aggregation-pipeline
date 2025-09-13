import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import DataLoader from './components/DataLoader';
import AggregationQuestions from './components/AggregationQuestions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="data-loader" element={<DataLoader />} />
          <Route path="practice" element={<AggregationQuestions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

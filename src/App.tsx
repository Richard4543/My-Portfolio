// src/App.tsx
// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import AboutPage from './pages/about/AboutPage';
import WorkPage from './pages/mywork/WorkPage';
import ContactPage from './pages/contact/ContactPage';
import Menu from './components/Menu';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mywork" element={<WorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

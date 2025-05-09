// import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import HomePage from './pages/homepage/HomePage';
import AboutPage from './pages/about/AboutPage';
import WorkPage from './pages/mywork/WorkPage';
import ContactPage from './pages/contact/ContactPage';
import FunLayout from './pages/fun/FunLayout';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/fun/*" element={<FunLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
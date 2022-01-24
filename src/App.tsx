import React from 'react';
import HeroSlide from './components/HeroSlide';
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HeroSlide />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

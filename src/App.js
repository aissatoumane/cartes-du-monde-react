import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './pages/About';
import Blog from './pages/Blog';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />

        <Route path="*" element={<Home />} />
        {/* path="*" sera appliqué si l'url ne corespond à rien de déclaré au-dessus */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
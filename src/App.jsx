import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './component/NavBar/NavBar';
import Home from './component/Home/Home';
import Registration from './component/Registration/Registration';
import Search from './component/Search/SearchResults';
import Footer from './component/footer/Footer'

const App = () => {
  return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/search" element={<Search/>} />
        </Routes>
        <Footer />
      </div>
  );
};

export default App;
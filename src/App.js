import React from 'react';
import { Provider } from 'react-redux'
import './App.css';
import Navbar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Landing from './components/home/Landing';
import Movie from './components/home/Movie';
import Trending from './components/home/Trending';
import Categories from './components/home/Categories';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/movie/:id" element={<Movie />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

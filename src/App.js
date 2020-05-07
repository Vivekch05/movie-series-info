import React from 'react';
import { Provider } from 'react-redux'
import './App.css';
import Navbar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Landing from './components/home/Landing';
import Movie from './components/home/Movie';
import { HashRouter as Router,Route } from 'react-router-dom';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
        <Navbar/>
        <Route exact path="/" component={Landing} />
        <Route path="/movie/:id" component={Movie} />
        <Footer/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

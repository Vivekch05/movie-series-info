import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${isMenuOpen ? 'header--menu-open' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <i className="fas fa-film header__logo-icon"></i>
          <h1>MovieSeriesInfo</h1>
        </Link>

        <button 
          className="header__menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="header__menu-icon"></span>
        </button>

        <nav className="header__nav">
          <div className="header__nav-group">
            <Link to="/" className="header__nav-link">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
            <Link to="/trending" className="header__nav-link">
              <i className="fas fa-fire"></i>
              <span>Trending</span>
            </Link>
            <Link to="/categories" className="header__nav-link">
              <i className="fas fa-list"></i>
              <span>Categories</span>
            </Link>
          </div>

          <div className="header__nav-group">
            <a 
              href="https://www.imdb.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="header__nav-link header__nav-link--imdb"
            >
              <i className="fab fa-imdb"></i>
              <span>IMDb</span>
            </a>
            <button className="header__nav-link header__theme-toggle" aria-label="Toggle theme">
              <i className="fas fa-moon"></i>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h3 className="footer__title">MovieSeriesInfo</h3>
          <p className="footer__description">
            Your ultimate destination for movies and TV shows information. Search, discover, and learn more about your favorite entertainment.
          </p>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Quick Links</h3>
          <ul className="footer__links">
            <li><Link to="/" className="footer__link">Home</Link></li>
            <li><a href="https://www.omdbapi.com" target="_blank" rel="noopener noreferrer" className="footer__link">OMDB API</a></li>
            <li><a href="https://www.imdb.com" target="_blank" rel="noopener noreferrer" className="footer__link">IMDb</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Technologies</h3>
          <ul className="footer__tech-list">
            <li className="footer__tech-item">
              <i className="fab fa-react"></i>
              <span>React</span>
            </li>
            <li className="footer__tech-item">
              <i className="fas fa-code-branch"></i>
              <span>Redux</span>
            </li>
            <li className="footer__tech-item">
              <i className="fas fa-database"></i>
              <span>OMDB API</span>
            </li>
          </ul>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Connect</h3>
          <div className="footer__social">
            <a href="https://github.com/Vivekch05" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__credits">
          <p>
            Developed with <i className="fas fa-heart"></i> by{' '}
            <a href="https://github.com/Vivekch05" target="_blank" rel="noopener noreferrer" className="footer__credit-link">
              Vivek Chaurasia
            </a>
          </p>
        </div>
        <div className="footer__copyright">
          <p>&copy; {currentYear} MovieSeriesInfo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
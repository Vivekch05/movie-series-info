import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    const defaultPoster = 'https://via.placeholder.com/300x450?text=No+Poster+Available';

    if (!movie) {
      return null;
    }

    return (
      <div className="cards__item">
        {movie.Type && (
          <div className="card__rating">
            {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
          </div>
        )}
        <div className="card">
          <div className="card__image">
            <img 
              src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : defaultPoster} 
              alt={movie.Title || 'Movie Poster'} 
              loading="lazy"
            />
          </div>
          <div className="card__content">
            <h2 className="card__title" title={movie.Title}>
              {movie.Title || 'Title Not Available'}
            </h2>
            <p className="card__text">{movie.Year || 'Year Not Available'}</p>
            {movie.imdbID && (
              <Link className="btn btn--block" to={'/movie/' + movie.imdbID}>
                View Details
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
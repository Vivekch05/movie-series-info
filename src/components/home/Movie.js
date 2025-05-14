import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchMovieId, setLoading } from '../../actions/searchActions';
import Loader from '../layout/Loader';

// Wrapper component to use hooks with class component
function MovieWrapper(props) {
  const params = useParams();
  return <MovieComponent {...props} params={params} />;
}

class MovieComponent extends Component {
  componentDidMount() {
    if (this.props.params?.id) {
      this.props.fetchMovieId(this.props.params.id);
      this.props.setLoading();
    }
  }

  render() {
    const { loading, movie } = this.props;
    const defaultPoster = 'https://via.placeholder.com/300x450?text=No+Poster+Available';

    let movieInfo = null;

    if (movie) {
      movieInfo = (
        <div className="movie-details">
          <div className="movie-details__backdrop">
            <div className="movie-details__content">
              <div className="movie-details__poster">
                <img 
                  src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : defaultPoster} 
                  alt={movie.Title || 'Movie Poster'} 
                  className="movie-details__poster-img"
                />
              </div>
              
              <div className="movie-details__info">
                <h1 className="movie-details__title">{movie.Title || 'Title Not Available'}</h1>
                
                <div className="movie-details__meta">
                  {movie.Year && <span className="movie-details__year">{movie.Year}</span>}
                  {movie.Rated && <span className="movie-details__rated">{movie.Rated}</span>}
                  {movie.Runtime && <span className="movie-details__runtime">{movie.Runtime}</span>}
                </div>

                {movie.imdbRating && (
                  <div className="movie-details__rating">
                    <div className="rating-box">
                      <span className="rating-box__score">{movie.imdbRating}</span>
                      <span className="rating-box__label">IMDb Rating</span>
                    </div>
                  </div>
                )}

                {movie.Plot && (
                  <div className="movie-details__plot">
                    <p>{movie.Plot}</p>
                  </div>
                )}

                <div className="movie-details__crew">
                  {movie.Director && (
                    <div className="crew-item">
                      <span className="crew-item__label">Director</span>
                      <span className="crew-item__value">{movie.Director}</span>
                    </div>
                  )}
                  {movie.Writer && (
                    <div className="crew-item">
                      <span className="crew-item__label">Writer</span>
                      <span className="crew-item__value">{movie.Writer}</span>
                    </div>
                  )}
                  {movie.Actors && (
                    <div className="crew-item">
                      <span className="crew-item__label">Cast</span>
                      <span className="crew-item__value">{movie.Actors}</span>
                    </div>
                  )}
                </div>

                {movie.Genre && (
                  <div className="movie-details__genres">
                    {movie.Genre.split(', ').map((genre, index) => (
                      <span key={index} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                )}

                <div className="movie-details__actions">
                  {movie.imdbID && (
                    <a
                      href={'https://www.imdb.com/title/' + movie.imdbID}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary"
                    >
                      <i className="fab fa-imdb"></i> View on IMDb
                    </a>
                  )}
                  <Link to="/" className="btn btn--secondary">
                    <i className="fas fa-arrow-left"></i> Back to Search
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="movie-page">
        {loading ? <Loader /> : movieInfo}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.movies.loading,
  movie: state.movies.movie
});

export default connect(
  mapStateToProps,
  { fetchMovieId, setLoading }
)(MovieWrapper);
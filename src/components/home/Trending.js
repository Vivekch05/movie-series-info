import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrendingMovies } from '../../actions/searchActions';
import Loader from '../layout/Loader';
import MovieCard from './MovieCard';

class Trending extends Component {
  componentDidMount() {
    this.props.fetchTrendingMovies();
  }

  handleRefresh = () => {
    this.props.fetchTrendingMovies();
  };

  render() {
    const { loading, movies, error } = this.props;

    if (loading) {
      return (
        <div className="trending">
          <div className="trending__header">
            <h2 className="trending__title">
              <i className="fas fa-fire"></i> Trending Movies
            </h2>
            <p className="trending__subtitle">Loading the hottest movies...</p>
          </div>
          <Loader />
        </div>
      );
    }

    return (
      <div className="trending">
        <div className="trending__header">
          <h2 className="trending__title">
            <i className="fas fa-fire"></i> Trending Movies
          </h2>
          <p className="trending__subtitle">Discover what's popular right now</p>
          <button onClick={this.handleRefresh} className="trending__refresh">
            <i className="fas fa-sync-alt"></i> Refresh Movies
          </button>
        </div>

        {error ? (
          <div className="no-results">
            <h3>{error}</h3>
            <button onClick={this.handleRefresh} className="btn btn--primary">
              <i className="fas fa-sync-alt"></i> Try Again
            </button>
          </div>
        ) : (
          <div className="cards-container">
            {movies.Search && movies.Search.length > 0 ? (
              <div className="cards">
                {movies.Search.map((movie, index) => (
                  <MovieCard key={movie.imdbID || index} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No movies found</h3>
                <button onClick={this.handleRefresh} className="btn btn--primary">
                  <i className="fas fa-sync-alt"></i> Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
  loading: state.movies.loading,
  error: state.movies.error
});

export default connect(mapStateToProps, { fetchTrendingMovies })(Trending); 
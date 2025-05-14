import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovie, setLoading } from '../../actions/searchActions';
import Loader from '../layout/Loader';
import MovieCard from './MovieCard';

class Categories extends Component {
  state = {
    selectedCategory: null
  };

  categories = [
    { id: 'action', name: 'Action', query: 'Action', icon: 'fas fa-fire-alt' },
    { id: 'comedy', name: 'Comedy', query: 'Comedy', icon: 'fas fa-laugh' },
    { id: 'drama', name: 'Drama', query: 'Drama', icon: 'fas fa-theater-masks' },
    { id: 'scifi', name: 'Sci-Fi', query: 'Science Fiction', icon: 'fas fa-robot' },
    { id: 'horror', name: 'Horror', query: 'Horror', icon: 'fas fa-ghost' },
    { id: 'romance', name: 'Romance', query: 'Romance', icon: 'fas fa-heart' },
    { id: 'thriller', name: 'Thriller', query: 'Thriller', icon: 'fas fa-mask' },
    { id: 'animation', name: 'Animation', query: 'Animation', icon: 'fas fa-child' }
  ];

  componentDidMount() {
    console.log('Categories component mounted');
    // Load default category
    const defaultCategory = this.categories[0];
    this.setState({ selectedCategory: defaultCategory }, () => {
      this.handleCategorySelect(defaultCategory);
    });
  }

  handleCategorySelect = (category) => {
    console.log('Selected category:', category);
    this.setState({ selectedCategory: category });
    this.props.setLoading();
    this.props.fetchMovie(category.query);
  };

  render() {
    console.log('Rendering Categories component', this.props);
    const { loading, movies, error } = this.props;
    const { selectedCategory } = this.state;

    return (
      <div className="categories">
        <div className="categories__header">
          <h2 className="categories__title">Movie Categories</h2>
          <p className="categories__subtitle">Browse movies by genre</p>
        </div>

        <div className="categories__nav">
          {this.categories.map(category => (
            <button
              key={category.id}
              className={`categories__nav-item ${selectedCategory?.id === category.id ? 'categories__nav-item--active' : ''}`}
              onClick={() => this.handleCategorySelect(category)}
            >
              <i className={category.icon}></i>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="categories__content">
          {loading ? (
            <div className="categories__loader">
              <Loader />
            </div>
          ) : error ? (
            <div className="no-results">
              <h3>{error}</h3>
              <button 
                onClick={() => selectedCategory && this.handleCategorySelect(selectedCategory)} 
                className="btn btn--primary"
              >
                <i className="fas fa-sync-alt"></i> Try Again
              </button>
            </div>
          ) : (
            <div className="cards-container">
              {movies?.Search && movies.Search.length > 0 ? (
                <div className="cards">
                  {movies.Search.map((movie, index) => (
                    <MovieCard key={movie.imdbID || index} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <h3>No movies found in this category</h3>
                  <button 
                    onClick={() => selectedCategory && this.handleCategorySelect(selectedCategory)} 
                    className="btn btn--primary"
                  >
                    <i className="fas fa-sync-alt"></i> Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
  loading: state.movies.loading,
  error: state.movies.error
});

export default connect(mapStateToProps, { fetchMovie, setLoading })(Categories); 
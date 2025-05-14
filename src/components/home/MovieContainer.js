import React, { Component } from 'react'
import { connect } from 'react-redux';
import MovieCard from './MovieCard';

class MovieContainer extends Component {
    render() {
        const { movies } = this.props;
        let content = '';

        if (movies.Response === "True" && movies.Search) {
            content = (
                <div className="cards-container">
                    <div className="cards">
                        {movies.Search.map((movie, index) => (
                            <MovieCard key={movie.imdbID || index} movie={movie} />
                        ))}
                    </div>
                </div>
            );
        } else if (movies.Response === "False") {
            content = (
                <div className="no-results">
                    <h3>No movies found. Try another search!</h3>
                </div>
            );
        }

        return content;
    }
}

const mapStateToProps = state => ({
    movies: state.movies.movies
});

export default connect(mapStateToProps)(MovieContainer);

import React, { Component } from 'react'
import SearchForm from './SearchForm';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import MovieContainer from './MovieContainer';
import { fetchTrendingMovies } from '../../actions/searchActions';

class Landing extends Component {
    componentDidMount() {
        this.props.fetchTrendingMovies();
    }

    render() {
        const { loading } = this.props;
        return (
            <div className="landing">
                <div className="landing__header">
                    <h2 className="landing__title">Discover Movies</h2>
                    <p className="landing__subtitle">Search for your favorite movies and TV shows</p>
                </div>
                <SearchForm />
                {loading ? <Loader /> : <MovieContainer />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.movies.loading
});

export default connect(mapStateToProps, { fetchTrendingMovies })(Landing);

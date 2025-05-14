import React, { Component } from 'react';
import { searchMovie, fetchMovie, setLoading } from '../../actions/searchActions';
import { connect } from 'react-redux';

class SearchForm extends Component {
    state = {
        searchText: ''
    };

    handleChange = e => {
        const searchText = e.target.value;
        this.setState({ searchText });
        this.props.searchMovie(searchText);
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.searchText.trim()) {
            this.props.setLoading();
            this.props.fetchMovie(this.state.searchText);
        }
    }

    render() {
        return (
            <div className="search-form">
                <div className="search-form__header">
                    <h2 className="search-form__title">
                        Find Movies, TV Shows and more
                    </h2>
                    <p className="search-form__subtitle">
                        Search through millions of movies and TV shows
                    </p>
                </div>
                <form className="search-form__container" onSubmit={this.handleSubmit}>
                    <div className="search-form__input-group">
                        <i className="fas fa-search search-form__icon"></i>
                        <input
                            type="text"
                            className="search-form__input"
                            placeholder="Search by title..."
                            value={this.state.searchText}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="search-form__button">
                        Search
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    text: state.movies.text
});

export default connect(mapStateToProps, { searchMovie, fetchMovie, setLoading })(SearchForm);

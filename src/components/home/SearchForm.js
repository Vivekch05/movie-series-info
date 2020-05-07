import React, { Component } from 'react';
import { searchMovie, fetchMovie, setLoading } from '../../actions/searchActions';
import { connect } from 'react-redux';

class SearchForm extends Component {

    handleChange = e => {
        this.props.searchMovie(e.target.value);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.fetchMovie(this.props.text);
        //console.log(this.props.fetchMovie(this.props.text));
        this.props.setLoading();
    }
    render() {
        return (
            <div className="search-form">
                <h1>
                    <i className="fa fa-search" /> Search for a movie ,TV series ..
                </h1>
                <form id="searchForm" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="searchText"
                        placeholder="Search Movies, TV Series ..."
                        onChange={this.handleChange}
                    />
                    <button type="submit">
                        Search
                    </button>
                </form>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    text: state.movies.text
});

export default connect(mapStateToProps, { searchMovie, fetchMovie, setLoading })(SearchForm);

import {SEARCH_MOVIE, FETCH_MOVIE, FETCH_MOVIE_ID, LOADING, FETCH_TRENDING_MOVIES, SEARCH_ERROR} from './types';
import axios from 'axios';

const API_KEY = '35db4827';  // Fallback API key if environment variable is not set
const BASE_URL = 'https://www.omdbapi.com';

// Helper function to handle API errors
const handleApiError = (error, dispatch, customMessage) => {
    console.error('API Error:', error);
    dispatch({
        type: SEARCH_ERROR,
        payload: customMessage || 'An error occurred. Please try again.'
    });
};

export const searchMovie = text => dispatch => {
    dispatch({
        type: SEARCH_MOVIE,
        payload: text
    });
};

export const fetchMovie = (text, options = {}) => dispatch => {
    dispatch(setLoading());
    
    // For categories, we'll focus on recent and popular movies
    const isCategory = ['Action', 'Comedy', 'Drama', 'Science Fiction', 'Horror', 'Romance', 'Thriller', 'Animation'].includes(text);
    const currentYear = new Date().getFullYear();
    const yearRange = isCategory ? `&y=${currentYear-5},${currentYear}` : '';
    
    axios.get(`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(text)}${yearRange}&type=movie`)
        .then(response => {
            if (response.data.Response === "True") {
                dispatch({
                    type: FETCH_MOVIE,
                    payload: response.data
                });
            } else {
                // If the first search fails and it's a category, try without year restriction
                if (isCategory) {
                    return axios.get(`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(text)}&type=movie`);
                }
                dispatch({
                    type: SEARCH_ERROR,
                    payload: response.data.Error || 'No results found'
                });
            }
        })
        .then(response => {
            if (response && response.data.Response === "True") {
                dispatch({
                    type: FETCH_MOVIE,
                    payload: response.data
                });
            } else if (response) {
                dispatch({
                    type: SEARCH_ERROR,
                    payload: response.data.Error || 'No results found'
                });
            }
        })
        .catch(err => handleApiError(err, dispatch, 'An error occurred while searching. Please try again.'));
};

export const fetchMovieId = id => dispatch => {
    dispatch(setLoading());
    
    axios.get(`${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`)
        .then(response => {
            if (response.data.Response === "True") {
                dispatch({
                    type: FETCH_MOVIE_ID,
                    payload: response.data
                });
            } else {
                dispatch({
                    type: SEARCH_ERROR,
                    payload: response.data.Error || 'Movie details not found'
                });
            }
        })
        .catch(err => handleApiError(err, dispatch, 'An error occurred while fetching movie details.'));
};

export const fetchTrendingMovies = () => dispatch => {
    dispatch(setLoading());
    
    // Popular movie franchises and recent hits
    const trendingQueries = [
        { term: 'Marvel', year: '2023,2024' },
        { term: 'Star Wars', year: '2022,2023' },
        { term: 'Batman', year: '2022,2023' },
        { term: 'Mission Impossible', year: '2023' },
        { term: 'Fast and Furious', year: '2023' },
        { term: 'Oppenheimer', year: '2023' },
        { term: 'Barbie', year: '2023' },
        { term: 'John Wick', year: '2023' },
        { term: 'Guardians', year: '2023' },
        { term: 'Avatar', year: '2022,2023' }
    ];

    // Get a random query
    const randomQuery = trendingQueries[Math.floor(Math.random() * trendingQueries.length)];
    
    // Build the URL with year filter for more relevant results
    const url = `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(randomQuery.term)}&type=movie&y=${randomQuery.year}`;
    
    axios.get(url)
        .then(response => {
            if (response.data.Response === "True" && response.data.Search?.length > 0) {
                dispatch({
                    type: FETCH_TRENDING_MOVIES,
                    payload: response.data
                });
            } else {
                // If the first query fails, try without year restriction
                return axios.get(`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(randomQuery.term)}&type=movie`);
            }
        })
        .then(response => {
            if (response && response.data.Response === "True") {
                dispatch({
                    type: FETCH_TRENDING_MOVIES,
                    payload: response.data
                });
            } else {
                dispatch({
                    type: SEARCH_ERROR,
                    payload: 'No trending movies found. Please try again.'
                });
            }
        })
        .catch(err => handleApiError(err, dispatch, 'An error occurred while fetching trending movies.'));
};

export const setLoading = () => {
    return {
        type: LOADING
    };
};
import {
    SEARCH_MOVIE,
    FETCH_MOVIE,
    FETCH_MOVIE_ID,
    LOADING,
    FETCH_TRENDING_MOVIES,
    SEARCH_ERROR
} from '../actions/types';

const initialState = {
    text: '',
    movies: [],
    loading: false,
    movie: null,
    error: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SEARCH_MOVIE:
            return {
                ...state,
                text: action.payload,
                error: null
            };
            
        case FETCH_MOVIE:
            return {
                ...state,
                movies: action.payload,
                loading: false,
                error: null
            };
            
        case FETCH_MOVIE_ID:
            return {
                ...state,
                movie: action.payload,
                loading: false,
                error: null
            };
            
        case FETCH_TRENDING_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false,
                error: null
            };
            
        case LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };
            
        case SEARCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
            
        default:
            return state;
    }
}
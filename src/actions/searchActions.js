import {SEARCH_MOVIE, FETCH_MOVIE,FETCH_MOVIE_ID,LOADING} from './types';
import axios from 'axios';
//import APIKey from '../APIKey';

export const searchMovie = text =>dispatch =>{
    dispatch(
        {
            type: SEARCH_MOVIE,
            payload: text
        }
    )
};

export const fetchMovie = text =>dispatch =>{
    axios.get(` http://www.omdbapi.com/?i=tt3896198&apikey=35db4827&s=${text}`)
    .then(response=>dispatch(
        {
            type: FETCH_MOVIE,
            payload: response.data
        }
    ))
    .catch(err=>console.log(err))
}

export const fetchMovieId = id =>dispatch =>{
    console.log(id);
    axios.get(` http://www.omdbapi.com/?apikey=35db4827&i=${id}`)
    .then(response=>dispatch(
        {
            type: FETCH_MOVIE_ID,
            payload: response.data
        }
    ))
    .catch(err=>console.log(err))
}

export const setLoading =()=>{
    return{
        type:LOADING
    }
}
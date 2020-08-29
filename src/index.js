import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
//Import Saga tools/effects put and takeEvery
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', getMovies);
    yield takeEvery('FETCH_GENRES', getGenres);
    yield takeEvery('FETCH_MOVIE_GENRE', getMovieGenre);
}

//go and get movies from database to display
function* getMovies(action) {
    console.log('in generator getMovies');
    //try in this context affords the 'catch' here
    try {
        const response = yield axios.get(`/api/movie/`)
        console.log(response.data);
        yield put({ type: 'SET_MOVIES', payload: response.data})
    } catch (error) {
        console.log('error with getMovies', error);
    }
}

//go and get movies from database to display
function* getMovieGenre(action) {
    console.log('in generator getMovieGenre', action.payload);
    //try in this context affords the 'catch' here
    try {
        const response = yield axios.get(`/api/movie/${action.payload}`)
        console.log(response.data);
        yield put({ type: 'SET_MOVIE_GENRE', payload: response.data})
    } catch (error) {
        console.log('error with getMovieGenre', error);
    }
}

//go and get genres for dropdown from database
function* getGenres(action) {
    console.log('in generator getGenres');
    //try in this context affords the 'catch' here
    try {
        const response = yield axios.get(`/api/genre/`)
        console.log(response.data);
        yield put({ type: 'SET_GENRES', payload: response.data})
    } catch (error) {
        console.log('error with getGenres', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const initialMovieState = {
    selectedMovie : {},
    genres: [],
}
//used to store one specific movie with title, description, image, and its genres
const movieAndGenre = (state = initialMovieState, action) => {
    switch (action.type) {
        case 'SET_MOVIE_GENRE':
            return {...state, genres: action.payload};
        case 'SET_SELECTED_MOVIE':
            return {...state, selectedMovie: action.payload};        
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieAndGenre,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();

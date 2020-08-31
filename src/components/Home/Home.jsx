import React from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard'
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 500,
        height: 450,
    },
}));

const Home = ({ history, dispatch, movies }) => {
    const classes = useStyles();
    const getMovies = () => {
        dispatch({ type: 'FETCH_MOVIES' })
    }
    const directToDetails = () => {
        history.push('/details')
    }

    useEffect(getMovies, []);
    console.log(movies.map(movie => { return movie }))
    return (
        <section>
            <div className={classes.root} >
                {movies.map((movie, i) => {
                    return <MovieCard
                        key={i} movie={movie} directToDetails={directToDetails}
                    />
                })}
            </div>
        </section>
    );
}

const mapPropsToState = (reduxState) => {
    return {
        movies: reduxState.movies
    }
}
export default connect(mapPropsToState)(Home);
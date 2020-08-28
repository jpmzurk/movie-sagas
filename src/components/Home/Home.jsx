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

const Home = (props) => {
    const classes = useStyles();
    const getMovies = (searchText) => {
      props.dispatch({ type: 'FETCH_MOVIES'})

    }
    const directToDetails = () => {
        props.history.push('/details')
    }

    useEffect(getMovies, []);
    console.log(props.movies.map(movie => { return movie }))
    return (
        <div className={classes.root} >
            {props.movies.map((movie , i) => {
                return <MovieCard 
                key={i}  movie={movie} directToDetails={directToDetails}
            />
            })}
        </div>
    );
}

const mapPropsToState = (reduxState) => {
    return {
        movies: reduxState.movies
    }   
}
export default connect(mapPropsToState)(Home);
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const GenreDropdown = ({ genres, dispatch }) => {
    const classes = useStyles();
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
        dispatchGenre(event.target.value)
    };

    const dispatchGenre = (genre) => {
        console.log(genre)
        dispatch({ type: 'SET_GENRE', payload: genre })
    }

    const getGenres = () => {
        dispatch({ type: 'FETCH_GENRES'})
    }

    useEffect(getGenres, []);

   
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="genre label">Genre</InputLabel>
                <Select labelId="genre" value={value} onChange={handleChange}>
                    {genres.map((genre, i) => {
                        return <MenuItem key={i} value={genre.id}>{genre.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    );
}

const mapPropsToState = (reduxState) => {
    return {
        genres: reduxState.genres
    }
}

export default connect(mapPropsToState)(GenreDropdown);

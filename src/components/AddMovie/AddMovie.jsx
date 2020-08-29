import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            display: 'flexInline',
            flexDirection: 'column',
        },
    },
    inputs: {
        margin: theme.spacing(1),
        width: '15ch',
        alignItems: 'center',

    }
}));

const AddMovie = ({ genres, dispatch }) => {
    const classes = useStyles();
    const { handleSubmit, reset, register, control } = useForm();
    const [helperText, setHelperText] = useState('');
    const [errorState, setErrorState] = useState(false);

    const getGenres = () => {
        dispatch({ type: 'FETCH_GENRES' })
    }

    const onSubmit = (data, e) => {
        if ((data.title === '') || (data.image === '')) {
            setErrorState(true);
            setHelperText('You must enter a title!');
        } else {
            setErrorState(false);
            dispatch({ type: 'SET_NEW_MOVIE', payload: data })
            reset();
        }
    };

    useEffect(getGenres, []);
    return (
        <FormControl >
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" >
                    <TextField label="title" name="title" inputRef={register} className={classes.inputs} error={errorState} />
                    <TextField label="poster image" name="image" inputRef={register} className={classes.inputs} />
                    <TextField label="description" name="description" inputRef={register} className={classes.inputs} />
                    <InputLabel id="genre label" style={{ marginLeft : "25.8em"}} className={classes.inputs} >genre</InputLabel>
                    <Controller control={control}  as={<Select labelId="genre" style={{marginTop: "1.5em", minWidth: '15ch' }} defaultValue="Genre" className={classes.inputs} >
                        <MenuItem value="no genre selected"></MenuItem>
                        {genres.map((genre, i) => {
                            return <MenuItem key={i} value={genre.id}>{genre.name}</MenuItem>
                        })}
                    </Select>
                    } name="genre" defaultValue="" />
                <FormHelperText>{helperText}</FormHelperText>
                <Button type="submit" variant="outlined"> Save</Button>
            </form>
        </FormControl>
    );
}


const mapPropsToState = (reduxState) => {
    return {
        genres: reduxState.genres
    }
}

export default connect(mapPropsToState)(AddMovie);

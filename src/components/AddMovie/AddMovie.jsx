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
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            display: 'flexInline',
            flexDirection: 'column',
            alignItems: 'center',
            
        },
    },
    inputs: {
        margin: theme.spacing(1),
        width: '22ch',
        marginBottom: '1em'
    },
    paper: {
        margin: 'auto',
        backgroundColor: '#EBEBEB',
        paddingBottom: '16em',
        marginTop: '2em',
        width: '60ch',
    },
    textField: {
        margin: theme.spacing(1),
        width: '40ch',
        marginBottom: '1em'
    }
}));

const AddMovie = ({ genres, dispatch, history }) => {
    const classes = useStyles();
    const { handleSubmit, reset, register, control } = useForm();
    const [helperText, setHelperText] = useState('');
    const [errorState, setErrorState] = useState(false);

    const getGenres = () => {
        dispatch({ type: 'FETCH_GENRES' })
    }

    const onSubmit = (data) => {
        if ((data.title === '') || (data.image === '') || (data.genre_id === '')) {
            setErrorState(true);
            setHelperText('You must enter a title, image, and genre');
        } else {
            setErrorState(false);
            dispatch({ type: 'SET_NEW_MOVIE', payload: data })
            reset();
        }
    };

    useEffect(getGenres, []);

    const directToMovies = () => {
        history.push('/')
    }

    return (
        <Paper className={classes.paper} >
            <FormControl >
                <form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" >
                    <section style={{ paddingTop: '2em' }}>
                        <TextField label="title" name="title" inputRef={register} multiline className={classes.inputs} error={errorState} />
                    </section>
                    <section>
                        <TextField label="poster image" name="poster" inputRef={register} multiline className={classes.textField} error={errorState} />
                    </section>
                    <section>
                        <TextField label="description" name="description" inputRef={register} multiline className={classes.textField} />
                    </section>
                    <FormControl className={classes.inputs}>
                   
                        <InputLabel id="genre" error={errorState}> genre</InputLabel>
                        <Controller as={<Select labelId="genre" label="genre" className={classes.inputs}>
                            <MenuItem disabled> genre </MenuItem>
                            {genres.map((genre, i) => {
                                return <MenuItem key={i} value={genre.id}>{genre.name}</MenuItem>
                            })}
                        </Select>
                        } name="genre_id" defaultValue="" control={control} error={errorState} />
                    <FormHelperText  error={errorState} > {helperText} </FormHelperText>
                    <section className={classes.inputs}> 
                    <Button type="submit" > Save </Button>
                    <Button  onClick={directToMovies}> CANCEL </Button>
                    </section>
                    </FormControl>
                </form>
            </FormControl>
        </Paper>
    );
}

const mapPropsToState = (reduxState) => {
    return {
        genres: reduxState.genres
    }
}

export default connect(mapPropsToState)(AddMovie);

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import { connect } from 'react-redux';
import { TextField, Button, Typography } from '@material-ui/core';
import { FormControl, FormHelperText, InputLabel } from '@material-ui/core';
import { MenuItem, Select, Paper } from '@material-ui/core';

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
        marginBottom: '1em',
        marginTop: '1.5em'
    },
    paper: {
        margin: 'auto',
        backgroundColor: '#EBEBEB',
        paddingBottom: '16em',
        marginTop: '1em',
        width: '60ch',
    },
    textField: {
        margin: theme.spacing(1),
        width: '40ch',
        marginBottom: '1em'
    }
}));

const AddMovie = ({ genres, dispatch, history }) => {
    const { root, inputs, paper, textField } = useStyles();
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
        <Paper className={paper} >
            <FormControl >
                <form className={root} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" >
                    <Typography variant="h4" component="h5" style={{ marginTop: '1em' }}>Add A Movie</Typography>
                    <section >
                        <TextField label="title" name="title" inputRef={register} multiline className={inputs} error={errorState} />
                    </section>
                    <section>
                        <TextField label="poster image" name="poster" inputRef={register} multiline className={textField} error={errorState} />
                    </section>
                    <section>
                        <TextField label="description" name="description" inputRef={register} multiline className={textField} />
                    </section>
                    <FormControl className={inputs}>
                        <InputLabel id="genre" error={errorState}> genre</InputLabel>
                        <Controller as={<Select labelId="genre" label="genre" className={inputs}>
                            <MenuItem disabled> genre </MenuItem>
                            {genres.map((genre, i) => {
                                return <MenuItem key={i} value={genre.id}>{genre.name}</MenuItem>
                            })}
                        </Select>
                        } name="genre_id" defaultValue="" control={control} error={errorState} />
                        <FormHelperText error={errorState} > {helperText} </FormHelperText>
                        <section className={inputs}>
                            <Button type="submit" > Save </Button>
                            <Button onClick={directToMovies}> CANCEL </Button>
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

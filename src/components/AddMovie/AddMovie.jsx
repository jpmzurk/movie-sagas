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
        // alignItems: 'center',
    },
    paper: {
        display: 'float',
        alignContent: 'center',
        margin: '1.1em',
        backgroundColor: '#EBEBEB',
        paddingBottom: '30em',
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
            setHelperText('You must enter a title, image, and genre');
        } else {
            setErrorState(false);
            dispatch({ type: 'SET_NEW_MOVIE', payload: data })
            reset();
        }
    };

    useEffect(getGenres, []);
    return (
        <Paper className={classes.paper}>
            <FormControl >
                <form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" >
                    <TextField label="title" name="title" inputRef={register} className={classes.inputs} error={errorState} />
                    <TextField label="poster image" name="poster" inputRef={register} className={classes.inputs} error={errorState}/>
                    <InputLabel id="genre label" style={{ marginLeft: "19em" }} className={classes.inputs} >genre</InputLabel>
                    <Controller control={control} error={errorState} as={<Select labelId="genre" style={{ marginTop: "1.5em", minWidth: '15ch' }}  className={classes.inputs} >
                        <MenuItem value="no genre selected"></MenuItem>
                        {genres.map((genre, i) => {
                            return <MenuItem key={i} value={genre.id}>{genre.name}</MenuItem>
                        })}
                    </Select>
                    } name="genre_id" defaultValue="" />
                    <section>
                        <TextField label="description" name="description" inputRef={register} className={classes.inputs} />
                        <Button type="submit" style={{marginTop:"1.7em"}}> Save </Button>
                        <Button type="submit" style={{marginTop:"1.7em"}}> CANCEL </Button>
                    </section>
                    <FormHelperText style={{marginLeft: "10em"}}> {helperText} </FormHelperText>
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

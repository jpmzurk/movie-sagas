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
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flexInline',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        maxWidth: 425,
        padding: 10,
        marginTop: '1em',
        marginBottom: '1em',
        backgroundColor: '#EBEBEB'
    },
    textField: {
        margin: theme.spacing(1),
        width: '40ch',
        marginBottom: '1em'
    },
    inputs: {
        margin: theme.spacing(1),
        width: '22ch',
        marginBottom: '1em'
    },

}));


const EditCard = ({ genres, dispatch, history }) => {
    const classes = useStyles();
    const { handleSubmit, reset, register, control } = useForm();
    const [helperText, setHelperText] = useState('');
    const [errorState, setErrorState] = useState(false);
    useEffect(getGenres, []);

    const getGenres = () => {
        dispatch({ type: 'FETCH_GENRES' })
    }

    const directToMovies = () => {
        history.push('/')
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

    return (
        <div>
            <Card className={classes.card}>
                <Typography variant="h4" component="h5" style={{ marginBottom: '.25em' }}>Edit</Typography>
                <CardActionArea>
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
                                    <FormHelperText error={errorState} > {helperText} </FormHelperText>
        
                                </FormControl>
                                <section className={classes.inputs}>
                                        <Button type="submit" >  SAVE CHANGES </Button>
                                        <Button onClick={directToMovies}> HOME </Button>
                                    </section>
                            </form>
                        </FormControl>
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Card>
        </div>
    );
}

{/* <Typography variant="body2" color="textSecondary" component="p">
                            {`${movieDetails.selectedMovie.description}`}
                        </Typography> */}

const mapPropsToState = (reduxState) => {
    return {
        genres: reduxState.genres
    }
}

export default connect(mapPropsToState)(EditCard);


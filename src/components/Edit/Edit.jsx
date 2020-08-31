import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Button, Typography, CardActionArea,
    Card, CardActions, CardContent, CardMedia, TextField,
    FormControl,
} from '@material-ui/core'
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        maxWidth: 425,
        padding: 10,
        marginTop: '1em',
        marginBottom: '1em',
        backgroundColor: '#EBEBEB'
    },
    media: {
        width: 425,
        height: 425,
    },
});

const Edit = ({ history, movieDetails }) => {
    const classes = useStyles();
    const [editable, setEditable] = useState(false)
    const directHome = () => {
        history.push('/')
    }

    const { handleSubmit, register, control } = useForm();

    const handleEditable = () => {
        setEditable(editable => !editable)
    }

    const onSubmit = (data) => {
        console.log('in onSubmit', data.description);
        setEditable(editable => !editable)
    }

    const Description = () => {
        return (
            <Typography variant="body2" color="textSecondary" component="p" onClick={handleEditable}>
                {`${movieDetails.selectedMovie.description}`}
            </Typography>
        )
    }

    const InputDescription = () => {
        return (
            <>
                <TextField label="description" name="description" inputRef={register} multiline className={classes.textField} />
                </>
        )
    }

    const SaveBtn = () => {
        return (
            <>
             <Button type="submit" size="small" color="primary" >  Save </Button>
            </>
        )
    }

    const HomeBtn = () => {
        return (
            <>
            <Button size="small" color="primary" onClick={directHome}> Home </Button>
            </>
        )
    }

    {console.log(editable)}

    return (
        <div className={classes.root}>
            <FormControl> 
                    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Card className={classes.card}>
                <Typography variant="h4" component="h5" style={{ marginBottom: '.25em' }}>Edit</Typography>
                <Typography variant="body2" component="p" style={{ marginBottom: '1em' }} >Click the section you would like to edit</Typography>
                    {/* {editable ?  (<InputDescription />) :( <Description/> )}  */}
                        <CardMedia
                            image={`${movieDetails.selectedMovie.poster}`}
                            title={`${movieDetails.selectedMovie}`}
                            className={classes.media} />
                        <CardContent>
                                <Typography gutterBottom variant="h5" component="h5">
                                    {movieDetails.selectedMovie.title}
                                </Typography>
                                    {editable ? <InputDescription /> :( <Description/> )} 
                                    {movieDetails.genres.length > 0 &&
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Genres: {movieDetails.genres.map(genre => {
                                        return genre.name + '  '
                                    })}
                                    </Typography>}
                        </CardContent>
                    <CardActions>
                     { !editable ? <HomeBtn /> : <SaveBtn />}
                </CardActions>
               
            </Card>
            </form>
            </FormControl>  
        </div>
    );
}

const mapPropsToState = (reduxState) => {
    return {
        movieDetails: reduxState.movieAndGenre,
        genres: reduxState.genres,
    }
}
export default connect(mapPropsToState)(Edit);


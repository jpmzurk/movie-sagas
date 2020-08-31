import React from 'react';
import { Typography, TextField, FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: theme.spacing(1),
        width: '40ch',
        marginBottom: '-.2em'
    },
}));

const Title = ({ title, register, handleEditable, editable }) => {
    const classes = useStyles();
    return (
        <>
            {editable ? 
                <FormControl>
                    <TextField label="title" name="title" defaultValue={`${title}`} inputRef={register} multiline className={classes.textField} />
                </FormControl>
                :
                 <Typography gutterBottom variant="h5" component="h5" onClick={() => handleEditable('title')} >
                    {`${title}`}
                </Typography>}
        </>
    )
}

const mapPropsToState = ({ movieAndGenre, genres }) => {
    return {
        title: movieAndGenre.selectedMovie.title,
    }
}
export default connect(mapPropsToState)(Title);

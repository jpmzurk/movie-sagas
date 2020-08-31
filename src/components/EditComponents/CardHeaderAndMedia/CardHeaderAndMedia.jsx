import React from 'react';
import {Typography, CardMedia, TextField, FormControl} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    media: {
        width: 425,
        height: 425,
        marginTop: '1em'
    },
    textField: {
        margin: theme.spacing(1),
        width: '40ch',
        marginBottom: '-.2em'
    },
}))

const CardHeaderAndMedia = ({poster, title, editable, register, handleEditable}) => {
    const { media, textField } = useStyles();
    return (
        <div>
            <Typography variant="h4" component="h5" >Edit</Typography>
            <Typography variant="body2" component="p" >Click the section you would like to edit</Typography>
            {editable ?
                <FormControl>
                    <TextField label="movie poster" name="poster" defaultValue={`${poster}`} inputRef={register} multiline className={textField} />
                </FormControl>
                 : <CardMedia image={`${poster}`} title={`${title}`} className={media} onClick={() => handleEditable('poster')}/>
            }
        </div>
    );
}

const mapPropsToState = ({ movieAndGenre }) => {
    return {
        poster: movieAndGenre.selectedMovie.poster,
        title: movieAndGenre.selectedMovie.title,
    }
}
export default connect(mapPropsToState)(CardHeaderAndMedia);

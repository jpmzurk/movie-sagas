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

const Description = ({ description, register, handleEditable, editable }) => {
    const {textField} = useStyles();
    return (
        <>
            {editable ?
                <FormControl>
                    <TextField label="description" name="description" defaultValue={`${description}`} inputRef={register} multiline className={textField} />
                </FormControl>
                : <Typography variant="body2" color="textSecondary" component="p" onClick={() => handleEditable('description')}>
                    {`${description}`}
                </Typography>}
        </>
    )
}

const mapPropsToState = ({ movieAndGenre, genres }) => {
    return {
        description: movieAndGenre.selectedMovie.description,
    }
}
export default connect(mapPropsToState)(Description);

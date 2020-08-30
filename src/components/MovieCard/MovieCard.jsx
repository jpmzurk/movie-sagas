import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        padding: 10,
        marginTop: '1em',
        backgroundColor: '#EBEBEB'
    },
    media: {
        width: 300,
        height: 300,
    },
});

function MovieCard(props) {
    ///use styling above
    const classes = useStyles();
    // send user to details page, set get with id req to 
    const handleImageClick = (id) => {
        props.dispatch({ type: 'FETCH_MOVIE_GENRE', payload: id})
        props.dispatch({ type: 'SET_SELECTED_MOVIE', payload: props.movie})
        props.directToDetails();
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia image={`${props.movie.poster}`}   
                    onClick= {() => { handleImageClick(props.movie.id)}}
                    className={classes.media} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                        {props.movie.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
        </Card>
    )
}

export default connect()(MovieCard);

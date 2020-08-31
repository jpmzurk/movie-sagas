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

function MovieCard({movie, dispatch, directToDetails}) {
    ///use styling above
    const {root, media} = useStyles();
    // send user to details page, set get with id req to 
    const handleImageClick = (id) => {
        dispatch({ type: 'FETCH_MOVIE_GENRE', payload: id})
        dispatch({ type: 'SET_SELECTED_MOVIE', payload: movie})
        directToDetails();
    }

    return (
        <Card className={root}>
            <CardActionArea>
                <CardMedia image={`${movie.poster}`}   
                    onClick= {() => { handleImageClick(movie.id)}}
                    className={media} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                        {movie.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
        </Card>
    )
}

export default connect()(MovieCard);

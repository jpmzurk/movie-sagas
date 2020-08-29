import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
        marginBottom: '1em'
    },
    media: {
        width: 425,
        height: 425,
    },
});

const Details = (props) => {
    const classes = useStyles();

    const directHome = () => {
        props.history.push('/')
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        image={`${props.movieAndGenre.selectedMovie.poster}`}
                        title={`${props.movieAndGenre.selectedMovie}`}
                        // images/finding-nemo.jpg
                        className={classes.media} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h5">
                            {props.movieAndGenre.selectedMovie.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {`${props.movieAndGenre.selectedMovie.description}`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Genres: {props.movieAndGenre.genres.map(genre => {
                                return genre.name + '  '
                            })}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={directHome}> Back to List </Button>
                </CardActions>
            </Card>

        </div>
    );
}

const mapPropsToState = (reduxState) => {
    return {
        movieAndGenre: reduxState.movieAndGenre,
        // selectedGenres: reduxState.movieAndGenre.selectedMovie,
        genres: reduxState.genres,
    }
}
export default connect(mapPropsToState)(Details);

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
        marginBottom: '1em',
        backgroundColor: '#EBEBEB'
    },
    media: {
        width: 425,
        height: 425,
    },
});

const Details = ({ history, movieDetails}) => {
    const classes = useStyles();

    const directHome = () => {
        history.push('/')
    }
    const directEdit = () => {
        history.push('/edit')
    }
    
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography variant="h4" component="h5" style={{marginBottom : '.25em'}}>Details</Typography>
                <CardActionArea>
                    <CardMedia
                        image={`${movieDetails.selectedMovie.poster}`}
                        title={`${movieDetails.selectedMovie}`}
                        className={classes.media} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h5">
                            {movieDetails.selectedMovie.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {`${movieDetails.selectedMovie.description}`}
                        </Typography>
                        { movieDetails.genres.length > 0 &&
                        <Typography variant="body2" color="textSecondary" component="p">
                            Genres: {movieDetails.genres.map(genre => {
                                return genre.name + '  '
                            })}
                        </Typography>
                        }
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={directHome}> HOME </Button>
                    <Button size="small" color="primary" onClick={directEdit}> EDIT </Button>
                </CardActions>
            </Card>
        </div>
    );
}

const mapPropsToState = (reduxState) => {
    return {
        movieDetails: reduxState.movieAndGenre,
        genres: reduxState.genres,
    }
}
export default connect(mapPropsToState)(Details);

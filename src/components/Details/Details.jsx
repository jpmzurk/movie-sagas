import React, { useState, useEffect, useRef } from 'react';
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
        maxWidth: 450,
        padding: 10,
        marginTop: '1em',
    },
    media: {
        width: 300,
        height: 300,
    },
});

const Details = (props) => {
    const classes = useStyles();
    const [movieImg, setMovieImg] = useState('');

    //using useRef.current property as it wont reset on re-render or updates
    // to be flipped after the first render
    //otherwise setImage function runs a continuous nasty loop
    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        setImage();
        console.log('triggering useEffect');
    }, [props.movieGenre]);

    const directHome = () => {
        props.history.push('/')
    }

    const setImage = () => {
        console.log(props.movieGenre, props.movieGenre.length);
        if (props.movieGenre.length === undefined) {
            return 
        } else if (props.movieGenre.length === 0) {
            
            return
        } else if (props.movieGenre.length > 0) {
            const { poster } = props.movieGenre[0]
            console.log( poster );
            setMovieImg(poster)
            return
        }
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        image={`${movieImg}`}

                        className={classes.media} />
                    <CardContent>
                        <Typography gutterBottom variant="body2" component="h5">
                            {/* {props.movieGenre[0].title} */}
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
        movieGenre: reduxState.movieGenre
    }
}
export default connect(mapPropsToState)(Details);

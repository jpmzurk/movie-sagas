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
    const directHome = () => {
        props.history.push('/')
    }
    console.log(props.movieGenre);
    console.log(props.movieGenre[0]);
    // let movie = props.movieGenre[0]
    for (let i = 0; i < props.movieGenre.length; i++) {
        const movie = props.movieGenre[0];
        console.log(movie.poster);
    }
    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia 
                        image={`${props.movieGenre}`}
                   
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

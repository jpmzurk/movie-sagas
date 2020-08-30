import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { createBrowserHistory } from "history";
import Button from '@material-ui/core/Button';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../Home/Home'
import AddMovie from '../AddMovie/AddMovie'
import Details from '../Details/Details'

const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: `1px solid #333333`,
        color: '#ffffff'
    },
    toolbarTitle: {
        flex: .81,
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
        color: '#EBEBEB'
    },
    toolbarSearch: {
        flex: 1.5,
    }
}));

const Header = () => {
    const classes = useStyles();
    return (
        <>
            <Router history={history}>
                <Toolbar className={classes.toolbar}>

                    <Button size="small" className={classes.toolbarLink}
                        component={Link}
                        to="/"
                    > HOME </Button>
                    <Button size="small" className={classes.toolbarLink}
                        component={Link}
                        to="/addMovie"
                    > ADD A MOVIE </Button>
                    <Button size="small" className={classes.toolbarLink}
                        component={Link}
                        to="/details"
                    > DETAILS </Button>
                    <Typography
                        component="h2"
                        variant="h5"
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}
                    >
                        Movies
                </Typography>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
                <main>
                <Route exact path="/" component={Home} />
                <Route path="/addMovie" component={AddMovie} />
                <Route path="/details" component={Details} />
                </main>
            </Router>
        </>
    );
}


export default Header;

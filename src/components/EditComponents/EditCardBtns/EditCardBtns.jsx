import React from 'react';
import { Button, CardActions } from '@material-ui/core'

const SaveBtn = () => {
    return (
        <>
            <Button type="submit" size="small" color="primary"> Save </Button>
        </>
    )
}

const HomeBtn = ({ directHome }) => {
    return (
        <>
            <Button size="small" color="primary" onClick={directHome}> Home </Button>
        </>
    )
}

const CardButtons = ({ directHome, editable }) => {
    return (
        <CardActions>
            {!editable ? <HomeBtn directHome={directHome} /> : <SaveBtn />}
        </CardActions>
    )
}



export default (CardButtons);

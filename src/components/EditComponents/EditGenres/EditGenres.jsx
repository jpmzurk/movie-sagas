import React from 'react';
import { Typography } from '@material-ui/core';


const EditGenres = ({ genres }) => {
    return (
        <>
            {genres.length > 0 &&
                <Typography variant="body2" color="textSecondary" component="p">
                    Genres: {genres.map(genre => {
                    return genre.name + '  '
                })}
                </Typography>}
        </>
    );
}

export default EditGenres;

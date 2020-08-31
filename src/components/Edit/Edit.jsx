import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, FormControl } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import CardHeaderAndMedia from '../EditComponents/CardHeaderAndMedia/CardHeaderAndMedia';
import CardButtons from '../EditComponents/EditCardBtns/EditCardBtns';
import GenreSelector from '../EditComponents/EditGenres/EditGenres';
import Title from '../EditComponents/CardTitle/CardTitle';
import Description from '../EditComponents/CardDescription/CardDescription';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: '18em'
    },
    card: {
        maxWidth: 425,
        padding: 10,
        marginTop: '1em',
        marginBottom: '1em',
        backgroundColor: '#EBEBEB'
    },
});

const Edit = ({ history, genres }) => {
    const { root, card } = useStyles();
    const [editable, setEditable] = useState(false);
    const { handleSubmit, register } = useForm();
    const [payload, setPayload] = useState();
    const directHome = () => {
        history.push('/')
    }

    const handleEditable = (section) => {
        setEditable(editable => !editable)
        console.log(section);
    }

    const onSubmit = (data) => {
        console.log('in onSubmit', data);
        setEditable(editable => !editable);
        setPayload(data)
    }

    return (
        <div className={root}>
            {console.log(payload)}
            <FormControl>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Card className={card}>
                        <CardHeaderAndMedia
                            handleEditable={handleEditable}
                            register={register}
                            editable={editable} />
                        <CardContent>
                            <Title handleEditable={handleEditable} register={register} editable={editable} />
                            <Description handleEditable={handleEditable} register={register} editable={editable} />
                            <GenreSelector genres={genres} />
                        </CardContent>
                        <CardButtons directHome={directHome} editable={editable} />
                    </Card>
                </form>
            </FormControl>
        </div>
    );
}

const mapPropsToState = ({ movieAndGenre, genres }) => {
    return {
        poster: movieAndGenre.selectedMovie.poster,
        title: movieAndGenre.selectedMovie.title,
        description: movieAndGenre.selectedMovie.description,
        genres
    }
}
export default connect(mapPropsToState)(Edit);


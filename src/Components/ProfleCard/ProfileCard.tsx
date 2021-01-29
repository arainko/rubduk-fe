import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActions, Grid } from '@material-ui/core';
import DeleteAccountDialog from '../Dialogs/DeleteDialog/DeleteAccountDialog';
import { useSelector } from 'react-redux';
import { RootState } from '../../Interfaces/interfaces';
import { ImageAPI } from '../../Api/ImageAPI';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '90%'
    },
    header: {
        color: "red",
    },
    subheader: {
        color: "red"
    },
    dangerousButton: {
        color: theme.palette.error.main
    }
}));

interface ProfileCardProps {
    userId: number,
    sessionUserId: number,
    name: string,
    lastName: string,
    createdOn: Date,
    imageLink: string | undefined
}

const ProfileCard = (props: ProfileCardProps) => {
    const classes = useStyles();
    const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);

    return (
        <Card className={classes.root}>
            <CardHeader
            title={props.name + " " + props.lastName}
            subheader={"joined " + (new Date(props.createdOn)).toLocaleDateString() + " at " + (new Date(props.createdOn)).toLocaleTimeString()}
            />
            <CardMedia
                className={classes.media}
                image={
                    props.imageLink !== null || props.imageLink !== undefined
                    ? props.imageLink
                    : ImageAPI.defaultImage()
                }
                title="avatar"
            />
            {props.sessionUserId === props.userId
            ?<CardActions>
                <Grid container justify="center">
                    <DeleteAccountDialog authToken={GoogleTokenId}/>
                </Grid>
            </CardActions>
            :<div></div>}
        </Card>
    );
}

export default ProfileCard; 
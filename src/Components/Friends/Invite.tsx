import { makeStyles, Theme, createStyles, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Interfaces/interfaces';
import { Link } from 'react-router-dom';
import { Link as MaterialLink } from '@material-ui/core';
import { FriendsAPI } from '../../Api/FriendsAPI';
import { invitesNotLoaded, resetInvites, setInvites, invitesLoaded } from '../Redux/Actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginBottom: 5
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
  }),
);

interface InviteProps {
    id: number,
    userFromId: number,
    userFromName: string,
    userFromLastName: string,
    userFromDateOfBirth: Date,
    userToId: number,
    userToName: string,
    userToLastName: string,
    userToDateOfBirth: Date,
    isFromSessionUser: boolean
}

const Invite = (props: InviteProps) => {
    const classes = useStyles();
    const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);
    const dispatch = useDispatch();

    const showButtons = () => {
        if (!props.isFromSessionUser) {
            return (
                <CardActions>
                    <Button size="small" variant="outlined" color="secondary" onClick={handleAccept}>Accept</Button>
                    <Button size="small" variant="outlined" color="secondary" onClick={handleDecline}>Decline</Button>
                </CardActions>
            )
                
        } else {
            return <Typography color="secondary">Pending</Typography>
        }
    }

    const reloadRequests = () => {
        dispatch(invitesNotLoaded())
        dispatch(resetInvites())
        FriendsAPI
        .fetchIncomingInvites(GoogleTokenId)
        .then(async (data) => {
            await dispatch(setInvites(data))
            dispatch(invitesLoaded())
        })
        .catch((error) => alert(error.response.data.message))
    }

    const handleAccept = () => {
        FriendsAPI
        .acceptInvite(props.id, GoogleTokenId)
        .then((data) => console.log(data))
        .catch(error => alert(error.response.data.message))
        reloadRequests()
    }

    const handleDecline = () =>  {
        FriendsAPI
        .declineInvite(props.id, GoogleTokenId)
        .then((data) => console.log(data))
        .catch(error => alert(error.response.data.message))
        reloadRequests()
    }

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
            <CardContent className={classes.content}>
                <Typography component="h5" variant="h5" color="secondary">
                    <MaterialLink to={'/Profile/user=' + props.id} color="secondary" underline="none" component={Link}>
                        {props.isFromSessionUser?props.userToName:props.userFromName} {props.isFromSessionUser?props.userToLastName:props.userFromLastName}
                    </MaterialLink>
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                    {props.isFromSessionUser?props.userToDateOfBirth:props.userFromDateOfBirth}
                </Typography>
            </CardContent>
            {showButtons()}
            </div>
        </Card>
    )
}

export default Invite
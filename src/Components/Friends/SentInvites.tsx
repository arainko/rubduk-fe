import { makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FriendsAPI } from '../../Api/FriendsAPI';
import { RootState } from '../../Interfaces/interfaces';
import theme from '../../theme';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { invitesLoaded, invitesNotLoaded, resetInvites, setInvites } from '../Redux/Actions';
import Invite from './Invite';

const useStyles = makeStyles({
    card: {
        backgroundColor: theme.palette.primary.light,
    },
});

const SentInvites = () => {

    const classes = useStyles();
    const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);
    const dispatch = useDispatch();
    const invites = useSelector((state: RootState) => state.invites);
    const isSpinnerVisible = useSelector((state: RootState) => state.isSpinnerInInvites);

    useEffect(() => {
        dispatch(invitesNotLoaded())
        dispatch(resetInvites())
        FriendsAPI
        .fetchSentInvites(GoogleTokenId)
        .then(async (data) => {
            await dispatch(setInvites(data))
            dispatch(invitesLoaded())
        })
        .catch((error) => alert(error.response.data.message))
    }, [dispatch, GoogleTokenId])

    const showInvites = () => {
        if (invites === null || invites === undefined || invites.length === 0) {
            return <Typography>No invites to display.</Typography>
        } else {
            return invites.map(invite => 
                <Invite
                id={invite.id}
                key={"inv" + invite.id}
                userFromId={invite.fromUser.id}
                userFromName={invite.fromUser.name}
                userFromLastName={invite.fromUser.lastName}
                userFromDateOfBirth={invite.fromUser.dateOfBirth}
                userToId={invite.toUser.id}
                userToName={invite.toUser.name}
                userToLastName={invite.toUser.lastName}
                userToDateOfBirth={invite.toUser.dateOfBirth}
                isFromSessionUser={true}
                />)
        }
    }

    return (
        <Paper variant="outlined" className={classes.card}>
            {isSpinnerVisible
            ? <LoadingSpinner/>
            : showInvites()}
        </Paper>
    )
}

export default SentInvites
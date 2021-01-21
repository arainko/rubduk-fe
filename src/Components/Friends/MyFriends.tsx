import { makeStyles, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FriendsAPI } from '../../Api/FriendsAPI';
import { RootState } from '../../Interfaces/interfaces';
import theme from '../../theme';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { friendsLoaded, friendsNotLoaded, resetFriends, setFriends } from '../Redux/Actions';
import FriendCard from './FriendCard';

const useStyles = makeStyles({
    card: {
        backgroundColor: theme.palette.primary.light,
    },
    noPosts: {
        textAlign: "center",
    }
});

const MyFriends = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);
    const friends = useSelector((state: RootState) => state.friends);
    const sessionUser = useSelector((state: RootState) => state.sessionUser);
    const isSpinnerVisible = useSelector((state: RootState) => state.isSpinnerInFriends);

    useEffect(() => {
        dispatch(friendsNotLoaded())
        dispatch(resetFriends())
        FriendsAPI
        .fetchFriends(GoogleTokenId)
            .then(async (data) =>
            {
                await dispatch(setFriends(data.filter((user: { email: any; }) => user.email !== sessionUser.email)))
            })
        dispatch(friendsLoaded())
    }, [dispatch]);

    const showFriends = (() => {
        if (friends === null || friends.length === 0) {
            return <Typography className={classes.noPosts}>Send Your first invite!</Typography>
        } else {
            return friends.map((friend: any) => 
            <FriendCard
            isInvite={false}
            isSearched={false}
            key={'post' + friend.id}
            id={friend.id}
            name={friend.name}
            lastName={friend.lastName}
            dateOfBirth={friend.dateOfBirth}
            />)
        }
    })

    return (
        <Paper variant="outlined" className={classes.card}>
            {isSpinnerVisible
            ? <LoadingSpinner/>
            : showFriends()}
        </Paper>
    );
}

export default MyFriends
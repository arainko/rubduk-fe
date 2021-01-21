import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserAPI } from '../../Api/UserAPI';
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
    },
    inputText: {
        color: theme.palette.primary.contrastText
    },
        floatingLabelText: {
        color: theme.palette.secondary.dark
    },
    input: {
        marginLeft: 10
    }
});

const SearchFriendsArea = () => {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState('')
    const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);
    const dispatch = useDispatch();
    const friends = useSelector((state: RootState) => state.friends);
    const isSpinnerVisible = useSelector((state: RootState) => state.isSpinnerInFriends);

    useEffect(() => {
        dispatch(friendsNotLoaded())
        dispatch(resetFriends())
        dispatch(friendsLoaded())
    }, [dispatch])

    const handleSearch = () => {
        dispatch(friendsNotLoaded())
        UserAPI
        .searchUsersByName(GoogleTokenId, searchValue)
        .then(async (data) => {
            await dispatch(setFriends(data))
            dispatch(friendsLoaded())
        })
        .catch((error) => alert(error.response.data.message))
    }

    const showQuery = () => {
        if (friends === null || friends === undefined || friends.length === 0) {
            return <Typography>Type in the box above to search.</Typography>
        } else {
            return friends.map(friend =>
                <FriendCard
                id={friend.id}
                key={'friend' + friend.id}
                name={friend.name}
                lastName={friend.lastName}
                dateOfBirth={friend.dateOfBirth}
                isInvite={false}
                isSearched={true}
                />
            )
        }
    }

    return (
        <Paper variant="outlined" className={classes.card}>
            <Grid container justify="center">
                <TextField
                label="Search by name"
                className={classes.input}
                value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value)
                }}
                InputProps={{
                    className: classes.inputText
                }}
                InputLabelProps={{
                    className: classes.floatingLabelText,
                }}
                />
                <Button variant="outlined" color="secondary" size="small" onClick={handleSearch}>
                    Search
                </Button>
            </Grid>
            <Paper className={classes.card}>
                {isSpinnerVisible
                ? <LoadingSpinner/>
                : showQuery()}
            </Paper>
        </Paper>
    )
}

export default SearchFriendsArea
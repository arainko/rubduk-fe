import React from 'react';
import { useEffect } from 'react';
import { UserAPI } from '../../Api/UserAPI';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCard from '../ProfleCard/ProfileCard';
import PostArea from '../PostArea/PostArea';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileUser, profileUserLoaded } from '../Redux/Actions';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { Typography } from '@material-ui/core';
import theme from '../../theme';
import { RootState } from '../../Interfaces/interfaces';
import PostTabs from '../PostTabs/PostTabs';
import PostWriter from '../PostWriter/PostWriter';

interface UserProfileProps {
    userId: number
}

const useStyles = makeStyles({
    error: {
        color: theme.palette.warning.dark,
    },
    errorWrapper: {
        textAlign: "center"
    }
});

const UserProfile = (props: UserProfileProps) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const profileUser = useSelector((state: RootState) => state.profileUser);
    const isSpinnerVisible = useSelector((state: RootState) => state.isSpinnerInUserPage);

    const showUser = () => {
            if (profileUser === null) {
                return (
                    <div className={classes.errorWrapper}>
                        <Typography variant="h2" className={classes.error}>Quack! User not found.</Typography>
                    </div>
                )
            } else {
                return (<div id={"user-info"}>
                <div id={"profile-card"}>
                    {<ProfileCard name={profileUser.name} lastName={profileUser.lastName} createdOn={profileUser.createdOn}/>}
                </div>
                <div id={"post-area"}>
                    <PostWriter isInFeed={false} userId={profileUser.id}/>
                    <PostTabs isInFeed={false} userId={profileUser.id}/>
                </div>
            </div>)
            }
    }

    useEffect(() => {
            UserAPI.fetchUserWithId(props.userId)
            .then((downloadedUser) => {
                dispatch(setProfileUser(downloadedUser))
                dispatch(profileUserLoaded())
            })
            .catch(err => {
                if (err.response === undefined) {
                    console.log("Can't connect");
                    dispatch(profileUserLoaded())
                } else if (err.response.status === 404) {
                    console.log("user not found");
                    dispatch(profileUserLoaded())
                } else {
                    console.log("user not found");
                    dispatch(profileUserLoaded())
                }
            })
    }, [props.userId, dispatch]);

    return (
        <div>
            {isSpinnerVisible
            ?<div style={{marginTop: 50}}>
                <LoadingSpinner/>
            </div>
            : showUser()
        }
        </div>
    )
}

export default UserProfile;
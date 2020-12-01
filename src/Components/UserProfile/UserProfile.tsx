import React from 'react';
import { useEffect } from 'react';
import { UserAPI } from '../../Api/UserAPI';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCard from '../ProfleCard/ProfileCard';
import PostArea from '../PostArea/PostArea';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userLoaded } from '../Redux/Actions';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { Typography } from '@material-ui/core';
import theme from '../../theme';

interface UserProfileProps {
    userId: number
}

interface RootState {
    user: any
    isSpinnerInUserPage: Boolean
    //TODO make interface for user
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
    const user = useSelector((state: RootState) => state.user);
    const isSpinnerVisible = useSelector((state: RootState) => state.isSpinnerInUserPage);

    const showUser = () => {
            if (user === null) {
                return (
                    <div className={classes.errorWrapper}>
                        <Typography variant="h2" className={classes.error}>Quack! User not found.</Typography>
                    </div>
                )
            } else {
                return (<div id={"user-info"}>
                <div id={"profile-card"}>
                    {<ProfileCard name={user.name} lastName={user.lastName} createdOn={user.createdOn}/>}
                </div>
                <div id={"post-area"}>
                    {<PostArea userId={user.id} userName={user.name} userLastName={user.lastName}/>}
                </div>
            </div>)
            }
    }

    useEffect(() => {
            UserAPI.fetchUserWithId(props.userId)
            .then((downloadedUser) => {
                dispatch(setUser(downloadedUser))
                dispatch(userLoaded())
            })
            .catch(err => {
                if (err.response.status === 404) {
                    console.log("user not found");
                    dispatch(userLoaded())
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
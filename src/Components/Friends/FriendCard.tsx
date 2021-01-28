import { makeStyles, Theme, createStyles, Card, CardContent, CardMedia, Typography, CardActions, Button, Snackbar } from '@material-ui/core';
import { Link as MaterialLink } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react'
import { FriendsAPI } from '../../Api/FriendsAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../Interfaces/interfaces';
import { useSnackbar } from '../UseSnackBar/useSnackbar';
import { ImageAPI } from '../../Api/ImageAPI';

interface FriendCardInterface {
    id: number,
    name: string,
    lastName: string,
    dateOfBirth: Date,
    isSearched: boolean,
    isInvite: boolean,
    imageLink: string | undefined
}

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
    photo: {
      height: 160,
      width: 160
    },
  }),
);

const FriendCard = (props: FriendCardInterface) => {
  const snackBar = useSnackbar();
    const classes = useStyles();
    const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);

    const handleAdd = () => {
      FriendsAPI
      .addFriend(props.id, GoogleTokenId)
      .then((data) => {
        snackBar.openSnackbar("Request sent!")
      })
      .catch((error) => snackBar.openSnackbar(error.response.data))
    }

    const showButtons = () => {
      if (props.isInvite) {
        return (
          <CardActions>
            <Button variant="outlined" size="small" color="secondary">Accept</Button>
            <Button variant="outlined" size="small" color="secondary">Decline</Button>
          </CardActions>
        )
      } else if (props.isSearched) {
        return (
          <CardActions>
            <Button 
            variant="outlined" 
            size="small" 
            color="secondary"
            onClick={handleAdd}
            >Add
            </Button>
          </CardActions>
        )
      } else {
        return <div></div>
      }
    }

    return (
    <Card className={classes.root}>
        <CardMedia
        className={classes.photo}
        image={
          props.imageLink !== null || props.imageLink !== undefined
          ? props.imageLink
          : ImageAPI.defaultImage()
        }
        title="avatar"
        />
        <div className={classes.details}>
        <CardContent className={classes.content}>
            <Typography component="h5" variant="h5" color="secondary">
                <MaterialLink to={'/Profile/user=' + props.id} color="secondary" underline="none" component={Link}>
                    {props.name} {props.lastName}
                </MaterialLink>
            </Typography>
            <Typography variant="subtitle1" color="secondary">
                {props.dateOfBirth}
            </Typography>
        </CardContent>
        {showButtons()}
        </div>
        <Snackbar {...snackBar}/>
    </Card>
    );
}

export default FriendCard
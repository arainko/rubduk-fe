import { makeStyles, Theme, createStyles, Card, CardContent, CardMedia, Typography, CardActions, Button } from '@material-ui/core';
import { Link as MaterialLink } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react'
import { FriendsAPI } from '../../Api/FriendsAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../Interfaces/interfaces';

interface FriendCardInterface {
    id: number,
    name: string,
    lastName: string,
    dateOfBirth: Date,
    isSearched: boolean,
    isInvite: boolean
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
    const classes = useStyles();
    const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);

    const handleAdd = () => {
      FriendsAPI
      .addFriend(props.id, GoogleTokenId)
      .then((data) => {
        console.log(data)
        alert("Request sent!")
      })
      .catch((error) => alert(error.response.data.message))
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
        image="data:image/jpeg;base64,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"
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
    </Card>
    );
}

export default FriendCard
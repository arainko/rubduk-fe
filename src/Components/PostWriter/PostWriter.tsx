import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Grid, Snackbar, TextField, Typography } from '@material-ui/core';
import theme from '../../theme'
import { useDispatch, useSelector } from 'react-redux';
import { PostAPI } from '../../Api/PostAPI';
import { RootState } from '../../Interfaces/interfaces';
import { mediaLoaded, mediaNotLoaded, postsLoaded, postsNotLoaded, resetMediaToUpload, setMedia, setMediaToUpload, setPosts } from '../Redux/Actions';
import { MediaAPI } from '../../Api/MediaAPI';
import { useSnackbar } from '../UseSnackBar/useSnackbar';

const useStyles = makeStyles({
  root: {

  },
  card: {
    marginBottom: 5,
  },
  media: {
    height: 140,
  },
  button: {
    color: theme.palette.secondary.dark,
  },
  inputText: {
    color: theme.palette.primary.contrastText
  },
    floatingLabelText: {
    color: theme.palette.secondary.dark
},
});

interface PostWriterProps {
  isInFeed: boolean,
  userId: number
}

const PostWriter = (props: PostWriterProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [postValue, setPostValue] = useState('');
  const [mediaValue, setMediaValue] = useState("No media selected.");
  const sessionUser = useSelector((state: RootState) => state.sessionUser);
  const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);
  const mediaToUpload = useSelector((state: RootState) => state.mediaToUpload);
  const snackBar = useSnackbar();

  const checkMediaValue = () => {
    if (mediaValue.length === 0) {
      return "No media selected."
    } else {
      return "sdd"
    }
  }

  const handlePostPost = async () => {
    if (mediaToUpload === null) {
      dispatch(postsNotLoaded())
      await PostAPI
      .postPost(sessionUser.id, postValue, GoogleTokenId)
      .then((data) => snackBar.openSnackbar("Post sent!"))
      .catch((error) => {
        snackBar.openSnackbar(error.response.data)
      })

      if (props.isInFeed) {
        PostAPI.fetchPostsByFriends(GoogleTokenId)
        .then(async (data) => {
          await dispatch(setPosts(data))
        })
        .catch((error) => {
          snackBar.openSnackbar(error.response.data)
        })
      } else {
        PostAPI.fetchPostsByUserId(props.userId)
        .then(async (data) => {
          await dispatch(setPosts(data))
        })
        .catch((error) => {
          snackBar.openSnackbar(error.response.data)
        })
      }
      dispatch(postsLoaded())
    } else {
      dispatch(mediaNotLoaded())
      await MediaAPI
      .postMediaByUserToken(GoogleTokenId, mediaToUpload, postValue)
      .then((data) => snackBar.openSnackbar("Post sent!"))
      .catch((error) => {
        snackBar.openSnackbar(error.response.data)
      })

      .catch((error) => {
        snackBar.openSnackbar(error.response.data)
      })
      if (props.isInFeed) {
        MediaAPI.fetchMediaByFriends(GoogleTokenId)
        .then(async (data) => {
          await dispatch(setMedia(data))
        })
        .catch((error) => {
          snackBar.openSnackbar(error.response.data)
        })
      } else {
        MediaAPI.fetchMediaByUserId(props.userId)
        .then(async (data) => {
          await dispatch(setMedia(data))
        })
      }
      dispatch(mediaLoaded())
      dispatch(resetMediaToUpload())
    }
  }

  const handleFileInput = async (e: any) => {
    if (e.target.files[0] !== null || e.target.files[0] !== undefined) {
      await MediaAPI.convertToBase64(e.target.files[0])
      .then(async (data: any) => {
        var strippedData = data.replace("data:image/png;base64,", "")
        dispatch(setMediaToUpload(strippedData))
        snackBar.openSnackbar("Media added!")
        setMediaValue(e.target.files[0].name)
      })
    }
  }

  const shortenMediaName = () => {
    if (mediaValue.length > 30) {
      var str = mediaValue.split(".")
      return str[0].substring(0, 30) + "..." + str[1]
    } else {
      return mediaValue
    }
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
            <CardContent>
            <TextField
            autoFocus
            margin="dense"
            id="post-textfield"
            label="Write your post or send media with description"
            type="text"
            multiline
            rows={6}
            fullWidth
            color="secondary"
            value={postValue}
                    onChange={(e) => {
                        setPostValue(e.target.value)
                }}
            InputProps={{
                className: classes.inputText
            }}
            InputLabelProps={{
                className: classes.floatingLabelText,
            }}
            >

            </TextField>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justify="flex-start">
          <Button size="small" className={classes.button} onClick={() => handlePostPost()}>
            Send!
          </Button>
          <Button
            component="label"
            size="small" className={classes.button}
          >
            Upload a file
            <input
              onChange={handleFileInput}
              type="file"
              accept="image/*"
              hidden
            />
          </Button>
          <Button size="small" className={classes.button} onClick={() => setPostValue("")}>
            Cancel
          </Button>
        </Grid>
        <Grid container justify="flex-end">
        <Typography color="secondary">
          {mediaValue.length === 0
          ? "No media selected."
          : "Added: " + shortenMediaName()}
        </Typography>
        </Grid>
      </CardActions>
      <Snackbar {...snackBar}/>
    </Card>
  );
}

export default PostWriter
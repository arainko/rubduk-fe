import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import theme from '../../theme'
import { useDispatch, useSelector } from 'react-redux';
import { PostAPI } from '../../Api/PostAPI';
import { RootState } from '../../Interfaces/interfaces';
import { mediaLoaded, mediaNotLoaded, postsLoaded, postsNotLoaded, resetMediaToUpload, setMedia, setMediaToUpload, setPosts } from '../Redux/Actions';
import { MediaAPI } from '../../Api/MediaAPI';

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
  const [postValue, setPostValue] = useState('')
  const sessionUser = useSelector((state: RootState) => state.sessionUser);
  const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);
  const mediaToUpload = useSelector((state: RootState) => state.mediaToUpload);

  const handlePostPost = async () => {
    if (mediaToUpload === null) {
      dispatch(postsNotLoaded())
      await PostAPI.postPost(sessionUser.id, postValue, GoogleTokenId)
      if (props.isInFeed) {
        PostAPI.fetchPostsByFriends(GoogleTokenId)
        .then(async (data) => {
          await dispatch(setPosts(data))
        })
      } else {
        PostAPI.fetchPostsByUserId(props.userId)
        .then(async (data) => {
          await dispatch(setPosts(data))
        })
      }
      dispatch(postsLoaded())
    } else {
      dispatch(mediaNotLoaded())
      await MediaAPI
      .postMediaByUserToken(GoogleTokenId, mediaToUpload, postValue)
      .catch((error) => {
        alert(error.response.data)
      })
      if (props.isInFeed) {
        MediaAPI.fetchMediaByFriends(GoogleTokenId)
        .then(async (data) => {
          await dispatch(setMedia(data))
        })
        .catch((error) => {
          alert(error.response.data)
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
    await MediaAPI.convertToBase64(e.target.files[0])
    .then(async (data: any) => {
      var strippedData = data.replace("data:image/png;base64,", "")
      console.log(strippedData)
      dispatch(setMediaToUpload(strippedData))
    })
    .catch((error) => {
      alert(error.response.data)
    })
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
      </CardActions>
    </Card>
  );
}

export default PostWriter
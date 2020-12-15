import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import theme from '../../theme'
import { useSelector } from 'react-redux';
import { PostAPI } from '../../Api/PostAPI';
import { RootState } from '../../Interfaces/interfaces';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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

export default function MediaCard() {
  const classes = useStyles();

  const handlePostPost = () => {
    PostAPI
        .postPost(sessionUser.id, postValue, GoogleTokenId)
}

  const [postValue, setPostValue] = useState('')
  const sessionUser = useSelector((state: RootState) => state.sessionUser);
  const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);

  return (
    <Card className={classes.card}>
      <CardActionArea>
            <CardContent>
            <TextField
            autoFocus
            margin="dense"
            id="post-textfield"
            label="Write your post"
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
          Post!
        </Button>
        <Button size="small" className={classes.button} onClick={() => setPostValue("")}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
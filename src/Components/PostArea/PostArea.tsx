import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Post from '../Post/Post'
import theme from '../../theme'
import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { PostAPI } from '../../Api/PostAPI'
import { useDispatch } from 'react-redux';
import { setPosts } from '../Redux/Actions';

const useStyles = makeStyles({
    card: {
        backgroundColor: theme.palette.primary.light,
    },
});

interface PostAreaProps {
    userId: number,
    userName: string,
    userLastName: string
}

const PostArea = (props: PostAreaProps) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    return (
        <Paper variant="outlined" className={classes.card}>
            <button onClick={
                () => trackPromise(PostAPI.fetchPosts()).then((data) => dispatch(setPosts(data)))
                }>Click to download posts to state</button>
            {/* {posts.map(post => <Post key={post.id} userId={props.userId} userName={props.userName} userLastName={props.userLastName} contents={post.contents} dateAdded={post.dateAdded}/>)} */}
        </Paper>
    )
}

export default PostArea;
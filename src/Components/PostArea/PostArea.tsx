import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Post from '../Post/Post'
import theme from '../../theme'
import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { PostAPI } from '../../Api/PostAPI'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../Redux/Actions';
import PostProp from '../Post/Post'

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

interface PostProps {
    userId: number,
    userName: string,
    userLastName: string,
    contents: string,
    dateAdded: Date
}

interface RootState {
    posts: Array<PostProps>
    // TODO posts interface
}

const PostArea = (props: PostAreaProps) => {
    const classes = useStyles();

    useEffect(() => {
        trackPromise(PostAPI.fetchPosts()).then((data) => dispatch(setPosts(data)))
    });

    const posts = useSelector((state: RootState) => state.posts);

    const dispatch = useDispatch();

    return (
        <Paper variant="outlined" className={classes.card}>
            {posts.length === 0 
            ? <h6>no posts</h6>
            : posts.map(post => <Post userId={post.userId} contents={post.contents} dateAdded={post.dateAdded} userLastName={props.userLastName} userName={props.userName}/>)}
        </Paper>
    )
}

export default PostArea;
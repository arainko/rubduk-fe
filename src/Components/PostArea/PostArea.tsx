import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import Post from '../Post/Post'
import theme from '../../theme'
import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { PostAPI } from '../../Api/PostAPI'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../Redux/Actions';

const useStyles = makeStyles({
    card: {
        backgroundColor: theme.palette.primary.light,
    },
    noPosts: {
        textAlign: "center",
    }
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

    const dispatch = useDispatch();

    useEffect(() => {
        trackPromise(
            PostAPI
            .fetchPostsByUserId(props.userId)
            .then((data) =>
                {
                    dispatch(setPosts(data))
                }
            ))
    }, [props.userId]);

    const posts = useSelector((state: RootState) => state.posts);

    return (
        <Paper variant="outlined" className={classes.card}>
            {posts.length === 0 
            ? <Typography className={classes.noPosts}>No posts, write Your first!</Typography>
            : posts.map(post => <Post userId={post.userId} contents={post.contents} dateAdded={post.dateAdded} userLastName={props.userLastName} userName={props.userName}/>)}
        </Paper>
    )
}

export default PostArea;
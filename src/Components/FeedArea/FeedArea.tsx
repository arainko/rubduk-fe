import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import Post from '../Post/Post'
import theme from '../../theme'
import { useEffect } from 'react';
import { PostAPI } from '../../Api/PostAPI'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, profilePostsLoaded } from '../Redux/Actions';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

const useStyles = makeStyles({
    card: {
        backgroundColor: theme.palette.primary.light,
    },
    noPosts: {
        textAlign: "center",
    }
});

interface PostProps {
    id: number,
    userId: number,
    userName: string,
    userLastName: string,
    contents: string,
    dateAdded: Date
}

interface RootState {
    posts: Array<PostProps>
    isSpinnerInProfilePosts: Boolean
}

const FeedArea = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        PostAPI
            .fetchPosts()
            .then((data) =>
            {
                dispatch(setPosts(data))
                dispatch(profilePostsLoaded())
            })
    }, [dispatch]);

    const posts = useSelector((state: RootState) => state.posts);
    const isSpinnerVisible = useSelector((state: RootState) => state.isSpinnerInProfilePosts);

    const showPosts = (() => {
        if (posts.length === 0) {
            return <Typography className={classes.noPosts}>No posts, write Your first!</Typography>
        } else {
            return posts.map(post => <Post key={'post' + post.id} postId={post.id} userId={post.userId} contents={post.contents} dateAdded={post.dateAdded} userLastName={post.userLastName} userName={post.userName}/>)
        }
    })

    return (
        <Paper variant="outlined" className={classes.card}>
            {isSpinnerVisible
                ? <LoadingSpinner/>
                : showPosts()}
        </Paper>
    )
}

export default FeedArea;
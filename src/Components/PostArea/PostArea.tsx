import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import Post from '../Post/Post'
import theme from '../../theme'
import { useEffect } from 'react';
import { PostAPI } from '../../Api/PostAPI'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, postsLoaded, postsNotLoaded } from '../Redux/Actions';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { PostAreaProps, RootState } from '../../Interfaces/interfaces';

const useStyles = makeStyles({
    card: {
        backgroundColor: theme.palette.primary.light,
    },
    noPosts: {
        textAlign: "center",
    }
});

const PostArea = (props: PostAreaProps) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);
    const posts = useSelector((state: RootState) => state.posts);
    const isSpinnerVisible = useSelector((state: RootState) => state.isSpinnerInPosts);

    useEffect(() => {
        dispatch(postsNotLoaded())
        if (props.isInFeed) {
            PostAPI
            .fetchPostsByFriends(GoogleTokenId)
            .then(async (data) =>
            {
                await dispatch(setPosts(data))
                dispatch(postsLoaded())
            })
        } else if (props.userId !== undefined) {
            PostAPI
            .fetchPostsByUserId(props.userId)
            .then(async (data) =>
                {
                    await dispatch(setPosts(data))
                    dispatch(postsLoaded())
                })
        }
    }, [props.userId, props.isInFeed, GoogleTokenId, dispatch]);

    const showPosts = (() => {
        if (posts === null) {
            return <Typography className={classes.noPosts}>No posts to show.</Typography>
        } else {
            return posts.map(post => 
            <Post
                key={'post' + post.id} 
                postId={post.id} 
                userId={post.userId} 
                contents={post.contents} 
                dateAdded={post.dateAdded}
                userLastName={post.userLastname} 
                userName={post.username}
                likes={post.likes}
                isInFeed={props.isInFeed}/>)
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

export default PostArea;
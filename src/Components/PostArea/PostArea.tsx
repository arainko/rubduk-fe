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
import PostWriter from '../PostWriter/PostWriter';
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

    const posts = useSelector((state: RootState) => state.posts);
    const isSpinnerVisible = useSelector((state: RootState) => state.isSpinnerInPosts);
    const sessionUser = useSelector((state: RootState) => state.sessionUser);

    const showWriteOrNot = () => {
        if (sessionUser.id === props.userId) {
            return (
                <PostWriter isInFeed={props.isInFeed} userId={props.userId}/>
            )
        } else {
            return (<div></div>)
        }
    }

    useEffect(() => {
        dispatch(postsNotLoaded())
        if (props.isInFeed) {
            PostAPI
            .fetchPosts()
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
    }, [props.userId, props.isInFeed, dispatch]);

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
                isInFeed={props.isInFeed}/>)
        }
    })

    return (
        <Paper variant="outlined" className={classes.card}>
            {/* {isSpinnerVisible
            ? <div></div>
            : showWriteOrNot()} */}
            {isSpinnerVisible
            ? <LoadingSpinner/>
            : showPosts()}
        </Paper>
    )
}

export default PostArea;
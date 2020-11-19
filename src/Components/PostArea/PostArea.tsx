import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Post from '../Post/Post'
import theme from '../../theme'
import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useState } from 'react';
import { PostAPI } from '../../Api/PostAPI'
import {LoadingSpinner} from '../LoadingSpinner/LoadingSpinner'

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

export default function PostArea(props: PostAreaProps) {
    const classes = useStyles();
    
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        trackPromise(
            PostAPI.fetchPosts()
            .then((posts) => {
                setPosts(posts)
            })
        )
    }, []);

    return (
        <Paper variant="outlined" className={classes.card}>
            {posts.map(post => <Post key={post.id} userName={props.userName} userLastName={props.userLastName} contents={post.contents} dateAdded={post.dateAdded}/>)}
        </Paper>
    )
}

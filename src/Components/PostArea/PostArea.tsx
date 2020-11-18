import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Post from '../Post/Post'
import theme from '../../theme'
import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useState } from 'react';
import axios from 'axios';
import {LoadingSpinner} from '../LoadingSpinner/LoadingSpinner'

const useStyles = makeStyles({
    card: {
        backgroundColor: theme.palette.primary.light,
    },
});

export default function PostArea() {
    const classes = useStyles();
    
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        trackPromise(
            axios.get(`http://localhost:8080/api/posts`)
            .then(res => {
                const downloadedPosts = res.data;
                setPosts(downloadedPosts.entities);
            })
        )
    });

    return (
        <Paper variant="outlined" className={classes.card}>
            {posts.map(post => <Post contents={post.contents} date={post.dateAdded}/>)}
            <LoadingSpinner/>
        </Paper>
    )
}

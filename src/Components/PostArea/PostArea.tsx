import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Post from '../Post/Post'
import theme from '../../theme'

const useStyles = makeStyles({
    card: {
        backgroundColor: theme.palette.primary.light,
    },
});

export default function PostArea() {
    const classes = useStyles();

    return (
        <Paper variant="outlined" className={classes.card}>
            <Post contents="This is my best post"/>
            <Post contents="POstiiiiiiiiiing"/>
            <Post contents="Im boreeed"/>
        </Paper>
    )
}

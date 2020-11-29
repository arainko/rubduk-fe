import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';
import FaceIcon from '@material-ui/icons/Face'
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    comment: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
        overflowWrap: "break-word"
    },
    commentOwner: {
        color: theme.palette.secondary.dark,
        paddingLeft:5,
    },
    whole: {
        backgroundColor: theme.palette.primary.light,
        margin:5,
    }
});

interface CommentProps {
    commentId: number,
    contents: string,
}

const Comment = (props: CommentProps) => {
    const classes = useStyles();
    return (
        <Paper className={classes.whole} text-align="justify">
            <p className={classes.commentOwner}>
                <FaceIcon/> Placeholder Names
                <span title="date">00.00.0000</span>
            </p>
            <Typography className={classes.comment} >{props.contents}</Typography>
        </Paper>

    )

}
export default Comment;
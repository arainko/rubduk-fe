import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import Typography from '@material-ui/core/Typography';
import Comment from '../Comment/Comment'
import { CommentsAPI } from '../../Api/CommentsAPI'
import { setComments, resetComments, commentsLoaded, commentsNotLoaded } from '../Redux/Actions';

const useStyles = makeStyles({
    button: {
        backgroundColor: theme.palette.secondary.dark
    },
    commentButton: {
        color: theme.palette.secondary.dark
    },
    inputText: {
        color: theme.palette.primary.contrastText
    },
    noComments: {
        color: theme.palette.secondary.dark,
        textAlign: "center"
    },
    floatingLabelText: {
        color: theme.palette.secondary.dark
    },
    title: {
        color: theme.palette.secondary.dark
    }
});

interface CommentsModalProps {
    postId: number
}

interface RootState {
    comments: Array<any>
    isSpinnerInComments: Boolean
    // TODO make comments interface
}

const CommentsModal = (props: CommentsModalProps) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        CommentsAPI
        .fetchCommentstsByPostId(props.postId)
        .then((data) => {
            dispatch(setComments(data))
            dispatch(commentsLoaded())
        })
    };

    const handleClose = () => {
        setOpen(false);
        dispatch(resetComments())
        dispatch(commentsNotLoaded())
    };

    const dispatch = useDispatch();

    const showComments = () => {
        if (comments.length === 0) {
            return (<div  className={classes.noComments}>
                <Typography>No comments, be first!</Typography>
            </div>)
        } else {
            return comments.map(comment => <Comment key={"comment" + comment.commentId} commentId={comment.commentId} contents={comment.contents}/>)
        }
    }

    const comments = useSelector((state: RootState) => state.comments);
    const isSpinnerVisible = useSelector((state: RootState) => state.isSpinnerInComments)

    return (
        <div>
            <Button size="small" variant="contained" className={classes.button} onClick={handleClickOpen}>
                Comment
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick fullWidth>
                <DialogTitle id="form-dialog-title" className={classes.title}>Comments</DialogTitle>
                {isSpinnerVisible
                ? <LoadingSpinner/>
                : showComments()
                }
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Write your comment"
                        type="text"
                        multiline
                        rows={3}
                        fullWidth
                        color="secondary"
                        InputProps={{
                            className: classes.inputText
                        }}
                        InputLabelProps={{
                            className: classes.floatingLabelText,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.commentButton}>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} className={classes.commentButton}>
                        Post Comment
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CommentsModal;
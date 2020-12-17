import React, { useState } from 'react';
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
import { RootState } from '../../Interfaces/interfaces';

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
    postId: number,
    userId: number
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

    const handleClose = async () => {
        setOpen(false);
        await dispatch(resetComments())
        dispatch(commentsNotLoaded())
    };

    const reloadComments = async () => {
        dispatch(commentsNotLoaded())
        await CommentsAPI
        .fetchCommentstsByPostId(props.postId)
        .then(async (data) => {
            await dispatch(setComments(data))
            dispatch(commentsLoaded())
        })
    }

    const [commentValue, setCommentValue] = useState('') 

    const sessionUser = useSelector((state: RootState) => state.sessionUser);
    const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);

    const handleCommentPost = async () => {
        await CommentsAPI
            .postComentInPost(props.postId, sessionUser.id, commentValue, GoogleTokenId)
        reloadComments()
    }

    const dispatch = useDispatch();

    const showComments = () => {
        if (comments.length === 0) {
            return (<div  className={classes.noComments}>
                <Typography>No comments, be first!</Typography>
            </div>)
        } else {
            return comments.map(comment => <Comment postId={props.postId} userId={props.userId} key={"comment" + comment.id} dateAdded={comment.dateAdded} userName={comment.name} userLastName={comment.lastName} commentId={comment.id} contents={comment.contents}/>)
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
                <DialogContent>
                    {isSpinnerVisible
                    ? <LoadingSpinner/>
                    : showComments()
                    }
                    
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comment-textfield"
                        label="Write your comment"
                        type="text"
                        multiline
                        rows={3}
                        fullWidth
                        color="secondary"
                        value={commentValue}
                        onChange={(e) => {
                            setCommentValue(e.target.value)
                        }}
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
                    <Button onClick={handleCommentPost} className={classes.commentButton}>
                        Post Comment
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CommentsModal;
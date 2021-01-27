import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import theme from '../../../theme';
import { makeStyles, MenuItem } from '@material-ui/core';
import { CommentsAPI } from '../../../Api/CommentsAPI';
import { Snackbar } from '@material-ui/core';
import { useSnackbar } from '../../UseSnackBar/useSnackbar';
import { useDispatch } from 'react-redux';
import { commentsLoaded, commentsNotLoaded, postsLoaded, postsNotLoaded, resetComments, setComments, setPosts } from '../../Redux/Actions';
import { PostAPI } from '../../../Api/PostAPI';

const useStyles = makeStyles({
    dangerousButton: {
        color: theme.palette.secondary.dark,
    },
    button: {
        color: theme.palette.secondary.main,
    }
});

type DialogProps = {
    isPost: boolean,
    isInFeed?: boolean,
    postId: number,
    commentId?: number,
    userId: number,
    authToken: string
}

const DeleteDialog = (props: DialogProps) => {
    const [open, setOpen] = React.useState(false);
    const [contentType, setContentType] = React.useState("");
    const classes = useStyles();
    const snackBar = useSnackbar();
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        if (!props.isPost) {
            deleteComment()
        } else if (props.isInFeed) {
            deletePostInFeed()
        } else {
            deletePostInProfile()
        }
    }

    const deletePostInFeed = () => {
        dispatch(postsNotLoaded())
        PostAPI
            .deletePost(props.postId, props.authToken)
            .then((data) => {
                snackBar.openSnackbar("Post deleted!")
                PostAPI
                .fetchPostsByFriends(props.authToken)
                .then(async (data) => {
                    dispatch(setPosts(data))
                    dispatch(postsLoaded())
                })
                .catch(async (error) => {
                    snackBar.openSnackbar(error.response.data)
                    dispatch(setPosts(null))
                    dispatch(postsLoaded())
                })
            })
            .catch((error) => {
                snackBar.openSnackbar(error.response.data)
                dispatch(postsLoaded())
            })
        handleClose()
    }

    const deletePostInProfile = () => {
        dispatch(postsNotLoaded())
        PostAPI
            .deletePost(props.postId, props.authToken)
            .then((data) => {
                snackBar.openSnackbar("Post deleted!")
                PostAPI
                .fetchPostsByUserId(props.userId)
                .then(async (data) => {
                    dispatch(setPosts(data))
                    dispatch(postsLoaded())
                })
                .catch(async (error) => {
                    snackBar.openSnackbar(error.response.data)
                    dispatch(setPosts(null))
                    dispatch(postsLoaded())
                })
            })
            .catch((error) => {
                snackBar.openSnackbar(error.response.data)
                dispatch(postsLoaded())
            })
        handleClose()
    }

    const deleteComment = () => {
        dispatch(commentsNotLoaded())
        CommentsAPI
            .deleteComment(props.postId, props.commentId, props.authToken)
            .then((data) => {
                snackBar.openSnackbar("Comment deleted!")
                CommentsAPI
                .fetchCommentstsByPostId(props.postId)
                .then(async (data) => {
                    dispatch(setComments(data))
                    dispatch(commentsLoaded())
                })
                .catch(async (error) => {
                    snackBar.openSnackbar(error.response.data)
                    dispatch(resetComments())
                    dispatch(commentsLoaded())
                })
            })
            .catch((error) => {
                snackBar.openSnackbar(error.response.data)
                dispatch(commentsLoaded())
            })
        handleClose()
    }

    useEffect(() => {
        if (props.isPost) {
            setContentType("post")
        } else {
            setContentType("comment")
        }
    }, [props.isPost])

    return (
        <div>
            <MenuItem className={classes.button} onClick={handleClickOpen}>
                Delete
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={classes.dangerousButton}>{"Confirm deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText color="secondary" id="alert-dialog-description">
                        Are You sure You want to delete this {contentType}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        No
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar {...snackBar}/>
        </div>
    );
}

export default DeleteDialog
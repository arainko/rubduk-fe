import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './CommentsModal.css'
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';
import { Typography } from '@material-ui/core';

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
});

interface CommentsModalProps {
    postId: number,
    userId: number
}

export default function CommentsModal() {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" variant="contained" className={classes.button} onClick={handleClickOpen}>
                Comment
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick fullWidth>
                <DialogTitle id="form-dialog-title" className="title">Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Write your comment"
                        type="text"
                        multiline
                        rows={7}
                        fullWidth
                        color="secondary"
                        InputProps={{
                            className: classes.inputText
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
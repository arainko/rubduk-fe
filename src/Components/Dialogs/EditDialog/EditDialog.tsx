import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import theme from '../../../theme';
// import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    button: {
        color: theme.palette.secondary.main,
    },
    commentField: {
        marginLeft: 15,
        marginRight: 15,
        minWidth: "80%"
    },
    title: {
        color: theme.palette.secondary.main,
    },
    multilineColor: {
        color: theme.palette.secondary.main,
    }
});

interface EditDialogInterface {
    isPost: Boolean,
    isInFeed?: Boolean,
    contents: string,
    postId: number,
    userId: number,
    authToken: string
}

const EditDialog = (props: EditDialogInterface) => {

    useEffect(() => {
        if (props.isPost) {
            setContentType("post")
        } else {
            setContentType("comment")
        }
    }, [props.isPost])

    const [open, setOpen] = React.useState(false);
    const [contentValue, setContentValue] = React.useState(props.contents);
    // const [isErrorShown, setIsErrorShown] = React.useState(false);
    // const [contentsValueError, setContentsValueError] = React.useState(false);
    // const [contentsValueHelper, setContentsValueHelper] = React.useState("");
    const [contentType, setContentType] = React.useState("");
    // const [errorMessage, setErrorMessage] = React.useState("");

    const classes = useStyles();
    // const dispatch = useDispatch();

    const handleClickOpen = () => () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSendEdited = async () => {
        // dispatch(searchedPostsNotLoaded())
        // dispatch(resetSearchedPosts())
        
        handleClose()
    };

return (
    <div>
        <MenuItem className={classes.button} onClick={handleClickOpen()}>
            Edit
        </MenuItem>
        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            open={open}
            onClose={handleClose}
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
        <DialogTitle id="scroll-dialog-title" className={classes.title}>
            Edit {contentType}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <TextField
            margin="dense"
            id="content-textfield"
            label="Edit content"
            type="text"
            multiline
            InputProps={{
                className: classes.multilineColor,
            }}
            InputLabelProps={{
                className: classes.multilineColor,
            }}
            rows={8}
            color="secondary"
            className={classes.commentField}
            value={contentValue}
            onChange={(e) => {
                setContentValue(e.target.value)
            }}
            // error={contentsValueError}
            // helperText={contentsValueHelper}
        />
        <DialogActions>
            <Button onClick={handleSendEdited} color="secondary">
                Send
            </Button>
            <Button onClick={handleClose} color="secondary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
    {/* <ErrorDialog isShown={isErrorShown} message={errorMessage}/> */}
</div>
);
}

export default EditDialog
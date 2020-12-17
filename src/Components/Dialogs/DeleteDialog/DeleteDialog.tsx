import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import theme from '../../../theme';
import { makeStyles, MenuItem } from '@material-ui/core';

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
    objectId: number,
    userId: number,
    authToken: string
}

const DeleteDialog = (props: DialogProps) => {
    const [open, setOpen] = React.useState(false);
    const [contentType, setContentType] = React.useState("");
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        
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
        </div>
    );
}

export default DeleteDialog
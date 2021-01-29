import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import theme from '../../../theme';
import { makeStyles } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import { useSnackbar } from '../../UseSnackBar/useSnackbar';
import { useDispatch } from 'react-redux';
import { mediaLoaded, mediaNotLoaded, resetMedia, setMedia } from '../../Redux/Actions';
import { MediaAPI } from '../../../Api/MediaAPI';

const useStyles = makeStyles({
    dangerousButton: {
        color: theme.palette.secondary.dark,
    },
    button: {
        color: theme.palette.secondary.main,
    }
});

type DeleteMediaDialogProps = {
    mediaId: number,
    userId: number,
    isInFeed: boolean,
    authToken: string
}

const DeleteMediaDialog = (props: DeleteMediaDialogProps) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const snackBar = useSnackbar();
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteMedia = () => {
        dispatch(mediaNotLoaded())
        if (props.isInFeed) {
            MediaAPI
            .deleteMedia(props.mediaId, props.authToken)
            .then(() => {
                snackBar.openSnackbar("Media deleted!")
                MediaAPI
                .fetchMediaByFriends(props.authToken)
                .then(async (data) => {
                    dispatch(setMedia(data))
                    dispatch(mediaLoaded())
                })
                .catch(async (error) => {
                    snackBar.openSnackbar(error.response.data)
                    dispatch(resetMedia())
                    dispatch(mediaLoaded())
                })
            })
            .catch((error) => {
                snackBar.openSnackbar(error.response.data)
                dispatch(mediaLoaded())
            })
        } else {
            MediaAPI
            .deleteMedia(props.mediaId, props.authToken)
            .then(() => {
                snackBar.openSnackbar("Media deleted!")
                MediaAPI
                .fetchMediaByUserId(props.userId)
                .then(async (data) => {
                    dispatch(setMedia(data))
                    dispatch(mediaLoaded())
                })
                .catch(async (error) => {
                    snackBar.openSnackbar(error.response.data)
                    dispatch(resetMedia())
                    dispatch(mediaLoaded())
                })
            })
            .catch((error) => {
                snackBar.openSnackbar(error.response.data)
                dispatch(mediaLoaded())
            })
        }
        handleClose()
    }

    return (
        <div>
            <Button className={classes.button} onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={classes.dangerousButton}>{"Confirm deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText color="secondary" id="alert-dialog-description">
                        Are You sure You want to delete this picture?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        No
                    </Button>
                    <Button onClick={deleteMedia} color="secondary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar {...snackBar}/>
        </div>
    );
}

export default DeleteMediaDialog
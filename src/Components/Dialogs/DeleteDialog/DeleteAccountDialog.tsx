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
import { UserAPI } from '../../../Api/UserAPI';
import { useHistory } from 'react-router-dom';
import { resetGoogleTokenId, resetSessionUser } from '../../Redux/Actions';

const useStyles = makeStyles({
    titleColor: {
        color: theme.palette.secondary.dark,
    },
    button: {
        color: theme.palette.secondary.main,
    },
    dangerousButton: {
        color: theme.palette.error.main,
    },
});

type DeleteAccountDialogProps = {
    authToken: string
}

const DeleteAccountDialog = (props: DeleteAccountDialogProps) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const snackBar = useSnackbar();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteAccount = () => {
        UserAPI
            .deleteAccount(props.authToken)
            .then((data) => {
                snackBar.openSnackbar("Account deleted!")
                history.push({
                    pathname:  "/"
                });
            })
            .catch((error) => {
                snackBar.openSnackbar(error.response.data)
            })
        dispatch(resetGoogleTokenId())
        dispatch(resetSessionUser())
        handleClose()
    }

    return (
        <div>
            <Button className={classes.dangerousButton} onClick={handleClickOpen}>
                Delete account
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={classes.titleColor}>{"Confirm deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText color="secondary" id="alert-dialog-description">
                        Are You sure You want to delete this account? Posts, comments, pictures and friends list will be deleted permamently.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        No
                    </Button>
                    <Button onClick={deleteAccount} color="secondary" className={classes.dangerousButton}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar {...snackBar}/>
        </div>
    );
}

export default DeleteAccountDialog
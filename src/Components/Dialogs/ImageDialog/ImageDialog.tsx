import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, Paper, Snackbar } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import DeleteMediaDialog from '../DeleteDialog/DeleteMediaDialog';
import { MediaAPI } from '../../../Api/MediaAPI';
import { useSnackbar } from '../../UseSnackBar/useSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { profileUserNotLoaded, profileUserLoaded, setProfileUser } from '../../Redux/Actions';
import { UserAPI } from '../../../Api/UserAPI';
import { RootState } from '../../../Interfaces/interfaces';

interface ImageDialogProps {
  id: number,
  posterUserId: number,
  authToken: string,
  isInFeed: boolean,
  imgLink: string
}

const ImageDialog = (props: ImageDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const snackBar = useSnackbar();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state: RootState) => state.sessionUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSet = () => {
    MediaAPI
    .useAsProfilePicture(props.authToken, props.id)
    .then((data) => snackBar.openSnackbar("Profile picture changed! You may need to wait a few minutes to see the changes."))
    .catch((error) => snackBar.openSnackbar("Error changing profile picture!"))
    setOpen(false);
  }

  return (
    <div>
    <IconButton onClick={handleClickOpen}>
        <InfoIcon fontSize="large" color="secondary"/>
    </IconButton>
      <Dialog maxWidth={'lg'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
        <Paper variant="outlined">
          <img alt="image" src={props.imgLink} />
        </Paper>
        </DialogContent>
        {props.posterUserId === sessionUser.id
        ? 
        <DialogActions>
          <Button onClick={handleSet} color="secondary">
            Set as profile picture
          </Button>
          {console.log(props.posterUserId)}
          {console.log(sessionUser.id)}
          <DeleteMediaDialog mediaId={props.id} userId={sessionUser.id} isInFeed={props.isInFeed} authToken={props.authToken}/>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
        :
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>}
      </Dialog>
      <Snackbar {...snackBar}/>
    </div>
  );
}

export default ImageDialog
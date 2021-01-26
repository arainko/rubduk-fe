import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, Paper } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

interface ImageDialogProps {
    imgLink: string
}

const ImageDialog = (props: ImageDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <IconButton onClick={handleClickOpen}>
        <InfoIcon fontSize="large" />
    </IconButton>
      <Dialog maxWidth={'lg'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
        <Paper variant="outlined">
          <img alt="image" src={props.imgLink} />
        </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ImageDialog
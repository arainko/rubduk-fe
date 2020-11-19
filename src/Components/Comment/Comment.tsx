import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Comment.css'

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" variant="contained" color="secondary" onClick={handleClickOpen}>
                Comment
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick fullWidth>
                <DialogTitle id="form-dialog-title" className="title">Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Write your Comment"
                        type="text"
                        multiline
                        rows={7}
                        fullWidth
                        color="secondary"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        Post Comment
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
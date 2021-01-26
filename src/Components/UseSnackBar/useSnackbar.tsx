import { useState } from "react";

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();

  const handleOpen = (msg: any) => {
    setOpen(true);
    setMessage(msg);
  };

  const handleClose = (_event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return {
    open,
    message,
    openSnackbar: handleOpen,
    onClose: handleClose,
    autoHideDuration: 4000,
    ContentProps: {
      "aria-describedby": "message-id"
    }
  };
};

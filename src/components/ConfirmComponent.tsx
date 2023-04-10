import React from 'react'
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

export type TConfirmComponent = {
  message: string,
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onAcceptHandler: () => void
}

const ConfirmComponent = ({message, open, setOpen, onAcceptHandler}: TConfirmComponent) => {
  const onClose = React.useCallback(() => {
    setOpen(false)
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
      <DialogActions>
        <Button color={"secondary"} onClick={onClose} variant={"outlined"} startIcon={<CancelIcon/>}>Disagree</Button>
        <Button
          color={"warning"} onClick={onAcceptHandler}
          variant={"outlined"} endIcon={<CheckCircleOutlineIcon/>}
        >Agree</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmComponent
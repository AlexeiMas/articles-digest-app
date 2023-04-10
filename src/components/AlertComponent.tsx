import React from 'react'
import {Alert, AlertColor, Box, Snackbar} from "@mui/material"

export type TAlertState = {type: AlertColor, message: string}
export type TAlertComponent = {
  message: string,
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<TAlertState>>
  variant?: AlertColor
}

const AlertComponent = ({message, open, setOpen, variant}: TAlertComponent) => {
  const onClose = React.useCallback(() => {
    setOpen({type: "error", message: ""})
  }, [open])

  return (
    <Box sx={{width: '100%'}}>
      <Snackbar
        open={open} autoHideDuration={5000}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
        onClose={onClose}
      >
        <Alert
          severity={variant || "error"}
          onClose={onClose}
          sx={{mb: 2}}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AlertComponent
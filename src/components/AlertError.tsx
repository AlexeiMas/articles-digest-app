import React from 'react'
import {Alert, Box, Snackbar} from "@mui/material"

export type TAlertError = {
  message: string,
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<string>>
}

const AlertError = ({message, open, setOpen}: TAlertError) => {
  const onClose = React.useCallback(() => {
    setOpen('')
  }, [open])

  return (
    <Box sx={{width: '100%'}}>
      <Snackbar
        open={open} autoHideDuration={5000}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
        onClose={onClose}
      >
        <Alert
          severity={"error"}
          onClose={onClose}
          sx={{mb: 2}}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AlertError
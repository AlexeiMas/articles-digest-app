import React from 'react'
import {Paper, Typography} from "@mui/material"

const SideBlock = ({children, title}: React.PropsWithChildren<{title: string}>) => {
  return (
    <Paper sx={{marginBottom: "20px"}}>
      <Typography variant="h5" p={"15px"}>
        {title}
      </Typography>
      {children}
    </Paper>
  )
}

export default SideBlock
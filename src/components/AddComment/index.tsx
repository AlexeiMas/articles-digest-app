import React from 'react'
import {Avatar, Box, Button, Stack, TextField} from "@mui/material"

const AddComment = () => {
  return (
    <Stack direction={"row"} mt={"10px"} pb={"20px"} mr={"20px"} ml={"17px"}>
      <Avatar
        sx={{marginRight: "15px"}}
        src="https://mui.com/static/images/avatar/5.jpg"
      />
      <Box mr={"15px"}>
        <TextField
          label="Write comment"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
        />
        <Button variant="contained" sx={{marginTop: "10px"}}>Send</Button>
      </Box>
    </Stack>
  )
}

export default AddComment
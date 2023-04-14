import React from 'react'
import {Avatar, Box, Button, Stack, TextField} from "@mui/material"
import {useSession} from "next-auth/react"
import {useCreateCommentMutation} from "@/store/services/comments.api"
import {ICommentSchema} from "@/validators/schemas/commentSchema"
import {useLazyGetPostByIdQuery} from "@/store/services/posts.api"
import AlertComponent, {TAlertState} from "@/components/AlertComponent"

const AddComment = ({postId}: { postId: string }) => {
  const [text, setText] = React.useState<string>('')
  const [isAlert, setIsAlert] = React.useState<TAlertState>({type: "error", message: ""})
  const {data: session} = useSession()
  const [addComment] = useCreateCommentMutation()
  const [updateComments] = useLazyGetPostByIdQuery()

  const onSend = async () => {
    if (text.length > 0) {
      const fields: Omit<ICommentSchema, "user"> = {
        text,
        postId
      }
      await addComment(fields)
      setText('')
      await updateComments(postId)
    } else {
      setIsAlert((prevState) => ({...prevState, message: "Comment content cannot be empty. Write something."}))
    }
  }

  return (
    <>
      <Stack direction={"row"} mt={"10px"} pb={"20px"} mr={"20px"} ml={"17px"}>
        <Avatar
          sx={{marginRight: "15px"}}
          src={session?.user?.image || "https://i.stack.imgur.com/34AD2.jpg"}
        />
        <Box flexGrow={1}>
          <TextField
            label="Add new comment..."
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant="contained" onClick={onSend} sx={{marginTop: 2}}>Send</Button>
        </Box>
      </Stack>
      <AlertComponent message={isAlert.message} open={!!isAlert.message} setOpen={setIsAlert}/>
    </>
  )
}

export default AddComment
import React from 'react'
import {Button, Paper, Stack, TextField} from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/AddPost.module.css"
import "easymde/dist/easymde.min.css"
import dynamic from "next/dynamic"

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })

const AddPost = () => {
  const imageUrl = ''
  const [value, setValue] = React.useState<string>('')
  const uniqueId = React.useId()

  const handleChangeFile = () => {}

  const onClickRemoveImage = () => {}

  const onChange = React.useCallback((value: string) => {
    setValue(value)
  }, [])

  const options = React.useMemo(() => ({
    spellChecker: false,
    maxHeight: '400px',
    autofocus: true,
    placeholder: 'Enter some text...',
    status: false,
    autosave: {
      enabled: true,
      delay: 1000,
      uniqueId
    }
  }), [])

  return (
    <Paper style={{padding: 30}}>
      <Button variant={"outlined"} size={"large"}>Upload preview</Button>
      <input type={"file"} onChange={handleChangeFile} hidden/>
      {imageUrl && (
        <Button variant={"contained"} color={"error"} onClick={onClickRemoveImage}>Remove</Button>
      )}
      {imageUrl && (
        <Image width={300} height={300} src={`http://localhost:3000${imageUrl}`} alt={"Uploaded"}/>
      )}
      <br/>
      <br/>
      <TextField variant={"standard"} className={styles.title} placeholder={"Post title..."} fullWidth/>
      <TextField variant={"standard"} placeholder={"Tags"} fullWidth sx={{margin: "15px 0"}}/>
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options}/>
      <Stack direction={"row"} spacing={1}>
        <Button size={"large"} variant={"contained"}>Done</Button>
        <Button component={Link} href={"/"} size={"large"}>Cancel</Button>
      </Stack>
    </Paper>
  )
}

export default AddPost 
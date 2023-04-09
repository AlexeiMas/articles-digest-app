import React from 'react'
import {Button, Paper, Stack, TextField} from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/AddPost.module.css"
import "easymde/dist/easymde.min.css"
import dynamic from "next/dynamic"
import AlertComponent, {TAlertState} from "@/components/AlertComponent"
import {useUploadImageMutation} from "@/store/services/uploads.api"
import {useRemoveImageMutation} from "@/store/services/images.api"
import {useCreatePostMutation} from "@/store/services/posts.api"
import {IPostSchema} from "@/validators/schemas/postSchema"
import {NextRouter, withRouter} from "next/router"

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {ssr: false})

const AddPost = ({router: {push}}: { router: NextRouter }) => {
  const [title, setTitle] = React.useState<string>('')
  const [text, setText] = React.useState<string>('')
  const [tags, setTags] = React.useState<string>('')
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [isAlert, setIsAlert] = React.useState<TAlertState>({type: "error", message: ""})
  const [uploadImage, {data: imageUploaded}] = useUploadImageMutation()
  const [removeImage, {data: imageRemoved}] = useRemoveImageMutation()
  const [createPost] = useCreatePostMutation()
  const uniqueId = React.useId()

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    if (e.target.files?.length) {
      const file = e.target.files[0]
      formData.append('image', file)
      uploadImage(formData).then(res => {
        if ("data" in res) {
          res.data.success
            ? setIsAlert(prevState => ({...prevState, type: "success", message: "Image was successfully uploaded"}))
            : setIsAlert({type: "error", message: "Image isn't uploaded"})
        }
      })
    }
  }

  const onClickRemoveImage = async () => {
    if (imageUploaded?.url) {
      const {url} = imageUploaded
      await removeImage(url.substring(url.lastIndexOf('/') + 1))
      inputFileRef.current && (inputFileRef.current.value = '')
    }
  }

  const onChange = React.useCallback((value: string) => {
    setText(value)
  }, [])

  const onSubmit = React.useCallback(() => {
    const fields: Omit<IPostSchema, "user"> = {
      title,
      text,
      tags: tags.trim().replace(/\s+/g, ' ').split(',' || ', '),
      imageUrl: (imageUploaded?.url && (imageUploaded.url !== imageRemoved?.url)) ? (process.env.API_URL + imageUploaded.url) : undefined
    }
    createPost(fields).then(res => {
      if ('data' in res) {
        res.data.postId && push(`/posts/${res.data.postId}`)
      }
    })
  }, [text, text, tags, imageUploaded, imageRemoved])

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
    <>
      <Paper style={{padding: 30}}>
        <Button onClick={() => inputFileRef?.current?.click()} variant={"outlined"} size={"large"}>Upload
          preview</Button>
        <input ref={inputFileRef} type={"file"} onChange={handleChangeFile} hidden/>
        {imageUploaded?.url && (imageUploaded.url !== imageRemoved?.url) && (
          <>
            <Button variant={"contained"} color={"error"} onClick={onClickRemoveImage}>Remove</Button>
            {process.env.API_URL &&
              <Image width={50} height={50} src={process.env.API_URL + imageUploaded.url} alt={"Uploaded"}/>}
          </>
        )}
        <br/>
        <br/>
        <TextField
          variant={"standard"} className={styles.title} placeholder={"Post title..."} fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant={"standard"} placeholder={"Tags"} fullWidth sx={{margin: "15px 0"}}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options}/>
        <Stack direction={"row"} spacing={1}>
          <Button onClick={onSubmit} size={"large"} variant={"contained"}>Done</Button>
          <Button component={Link} href={"/"} size={"large"}>Cancel</Button>
        </Stack>
      </Paper>
      <AlertComponent
        variant={isAlert.type}
        message={isAlert.message}
        open={!!isAlert.message}
        setOpen={setIsAlert}
      />
    </>
  )
}

export default withRouter(AddPost)
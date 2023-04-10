import React from 'react'
import AlertComponent, {TAlertState} from "@/components/AlertComponent"
import {useUploadImageMutation} from "@/store/services/uploads.api"
import {useRemoveImageMutation} from "@/store/services/images.api"
import {TPostDataForPage} from "@/validators/schemas/postSchema"
import {Button, Paper, Stack, TextField} from "@mui/material"
import Image from "next/image"
import 'easymde/dist/easymde.min.css';
import styles from "@/styles/AddPost.module.css"
import Link from "next/link"
import dynamic from "next/dynamic"

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {ssr: false})

export interface IPostContainer {
  data?: TPostDataForPage
  onSubmitHandler: (args: TPostDataForPage) => void
}

const PostContainer = ({data, onSubmitHandler}: IPostContainer) => {
  const [title, setTitle] = React.useState<string>(data?.title || '')
  const [text, setText] = React.useState<string>(data?.text || '')
  const [tags, setTags] = React.useState<string>(data?.tags?.join(', ') || '')
  const [imageUrl, setImageUrl] = React.useState<string>(data?.imageUrl || '')
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [isAlert, setIsAlert] = React.useState<TAlertState>({type: "error", message: ""})
  const [uploadImage, {data: imageUploaded}] = useUploadImageMutation()
  const [removeImage, {data: imageRemoved}] = useRemoveImageMutation()
  const uniqueId = React.useId()

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    if (e.target.files?.length) {
      const file = e.target.files[0]
      formData.append('image', file)
      uploadImage(formData).then(res => {
        if ("data" in res) {
          if (res.data.success) {
            setIsAlert(prevState => ({...prevState, type: "success", message: "Image was successfully uploaded"}))
            setImageUrl(process.env.API_URL + res.data.url)
          } else {
            setIsAlert({type: "error", message: "Image isn't uploaded"})
          }
        }
      })
    }
  }

  const onClickRemoveImage = async () => {
    if (imageUploaded?.url || imageUrl) {
      const url = imageUploaded ? imageUploaded.url : imageUrl
      await removeImage(url.substring(url.lastIndexOf('/') + 1))
      setImageUrl('')
      inputFileRef.current && (inputFileRef.current.value = '')
    }
  }

  const onChange = React.useCallback((value: string) => {
    setText(value)
  }, [])

  const onSubmit = React.useCallback(() => {
    if (!title || !text || !tags) {
      setIsAlert({type: "error", message: "Fields can't be empty. Fill them, please"})
    } else {
      const fields: TPostDataForPage = {
        title,
        text,
        tags: tags.trim().replace(/\s+/g, ' ').split(', ' || ','),
        imageUrl: imageUrl !== '' ? imageUrl : undefined
      }
      onSubmitHandler(fields)
    }
  }, [text, text, tags, imageUploaded, imageRemoved, imageUrl])

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
        <Button onClick={() => inputFileRef?.current?.click()} variant={"outlined"} size={"large"}>Upload preview</Button>
        <input ref={inputFileRef} type={"file"} onChange={handleChangeFile} hidden/>
        {imageUrl && (
          <>
            <Button variant={"contained"} color={"error"} onClick={onClickRemoveImage}>Remove</Button>
            <Image width={50} height={50} src={imageUrl} alt={"Uploaded"}/>
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
          <Button
            onClick={onSubmit} size={"large"}
            variant={"contained"}
            disabled={!title || !text || !tags}
          >{data ? "Save" : "Create"}</Button>
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

export default PostContainer
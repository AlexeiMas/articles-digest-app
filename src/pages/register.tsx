import React from 'react'
import {useForm} from "react-hook-form"
import {Box, Button, Container, Link, Stack, TextField, Typography} from "@mui/material"
import {IUserSchema} from "@/validators/schemas/authSchema"
import AlertError from "@/containers/AlertError"
import LinkNext from "next/link"
import {useHandlerOnSign} from "@/hooks/useHandlerOnSign"
import PasswordInput from "@/components/PasswordInput"

export default function Register() {
  const {watch, register, formState: {errors, isValid}, reset, setValue, control} = useForm<IUserSchema>({
    mode: "onBlur",
    reValidateMode: "onChange" || "onBlur",
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      avatarUrl: ''
    }
  })
  const {errorMessage, setErrorMessage, handleOnSign} = useHandlerOnSign({signType: "up", isValid, watch, href: "/login"})

  return (
    <Container sx={{minHeight: "calc(100vh - 50px)", display: "flex", alignItems: "center"}}>
      <Box
        component={"form"} mx={"auto"}
        px={{xs: 2, sm: 4}} py={3}
        width={"100%"} maxWidth={600}
        display={"grid"} gap={2}
        border={"1px solid rgb(192, 192, 192)"} borderRadius={1}
      >
        <TextField
          {...register("email", {
            required: "Field is important for filling",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
              message: "Entered value does not watch email format"
            }
          })}
          required
          id="email"
          type="email"
          placeholder={'Email'}
          margin="dense"
          label="Email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          InputLabelProps={{shrink: true}}
        />
        <PasswordInput
          register={register}
          id="password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          {...register("fullName", {
            required: "Field is important for filling",
            pattern: {
              value: /^[\w\s]+$/,
              message: "Must consist of just latin letters, digits and divided by space"
            },
            minLength: {
              value: 3,
              message: "min length is 3"
            },
            maxLength: {
              value: 20,
              message: "max length is 20"
            }
          })}
          required
          id="fullName"
          type="text"
          placeholder={'Full name'}
          margin="dense"
          label="Full Name"
          fullWidth
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          InputLabelProps={{shrink: true}}
        />
        <TextField
          {...register("avatarUrl", {
            pattern: {
              value: /^https?:\/\/(?:www\.)?[\w@:%._+~-]{1,256}\b[\w()@:%_+.~#?&\/=]*$/,
              message: "Should coincide with URL format and starts with protocol"
            }
          })}
          id="avatarUrl"
          type="avatarUrl"
          placeholder={'Avatar URL'}
          margin="dense"
          label="Avatar URL"
          fullWidth
          error={!!errors.avatarUrl}
          helperText={errors.avatarUrl?.message}
          InputLabelProps={{shrink: true}}
        />

        <AlertError message={errorMessage} open={!!errorMessage} setOpen={setErrorMessage}/>
        <Stack alignItems={"center"} gap={1}>
          <Button
            variant={"outlined"}
            color={errorMessage ? "error" : "success"}
            size={"large"}
            disabled={!isValid}
            onClick={handleOnSign}
          >Sign Up</Button>
          <Stack mt={1}>
            <Typography paragraph mb={0}>Already has an account?</Typography>
            <Link component={LinkNext} href={"/login"} textAlign={"center"}>Sign in</Link>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}

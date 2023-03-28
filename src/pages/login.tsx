import React from 'react'
import {useForm} from "react-hook-form"
import {Box, Button, Container, Link, Stack, TextField, Typography} from "@mui/material"
import {TUserLogin} from "@/validators/schemas/authSchema"
import AlertError from "@/containers/AlertError"
import LinkNext from "next/link"
import PasswordInput from "@/components/PasswordInput"
import {useHandlerOnSign} from "@/hooks/useHandlerOnSign"

export default function Login() {
  const {watch, register, formState: {errors, isValid}, reset, setValue, control} = useForm<TUserLogin>({
    mode: "onBlur",
    reValidateMode: "onChange" || "onBlur",
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const {errorMessage, setErrorMessage, handleOnSign} = useHandlerOnSign({isValid, watch})

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
        <AlertError message={errorMessage} open={!!errorMessage} setOpen={setErrorMessage}/>
        <Stack alignItems={"center"} gap={1}>
          <Button
            variant={"outlined"}
            color={errorMessage ? "error" : "success"}
            size={"large"}
            disabled={!isValid}
            onClick={handleOnSign}
          >Sign In</Button>
          <Stack mt={1}>
            <Typography paragraph mb={0}>Don't have an account yet?</Typography>
            <Link component={LinkNext} href={"/register"} textAlign={"center"}>Sign up</Link>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}

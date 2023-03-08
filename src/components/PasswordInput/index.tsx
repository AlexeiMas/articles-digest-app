import React from 'react'
import InputAdornment from "@mui/material/InputAdornment"
import {IconButton, TextField, TextFieldProps} from "@mui/material"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Visibility from "@mui/icons-material/Visibility"
import {Path, UseFormRegister} from "react-hook-form"

export type TPasswordInput<T extends Record<"password", string>> = {
  register: UseFormRegister<T>
} & Omit<TextFieldProps, "required" | "type" | "InputProps" | "placeholder" | "margin" | "label" | "fullWidth" | "InputLabelProps">

const PasswordInput = <T extends Record<"password", string>>({register, ...passwordProps}: TPasswordInput<T>) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <TextField
      {...register("password" as Path<T>, {
        required: "Field is important for filling",
        minLength: {
          value: 3,
          message: "min length is 3"
        },
        maxLength: {
          value: 16,
          message: "max length is 16"
        }
      })}
      {...passwordProps}
      required
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              // onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
          </InputAdornment>
      }}
      placeholder={'Password'}
      margin="dense"
      label="Password"
      fullWidth
      InputLabelProps={{shrink: true}}
    />
  )
}

export default PasswordInput
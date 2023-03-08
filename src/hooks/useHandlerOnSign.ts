import React from "react"
import {signIn} from "next-auth/react"
import {useRouter} from "next/router"
import {IUserSchema} from "@/validators/schemas/authSchema"

export type TUseHandler = {
  signType?: "in" | "up"
  isValid: boolean
  watch: <T extends Record<string, string>>() => T
  href?: string
}

export const useHandlerOnSign = ({signType = "in", isValid, watch, href = '/'}: TUseHandler) => {
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const router = useRouter()

  const handleOnSign = React.useCallback( () => {
    if (isValid) {
      const authState = watch()
      switch (signType) {
        case "in":
          signIn('credentials', {...authState, redirect: false})
            .then(response => {
              if (response?.ok) {
                errorMessage && setErrorMessage('')
                return router.push(href)
              }
              if (!response?.ok && response?.error) {
                setErrorMessage(response.error)
              } else {
                errorMessage && setErrorMessage('')
              }
            })
            .catch(error => console.log(error.message))
          break
        case "up":
          const {avatarUrl, ...userData} = authState as Record<keyof IUserSchema, string>
          if (authState)
          fetch('/api/auth/register', {
            method: "post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(avatarUrl ? {...userData, avatarUrl} : {...userData})
          })
            .then(res => {
              res.json()
                .then(result => {
                  if (!result.hasOwnProperty('success')) {
                    return router.push(href)
                  }
                  setErrorMessage(result.message)
                })
            })
            .catch(err => console.log(err))
      }
    }
  }, [isValid])

  return {
    errorMessage,
    setErrorMessage,
    handleOnSign
  }
}
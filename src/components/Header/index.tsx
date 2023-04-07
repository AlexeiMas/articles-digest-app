import React from 'react'
import {Box, Button, Container, Stack} from "@mui/material"
import Link from "next/link"
import {NextRouter, withRouter} from "next/router"
import {signOut, useSession} from "next-auth/react"

const Header = ({router: {pathname, push}}: { router: NextRouter }) => {
  const {data: isAuth} = useSession()

  const logoutHandler = React.useCallback(() => {
    signOut({redirect: false})
      .then(() => push("/login"))
  }, [isAuth])

  return (
    <Box component={"header"} bgcolor={"#fff"} py={"10px"} mb={"30px"} borderBottom={"1px solid #e0e0e0"} position={"sticky"} top={0} zIndex={3}>
      <Container maxWidth={"lg"}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Button color={"primary"} sx={{fontSize: "1.1rem", fontWeight: 900, fontStyle: "oblique"}} component={Link} href={"/"}>
            ARTICLES
          </Button>
          <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
            {isAuth ? (
              <>
                <Button variant={"contained"} component={Link} href={"/posts/create"}>New post</Button>
                <Button variant={"contained"} color={"error"} onClick={logoutHandler}>Log out</Button>
              </>
            ) : (
              <>
                <Button variant={"outlined"} component={Link} href={"/login"} disabled={pathname === "/login"}>Log in</Button>
                <Button variant={"contained"} component={Link} href={"/register"} disabled={pathname === "/register"}>Sign up</Button>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default withRouter(Header)
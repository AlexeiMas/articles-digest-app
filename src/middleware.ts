export { default } from "next-auth/middleware"

export const config = { matcher: ["/", "/add-post", "/posts/:id*", "/tags/:name*"] }
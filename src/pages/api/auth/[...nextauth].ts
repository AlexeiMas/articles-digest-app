import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "@/lib/dbConnect"
import {TUserLogin} from "@/validators/schemas/authSchema"
import UserService from "@/services/UserService"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const {email, password} = credentials as TUserLogin
        await dbConnect()
        const {user} = await UserService.login({email, password})
        return user ?? null
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  }
}

export default NextAuth(authOptions)
import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "@/lib/dbConnect"
import {TUserLogin} from "@/validators/schemas/authSchema"
import UserService from "@/services/UserService"
import {IUserDto} from "@/dtos/UserDto"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const {email, password} = credentials as TUserLogin
        await dbConnect()
        const {user} = await UserService.login({email, password})
        return user ?? null
      }
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        (session.user as IUserDto).id = String(token.uid)
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  }
}

export default NextAuth(authOptions)
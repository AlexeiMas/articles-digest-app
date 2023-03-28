import {authOptions} from "@/pages/api/auth/[...nextauth]"
import {NextApiRequest, NextApiResponse} from "next"
import {getServerSession, Session} from "next-auth"

export const checkAuth = async (req: NextApiRequest, res: NextApiResponse): Promise<Session | null> => {
  return await getServerSession(req, res, authOptions)
}
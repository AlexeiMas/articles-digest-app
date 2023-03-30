import multer from "multer"
import * as fs from "fs"

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const directory = 'public/uploads'
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory)
    }
    cb(null, directory)
  },
  filename(_, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) {
    cb(null, file.originalname)
  }
})

export const upload = multer({storage})
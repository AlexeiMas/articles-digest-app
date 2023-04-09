import multer from "multer"
import * as fs from "fs"
import path from "path"

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const directory = 'public/uploads'
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory)
    }
    cb(null, directory)
  },
  filename(_, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`)
    // cb(null, file.originalname)
  }
})

export const upload = multer({storage})
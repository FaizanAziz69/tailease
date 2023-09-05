import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${extension}`);
  },
});

export const upload = multer({ storage });
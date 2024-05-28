import multer, { type FileFilterCallback } from "multer";
import path from "path";

const folderName = path.join(__dirname, "../../images");
const types = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const storage = multer.diskStorage({
  destination(request, file, callback) {
    callback(null, `${folderName}`);
  },
  filename(req, file, callback) {
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + file.originalname,
    );
  },
});

export const uploadPhoto = multer({ storage }).single("file");
export const uploadManyPhotos = multer({ storage }).array("files");

const fileFilter = (
  request: Express.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  if (types.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export default multer({ storage, fileFilter });

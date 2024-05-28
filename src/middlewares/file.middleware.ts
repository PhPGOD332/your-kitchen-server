import multer, { type FileFilterCallback } from "multer";
import path from "path";

const folderName = path.join(__dirname, "../../files");

const storage = multer.diskStorage({
  destination(request, file, callback) {
    callback(null, `${folderName}`);
  },
  filename(req, file, callback) {
    callback(
      null,
      `${new Date().toLocaleString("ru")}-${Buffer.from(
        file.originalname,
        "latin1",
      )}`.toString(),
    );
  },
});

export const uploadFile = multer({ storage }).single("file");
export const uploadManyFiles = multer({ storage }).array("files");

const fileFilter = (
  request: Express.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  callback(null, true);
};

export default multer({ storage, fileFilter });

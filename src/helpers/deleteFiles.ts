import fs from "fs";
import path from "path";

export const deleteFiles = (files: string[]) => {
  files.map((file) => {
    fs.unlink(path.join(__dirname, `../../files/${file}`), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Файл ${file} удалён`);
      }
    });
  });
};

import fs from "fs";
import path from "path";

export const deletePhotos = (photos: string[]) => {
  photos.map((photo) => {
    fs.unlink(path.join(__dirname, `../../images/${photo}`), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Файл ${photo} удалён`);
      }
    });
  });
};

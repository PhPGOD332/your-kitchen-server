import { IClaim } from "../types/IClaim";
import { Photo } from "../models/photo.model";

class PhotoService {
    async getPhotos () {
        return await Photo.find().sort({ _id: -1 });
    };

    async getPhoto (id: string) {
        return await Photo.findById(id);
    };

    async addPhotos (files: any) {
        const filesNames: string[] = files.map((file: any) => file.filename);

        filesNames.map(async (file) => {
            const photo = new Photo({
                name: file,
            });
            const result = await photo.save();
            return result;
        });

        return filesNames;
    };

    async deletePhoto (id: string) {
        return await Photo.findByIdAndDelete(id);
    };
};

export default new PhotoService();
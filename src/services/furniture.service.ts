import { deletePhotos } from "../helpers/deletePhotos";
import { Furniture } from "../models/furniture.model";
import { IFurniture } from "../types/IFurniture";

class FurnitureService {
  async getAllFurniture() {
    return await Furniture.find().sort({ _id: -1 });
  }

  async getOneFurniture(slug: string) {
    return await Furniture.findOne({ slug });
  }

  async addFurniture(body: any, files: any) {
    const filesNames = files.map((file: any) => file.filename);

    const newFurniture: IFurniture = {
      name: body.name,
      description: body.description,
      price: +body.price,
      photos: filesNames,
      slug: body.slug,
    };

    const furniture = new Furniture(newFurniture);
    return await furniture.save();
  }

  async deleteFurniture(slug: string) {
    return await Furniture.findOneAndDelete({ slug });
  }

  async updateFurniture(slug: string, body: any, files: any) {
    const newFurniture: any = {
      name: body.name,
      description: body.description,
      price: +body.price,
      slug: body.slug,
      photos: [...JSON.parse(body.photos)],
    };

    const oldFurniture = await this.getOneFurniture(slug);

    if (oldFurniture?.photos.length !== newFurniture.photos.length) {
      const deletedPhotos = oldFurniture?.photos.filter(
        (photo) => !newFurniture.photos.includes(photo),
      );

      if (deletedPhotos && deletedPhotos.length) {
        deletePhotos(deletedPhotos);
      }
    }

    if (files.length > 0) {
      const filesNames = files.map((file: any) => file.filename);
      newFurniture.photos = [...newFurniture.photos, ...filesNames];
    }

    return await Furniture.findOneAndUpdate({ slug }, newFurniture, {
      new: true,
    });
  }
}

export default new FurnitureService();

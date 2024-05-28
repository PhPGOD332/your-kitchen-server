import { deletePhotos } from "../helpers/deletePhotos";
import { Discount } from "../models/discount.model";

class DiscountService {
  async getDiscounts() {
    return await Discount.find().sort({ _id: -1 });
  }

  async getDiscount(slug: string) {
    return await Discount.findOne({ slug });
  }

  async addDiscount(body: any, file: any) {
    const newDiscount = {
      name: body.name,
      description: body.description,
      conditions: body.conditions,
      slug: body.slug,
      type: body.type,
      startDate: body.startDate,
      endDate: body.endDate,
      isActive: JSON.parse(body.isActive),
      image: file.filename,
    };

    const result = new Discount(newDiscount);
    return await result.save();
  }

  async deleteDiscount(slug: string) {
    return await Discount.findOneAndDelete({ slug });
  }

  async updateDiscount(slug: string, body: any, file: any) {
    const newDiscount: any = {
      name: body.name,
      description: body.description,
      conditions: body.conditions,
      slug: body.slug,
      type: body.type,
      startDate: body.startDate,
      endDate: body.endDate,
      isActive: JSON.parse(body.isActive),
    };

    if (file) {
      newDiscount.image = file.filename;
      const oldDiscount = await this.getDiscount(slug);

      if (oldDiscount) {
        deletePhotos([oldDiscount?.image]);

        return await Discount.findOneAndUpdate({ slug }, newDiscount, {
          new: true,
        });
      }

      return await Discount.findOneAndUpdate({ slug }, newDiscount, {
        new: true,
      });
    }

    return await Discount.findOneAndUpdate({ slug }, newDiscount, {
      new: true,
    });
  }
}

export default new DiscountService();

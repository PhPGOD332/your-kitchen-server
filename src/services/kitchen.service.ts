import { deletePhotos } from "../helpers/deletePhotos";
import { Kitchen } from "../models/kitchen.model";

class KitchenService {
  async getRssKitchens() {
    const kitchens = await Kitchen.find().sort({ _id: -1 });

    const string = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:yandex="http://news.yandex.ru"
        xmlns:media="http://search.yahoo.com/mrss/"
        xmlns:turbo="http://turbo.yandex.ru"
        version="2.0">
        <channel>
            <!-- Информация о сайте-источнике -->
            <title>Наши кухни</title>
            <link>https://youkuhnya.ru/portfolio/</link>
            <description>Список всех кухонь</description>
            <language>ru</language>
            <turbo:analytics></turbo:analytics>

            ${kitchens.map((kitchen) => {
              return `
              <item turbo="true">
                <!-- Информация о странице -->
                <turbo:extendedHtml>true</turbo:extendedHtml>
                <link>https://youkuhnya.ru/portfolio/${
                  kitchen.slug || kitchen._id
                }</link>
                <turbo:source></turbo:source>
                <turbo:topic></turbo:topic>
                <author>Твоя кухня</author>
                <metrics>
                    <yandex schema_identifier="94024143">
                        <breadcrumblist>
                            <breadcrumb url="https://youkuhnya.ru/portfolio/" text="Кухни"/>
                            <breadcrumb url="https://youkuhnya.ru/portfolio/${
                              kitchen.slug || kitchen.id
                            }" text="${kitchen.title}"/>
                        </breadcrumblist>
                    </yandex>
                </metrics>
                <yandex:related></yandex:related>
                <turbo:content>
                    <![CDATA[
                        <h1 class="title">${kitchen.title}</h1>
                        <div class="content">${kitchen.description}</div>
                    ]]>
                </turbo:content>
            </item>`;
            })}
        </channel>
    </rss>`;
    return string;
  }

  async getMainKitchens() {
    return await Kitchen.find({ onMainPage: true }).sort({ order: 1, _id: -1 }).limit(9);
  }

  async getKitchens() {
    return await Kitchen.find().sort({ order: -1 });
  }

  async getKitchenById(id: string) {
    return await Kitchen.findById(id);
  }
  async getKitchenBySlug(slug: string) {
    return await Kitchen.findOne({ slug });
  }

  async checkSlug(slug: string) {
    if (!slug) {
      return { valid: false };
    }

    const kitchenBySlug = await Kitchen.findOne({ slug });

    if (kitchenBySlug) {
      return { valid: false };
    }

    return { valid: true };
  }

  async addKitchen(body: any, files: any) {
    const filesNames = files.map((file: any) => file.filename);

    const newKitchen = {
      title: body.title,
      description: body.description,
      price: +body.price,
      style: JSON.parse(body.style),
      type: JSON.parse(body.type),
      term: body.term,
      onMainPage: JSON.parse(body.onMainPage),
      photos: filesNames,
      slug: body.slug,
      meta: JSON.parse(body.meta),
      order: body.order ? body.order : 1000
    };
    const kitchen = new Kitchen(newKitchen);
    return await kitchen.save();
  }

  async deleteKitchen(id: string) {
    return await Kitchen.findByIdAndDelete(id);
  }

  async updateKitchen(id: string, body: any, files: any) {
    const newKitchen = {
      title: body.title,
      description: body.description,
      price: +body.price,
      style: JSON.parse(body.style),
      type: JSON.parse(body.type),
      term: body.term,
      onMainPage: JSON.parse(body.onMainPage),
      slug: body.slug,
      meta: JSON.parse(body.meta),
      photos: [...JSON.parse(body.photos)],
      order: body.order
    };

    const oldKitchen = await this.getKitchenById(id);

    if (oldKitchen?.photos.length !== newKitchen.photos.length) {
      const deletedPhotos = oldKitchen?.photos.filter(
        (photo) => !newKitchen.photos.includes(photo),
      );

      if (deletedPhotos && deletedPhotos.length) {
        deletePhotos(deletedPhotos);
      }
    }

    if (files.length > 0) {
      const filesNames = files.map((file: any) => file.filename);
      newKitchen.photos = [...newKitchen.photos, ...filesNames];
    }

    return await Kitchen.findByIdAndUpdate(id, newKitchen, {
      new: true,
    });
  }
}

export default new KitchenService();

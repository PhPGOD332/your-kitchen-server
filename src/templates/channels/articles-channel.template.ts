import { SITE_URL, YANDEX_ANALYTICS } from "../../helpers/constants";
import type { IArticle } from "../../types/IArticle";
import { articleRssTemplate } from "../rss";

// <turbo:analytics></turbo:analytics>

export const articlesChannelTemplate = (
  articles: IArticle[] | any[],
): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:yandex="http://news.yandex.ru"
        xmlns:media="http://search.yahoo.com/mrss/"
        xmlns:turbo="http://turbo.yandex.ru"
        version="2.0">
        <channel>
          <!-- Информация о сайте-источнике -->
          <title>Полезные статьи про кухни | RSS</title>
          <link>${SITE_URL}/articles/</link>
          <description>Статьи о мебели для кухни: организация пространства, дизайн и стиль кухни, материалы, нюансы и тонкости проектирования. Рекомендации по выбору кухонной мебели на заказ, ответы на частые вопросы.</description>
          <turbo:analytics type="Yandex" id="${YANDEX_ANALYTICS}"></turbo:analytics>
          <language>ru</language>

          ${articles.map((article: IArticle) => {
            return articleRssTemplate(article, articles);
          })}
        </channel>
    </rss>`;
};

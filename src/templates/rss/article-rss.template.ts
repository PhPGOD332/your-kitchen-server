import { SITE_URL } from "../../helpers/constants";
import type { IArticle } from "../../types/IArticle";
import { articlePageTemplate } from "../pages";

// <pubDate>${article.createdAt}</pubDate>
// <author>Твоя кухня</author>

export const articleRssTemplate = (
  article: IArticle,
  articles: IArticle[],
): string => {
  return `<item turbo="true">
			<!-- Информация о странице -->
			<title>${article.title}</title>
			<turbo:extendedHtml>true</turbo:extendedHtml>
			<link>${SITE_URL}/articles/${article.link}</link>
			<metrics>
				<yandex schema_identifier="Идентификатор">
					<breadcrumblist>
						<breadcrumb url="${SITE_URL}/articles" text="Статьи"/>
						<breadcrumb url="${SITE_URL}/articles/${article.link}" text="${article.title}"/>
					</breadcrumblist>
				</yandex>
			</metrics>
			<yandex:related></yandex:related>
			<turbo:content>
					<![CDATA[
						${articlePageTemplate(article, articles)}
					]]>
			</turbo:content>
	</item>`;
};

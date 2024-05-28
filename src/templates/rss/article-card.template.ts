import { SITE_URL } from "../../helpers/constants";
import type { IArticle } from "../../types/IArticle";

export const articleCardTemplate = (article: IArticle): string => {
  return `<a href="${SITE_URL}/articles/${article.link}" class="articleLink">
		<div class="more__card_imageWrapper">
			<img src="${SITE_URL}/images/${article.preview}" alt="${
        article.title
      }" class="more__card_imageWrapper_image">
			<div class="articlePage_viewCount">
				<p>${article.viewCount || 0}</p>
			</div>
		</div>
		<div className="more__card_titleWrapper">
			<h3>
				${article.title}
			</h3>
		</div>
		<p className="more__card_description">
			${article.description}
		</p>
	</a>`;
};

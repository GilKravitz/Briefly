import { t } from "@/core/i18n";

const i18nLabel = (label: string) => {
  switch (label) {
    case "technology":
      return t.article.category.tech;
    case "economic":
      return t.article.category.economics;
    case "politics":
      return t.article.category.politics;
    case "sports":
      return t.article.category.sport;
    case "food":
      return t.article.category.food;
    case "fashion":
      return t.article.category.fashion;
    case "entertainment":
      return t.article.category.entertainment;
    default:
      return t.article.category.tech;
  }
};
export default i18nLabel;

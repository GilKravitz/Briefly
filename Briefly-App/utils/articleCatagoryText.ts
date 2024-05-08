import { t } from "@/core/i18n";

const i18nLabel = (label: string) => {
  switch (label) {
    case "Tech":
      return t.article.category.tech;
    case "Economics":
      return t.article.category.economics;
    case "Politics":
      return t.article.category.politics;
    case "Sport":
      return t.article.category.sport;
    case "Food":
      return t.article.category.food;
    default:
      return t.article.category.tech;
  }
};
export default i18nLabel;

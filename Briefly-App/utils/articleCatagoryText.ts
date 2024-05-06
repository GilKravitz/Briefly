import { t } from "@/i18n";

const i18nLabel = (label: string) => {
  switch (label) {
    case "Tech":
      return t.article.category.tech;
    case "Money":
      return t.article.category.money;
    case "Politics":
      return t.article.category.politics;
    case "Sports":
      return t.article.category.sports;
    case "Food":
      return t.article.category.food;
    default:
      return t.article.category.tech;
  }
};
export default i18nLabel;

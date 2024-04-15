import { I18n } from "i18n-js";
import en from "./en";
import he from "./he";
import { I18nKeys } from "./i18nKeys";

const translations = {
  en: en,
  he: he,
};
const i18n = new I18n(translations);
export default i18n;

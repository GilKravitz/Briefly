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

type ResourceKey = keyof I18nKeys;
type NestedKey<T> = T extends object ? { [P in keyof T]: NestedKey<T[P]> } : string;

function createNestedProxy<T>(path: string = ""): NestedKey<T> {
  return new Proxy({} as any, {
    // Updated type assertion
    get(target, key: string) {
      const newPath = path ? `${path}.${key}` : key;
      const translation = i18n.t(newPath);
      if (typeof translation === "string") {
        return translation;
      }
      return createNestedProxy<typeof translation>(newPath);
    },
  });
}

export const t: NestedKey<I18nKeys> = createNestedProxy<I18nKeys>();

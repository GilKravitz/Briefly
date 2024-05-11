// return rtl or ltr base on i18n locale: if it he return rtl else return ltr

import { useEffect, useState } from "react";
import { I18nManager } from "react-native";
import i18n from "@/core/i18n";

export const useDirection = () => {
  const [dir, setDir] = useState<"ltr" | "inherit" | "rtl">("ltr");

  useEffect(() => {
    if (i18n.locale === "he") {
      setDir("rtl");
    }
  }, []);

  return dir;
};

import * as Localization from "expo-localization";
import i18nJS from "i18n-js";
import locales from "./locales";

const setLocale = (locale?: string) => {
  if (locale) {
    i18nJS.locale = locale
    return;
  }
  i18nJS.locale = (Localization.locale);
  return;
}

i18nJS.fallbacks = true;
i18nJS.translations = { ...locales };
setLocale();

const t = (scope: string, options?: any): any => {
  return i18nJS.t(scope, { locale: i18nJS.currentLocale(), ...options });
};

const i18n = {
  t,
  locale: i18nJS.currentLocale(),
  setLocale
}

export default i18n;

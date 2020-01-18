import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import locales from "./locales";

class LanguageDetector {
  type: "languageDetector";
  async: boolean;

  constructor() {
    this.type = "languageDetector";
    this.async = true;
  }

  init() {}

  cacheUserLanguage() {}

  detect(cb: any) {
    cb(Localization.locale)
  }
}

const languageDetector = new LanguageDetector()

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: locales
  })

export default i18n;

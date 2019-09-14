import * as Localization from "expo-localization";
import i18nJS from "i18n-js";
import locales from "./locales";
import memoize from 'lodash/memoize';

const translate = memoize(
  (key, config) => i18nJS.t(key,config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
)

const fallback = { languageTag: 'en', isRTL: false };

i18nJS.fallbacks = true;
i18nJS.translations = { ...locales };


const i18n = {
  t: translate
}

export default i18n;

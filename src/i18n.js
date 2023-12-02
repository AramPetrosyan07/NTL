import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import translationAM from "./locales/am/translation.json";
import translationRU from "./locales/ru/translation.json";

const resources = {
  am: {
    translation: translationAM,
  },
  ru: {
    translation: translationRU,
  },
};

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "am",
    // lng: 'en', // if you're using a language detector, do not define the lng option
    debug: false,
    resources,
    detection: {
      caches: ["cookie"],
    },
  });

export default i18n;

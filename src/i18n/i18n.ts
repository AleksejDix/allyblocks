import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  detection: {
    order: ["htmlTag", "navigator"],
  },
  lng: "de",
  fallbackLng: "de",
  supportedLngs: ["de", "en", "fr", "it"],
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  defaultNS: "translation",
  ns: ["translation", "language-switcher"],
  resources: {
    en: {
      translation: {
        hello: "Hello",
      },
    },
    de: {
      translation: {
        hello: "Hallo",
      },
    },
    fr: {
      translation: {
        hello: "Bonjour",
      },
    },
    it: {
      translation: {
        hello: "Ciao",
      },
    },
  },
});

export default i18n;

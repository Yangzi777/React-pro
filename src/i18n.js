import i18n from "i18next";
import enUsTrans from "./locales/en.json";
import zhCnTrans from "./locales/zh.json";
import {
  initReactI18next
} from 'react-i18next';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enUsTrans,
      },
      zh: {
        translation: zhCnTrans,
      },
    },
    //默认语言
    lng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  })
export default i18n;
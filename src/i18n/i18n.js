import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import vi from './vi.json';
import cn from './zh.json';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    AsyncStorage.getItem('user-language', (err, language) => {
      if (err || !language) {
        callback('en');
        return;
      }
      callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: (language) => {
    AsyncStorage.setItem('user-language', language);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
      zh: {
        translation: zh,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

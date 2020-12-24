import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';

const init18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslation,
        },
      },
      lng: 'en',
      fallbackLng: 'en',
      react: {
        useSuspense: false,
      },
    }).then((r) => r);
};

export default init18n;

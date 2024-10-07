import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import enTranslations from '../translations/en.json'
import frTranslations from '../translations/fr.json'
import esTranslations from '../translations/es.json'
import itTranslations from '../translations/it.json'
import pt_BRTranslations from '../translations/pt_BR.json'

const getLanguage = () => {
  const language = localStorage.getItem('i18nextLng')
  return language || 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: enTranslations,
    },
    fr: {
      translations: frTranslations,
    },
    es: {
      translations: esTranslations,
    },
    it: {
      translations: itTranslations,
    },
    pt_BR: {
      translations: pt_BRTranslations,
    },
  },
  lng: getLanguage(),
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

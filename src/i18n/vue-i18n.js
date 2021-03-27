import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zh from './langs/zh'
import en from './langs/en'

Vue.use(VueI18n)

const globalMsg = {
  en: Object.assign(en),
  zh: Object.assign(zh)
}

const i18n = new VueI18n ({
  locale: (localStorage.getItem('language')
    ? localStorage.getItem('language').toLocaleLowerCase()
    : 'zh'  
  ) || 'zh',
  message: globalMsg
})

export default i18n
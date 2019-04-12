import Vue from 'vue'
import iView from 'iview';
import VueI18n from 'vue-i18n'
import iViewEnLocale from 'iview/dist/locale/en-US';
import iViewZhLocale from 'iview/dist/locale/zh-CN';
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import ElementLocale from 'element-ui/lib/locale'
import enLocale from './en'
import zhLocale from './zh'
import thLocale from './th'

Vue.use(VueI18n)
// Vue.use(iView);
Vue.locale = () => {};

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
    ...iViewEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
    ...iViewZhLocale
  },
  th:{
    ...thLocale,
    ...elementEnLocale,
    ...iViewEnLocale,
  }
}

let lang = navigator.language || navigator.userLanguage;
lang = lang.substr(0, 2) == 'zh' ? 'zh' : lang.substr(0, 2) == 'th' ? 'th' : 'en';
if(!localStorage.getItem("lang")){
  localStorage.setItem("lang",lang);
}

// localStorage.setItem("lang",'zh');
const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || lang,
  messages // set locale messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))
iView.i18n((key, value) => i18n.t(key, value))
export default i18n

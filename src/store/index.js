import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import accountinfo from './modules/accountinfo'
import regcode from './modules/regcode'
import common from './modules/common'


Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    app,
    accountinfo,
    regcode,
    common
  },
  strict: debug,
  plugins: []
})

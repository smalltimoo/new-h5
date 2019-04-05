import types from '../mutation-types'
// import { isEmptyObject } from '../../utils/util'

export default {
  //namespaced:true,
  state: {
    GameTransferState: false,
    loginState: false,
    /* spinState: true, */
    loginUser: {},
    alertMessage: {
      isShow: false,
      title: '提示信息',
      content: '',
      okClick: undefined,
      cancelClick: undefined
    },
    loadingModel: {
      visible: false,
      content: '请稍等，处理中...'
    },
    winModel: {
      visible: false,
      title: '提示',
      view: '',
      width: 400,
      paramData: {},
      callback: undefined,
      onclose: undefined
    },
    noticeMessage: {
      show: false,
      index: 0
    },
    tabPages: []
  },

  getters: {
    getLoginUser: state => {
      return state.loginUser
    },
    getNeedLogin: state => {
      let needLogin = false;

      if (Object.keys(state.loginUser).length<0 || !state.loginUser.id) {
        needLogin = true
      }
      return needLogin
    },
    getAlertMessage: state => {
      return state.alertMessage
    },
    getLoadingModel: state => {
      return state.loadingModel
    },
    getWinModel: state => {
      return state.winModel
    },
    getTabPages(state) {
      return state.tabPages
    }
  },
  mutations: {
    toggleGameTransferState(state) {
      state.GameTransferState = !state.GameTransferState
    },
    toggleLoginState(state) {
      state.loginState = !state.loginState
    },
    /*  toggleSpinState() {}, */
    [types.SAVE_LOGIN_USER](state, user) {
      state.loginUser = user
      sessionStorage.setItem('loginUser', JSON.stringify(user))
    },
    [types.LOAD_LOGIN_USER](state) {
      if (Object.keys(state.loginUser).length<0 || !state.loginUser) {
        let userStr = sessionStorage.getItem('loginUser')
        if (!!userStr) {
          state.loginUser = JSON.parse(userStr)
        }
      }
    },
    [types.LOGINOUT_USER](state) {
      state.loginUser = {}
      sessionStorage.removeItem('loginUser')
    },
    [types.ALERT_MESSAGE](state, payload) {
      state.alertMessage.isShow =
        payload.isShow != undefined ? payload.isShow : false
      state.alertMessage.title = !!payload.title ? payload.title : '提示信息'
      state.alertMessage.content = !!payload.content ? payload.content : ''
      state.alertMessage.maxWidth = !!payload.maxWidth ? payload.maxWidth : 360
      state.alertMessage.hasOKBtn = true
      state.alertMessage.hasCancelBtn = !!payload.hasCancelBtn
        ? payload.hasCancelBtn
        : false
      state.alertMessage.okClick = !!payload.okClick
        ? payload.okClick
        : undefined
      state.alertMessage.cancelClick = !!payload.cancelClick
        ? payload.cancelClick
        : undefined
    },
    [types.OPEN_WIN_MODEL](state, payload) {
      state.winModel = $.extend(state.winModel, payload)
    },
    [types.UPDATE_LOADING_MODEL_VISIBLE](state, payload) {
      state.loadingModel.visible = payload.visible
      if (!!payload.content) {
        state.loadingModel.content = payload.content
      } else {
        state.loadingModel.content = '请稍等，处理中...'
      }
    },
    [types.GOTO_PAGE](state, payload) {
      var i = -1
      state.tabPages.forEach((tab, index) => {
        if (tab.routeName == payload.routeName) {
          i = index
        }
      })
      if (i == -1) state.tabPages.push(payload)
      state.tabPages.forEach(item => {
        item.isActive = payload.routeName == item.routeName
      })
    },
    [types.CLOSE_PAGE](state, payload) {
      state.tabPages.splice(payload, 1)
    }
  },
  actions: {
    [types.SAVE_LOGIN_USER]({ commit }, payload) {
      commit(types.SAVE_LOGIN_USER, payload)
    },
    [types.LOAD_LOGIN_USER]({ commit }) {
      commit(types.LOAD_LOGIN_USER)
    },
    [types.LOGINOUT_USER]({ commit }) {
      commit(types.LOGINOUT_USER)
    },
    [types.UPDATE_LOADING_MODEL_VISIBLE]({ commit }, payload) {
      commit(types.UPDATE_LOADING_MODEL_VISIBLE, payload)
      if (!!payload.timer && payload.timer > 0) {
        setTimeout(() => {
          commit(types.UPDATE_LOADING_MODEL_VISIBLE, { visible: false })
        }, payload.timer * 1000)
      }
    }
  }
}

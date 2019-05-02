import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import types from "./store/mutation-types";
import iView from "iview";
import axios from "axios";
import ElementUI from 'element-ui';
import mixin from "./mixins/mixin";
import directive from "./assets/directives";
import i18n from './lang' // Internationalization
import {dateFormat} from "./assets/lib/util";
import Cube from 'cube-ui';


import 'element-ui/lib/theme-chalk/index.css';
import 'iview/dist/styles/iview.css';
import "animate.css";
import './style/base.less';
import 'amfe-flexible'


directive(Vue);
Vue.use(ElementUI);
Vue.use(iView);
Vue.mixin(mixin);
Vue.use(Cube);

//ajax携带cookie数据，保证session可用
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

// 在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 2
axios.defaults.retryDelay = 1000

process.env.NODE_ENV !== "development" && (axios.defaults.timeout = 10 * 1000);

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
      if (!!config.data) {
        var data = config.data;
        if (typeof (data) == 'string' && data.indexOf("{") == 0) {
          data = JSON.parse(data);
        }
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            var value = data[key];
            try {
              data[key] = value + "";
            } catch (e) {

            }
          }
        }
        config.data = data;
      }
      config.headers.sessionToken = store.getters.getSessionToken;
      config.headers.prefix = process.env.VUE_APP_PREFIX;
      config.headers.lang = localStorage.getItem('lang') == 'zh' ? 'CN' : localStorage.getItem('lang') == 'th' ? 'TH' : 'ENGLISH';
      // 根据vuex store内容动态设置baseurl
      // config.baseURL = store.getters.baseUrl
      var apibaseUrl = store.getters.getBaseUrl;
      if (config.url.indexOf("/") == 0) {
        config.url = apibaseUrl + config.url
      }
      config.baseURL = apibaseUrl;
      return config;
    },
    function (error) {
      vue.mLoading(false);
      return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
      let data = response.data;
      if (data.code == -100) {
        vue.mLoading(false);
        setTimeout(() => {
          vue.mReLogin();
          // vue.mAlert(data.message, () => {
          //   vue.mReLogin();
          // });
        }, 100);
      } else if (data.code != 0 && data.message) {
        vue.mLoading(false);
        // vue.mAlert(data.message);
      } else if (data.code == 0) {
        vue.mLoading(false);
      }
      return data;
    },
    function (error) {
      console.log("Server", error);
      vue.mLoading(false);
      // alert(error.config.baseURL+":aaa" + store.getters.baseUrl);
      var econfig = error.config;
      if (econfig == undefined || econfig.baseURL == undefined) {
        store.commit(types.CHANGE_URL, '')
      } else {
        store.commit(types.CHANGE_URL, econfig.baseURL)
      }

      // If config does not exist or the retry option is not set, reject
      if (econfig == undefined) {
        // vue.mAlert('undifine' + error)
        return Promise.reject(error);
      }
      if (!econfig || !econfig.retry) {
        // vue.mAlert('抱歉，网络开小差了！<br/>原因：' + error)
        return Promise.reject(error)
      }
      // Set the variable for keeping track of the retry count
      econfig.__retryCount = econfig.__retryCount || 0;
      // Check if we've maxed out the total number of retries
      if (econfig.__retryCount >= econfig.retry) {
        // Reject with the error
        // vue.mAlert('抱歉，网络开小差了！<br/>原因：' + error)
        return Promise.reject(error);
      }

      econfig.__retryCount += 1;
      econfig.url = econfig.url.replace(econfig.baseURL, '')
      // if("/memberApiList.json" == econfig.url){//拉取服务器的链接去除
      //   return Promise.reject(error)
      // }
      // Create new promise to handle exponential backoff
      var backoff = new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, econfig.retryDelay || 1);
      });

      // Return the promise in which recalls axios to retry the request
      return backoff.then(function () {
        return axios(econfig);
      });

      // vue.mAlert("抱歉，网络开小差了！<br/>原因：" + error);
      // return Promise.reject(error);
    }
);
Vue.prototype.$http = axios;

Vue.config.productionTip = false;
var vue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
var backHomeTime = null;
window.onAppBackPressed = function () {
  if (vue.$route.name === "Home") {
    //首次按键，提示‘再按一次退出应用’
    if (!backHomeTime) {
      //记录第一次按下回退键的时间
      backHomeTime = new Date().getTime(); //回退到上一页面
      setTimeout(function () {
        //1s中后清除
        backHomeTime = null;
      }, 1000);
    } else {
      if (new Date().getTime() - backHomeTime < 1000) {
        return "break";
      }
    }
  }
  vue.$router.go(-1);
};
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(function (to, from) {
  iView.LoadingBar.finish();
});

// formatString:yyyy-MM-dd HH:mm:ss
Vue.filter("fFormatDate", (value, fmt) => {
  return dateFormat(value, fmt);
});

Vue.component("remote-script", {
  render: function (createElement) {
    var self = this;
    return createElement("script", {
      attrs: {
        type: "text/javascript",
        src: this.src
      },
      on: {
        load: function (event) {
          self.$emit("load", event);
        },
        error: function (event) {
          self.$emit("error", event);
        },
        readystatechange: function (event) {
          if (this.readyState == "complete") {
            self.$emit("load", event);
          }
        }
      }
    });
  },
  props: {
    src: {
      type: String,
      required: true
    }
  }
});

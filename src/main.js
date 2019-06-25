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
import api from'./api/api'
import Cube from 'cube-ui';
import Vant from 'vant';
import veRIng from 'v-charts/lib/ring.common'

    Vue.component(veRIng.name, veRIng)
    // lottie.loadAnimation({
    //   container: element, // the dom element that will contain the animation
    //   renderer: 'svg',
    //   loop: true,
    //   autoplay: true,
    //   path: 'data.json' // the path to the animation json
    // });
/**全局处理异常 */
import ErrorPlugin from  './errorPlugin'

// import swiper from "swiper";
import VueAwesomeSwiper from 'vue-awesome-swiper'

require('islider.js');

   

import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';
import "animate.css";
import 'amfe-flexible';
import './style/app.less';

import 'vant/lib/index.css';
// import './src/style/mui/css/swiper.min.css'
import 'swiper/dist/css/swiper.css'

directive(Vue);
Vue.use(ElementUI);
Vue.use(iView);
Vue.mixin(mixin);
Vue.use(Cube);
Vue.use(Vant);

Vue.use(ErrorPlugin);
// Vue.use(swiper);
Vue.use(VueAwesomeSwiper)

Vue.prototype.$api = api;
function geturlQueryParam(paramName) {
  var url = ''+window.location;
  var paramValue = "";
  if (url.indexOf("?") >= 0) {
    var paramstr =url.split("?")[1];
    if(paramstr != undefined && paramstr.length>0){
      var params = paramstr.split("&");
      params.forEach((function(item, index, array){
        if(item != undefined && item.length > 0){
          if(item.split("=")[0] == paramName){
            paramValue = item.split("=")[1];
          }
        }
      }))
    }
  }
  return paramValue;
}
var sessiontoken = geturlQueryParam("sessiontoken");
if(sessiontoken != undefined && sessiontoken.length > 0){
  sessionStorage.setItem(types.SESSION_TOKEN, sessiontoken);
  store.commit(types.SESSION_TOKEN);
}

//ajax携带cookie数据，保证session可用
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
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
axios.interceptors.response.use(response=> {
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

Vue.prototype.changelang = function (...a){
  switch(a[0]){
    case 'imgurl': 
      let index = a[2] .lastIndexOf(".");  
      let temparr = [a[2] .substring(0,index), a[2] .substring(index + 1, a[2] .length)]
      // let temparr = a[2].split('.')
      this[a[1]] = temparr[0]+(document.documentElement.lang == 'zh'?'':'_en')+'.'+(document.documentElement.lang == 'zh'?temparr[1]:a[3]||temparr[1]);
      break;
  }
}

Vue.prototype.getMyDate = function(str) {
  function addZero(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
  }
      var oDate = new Date(str),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth()+1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oSen = oDate.getSeconds(),
      oTime = oYear +'-'+ addZero(oMonth) +'-'+ addZero(oDay)
      return oTime;
  }
Vue.directive('preventReClick', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  }
})

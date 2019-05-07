import types from "../mutation-types";
import {apiGet} from './httpsnow'//记得带上{}花括号
import axios from 'axios'

export default {
    state: {
        darkTheme: localStorage.getItem('darkTheme') ? JSON.parse(localStorage.getItem('darkTheme')) : false,
        tab: localStorage.getItem('tab') ? localStorage.getItem('tab') : 'Home',
        gongGaos: [],
        sessionToken: "",
        baseUrl: '',
        fastUrl: '',
        baseUrlList: [],
        webnav: [],
        sysPicObj: {},
        apigetnum: 0,
        systemSettings: {}
    },
    getters: {
        getGonggaos: state => {
            return state.gongGaos;
        },
        getSessionToken: state => {
            return state.sessionToken;
        },
        getTheme: state => {
            return state.darkTheme;
        },
        getSysInfo: state => {
            return state.systemSettings;
        },
        getSysPicObj(state) {
            return state.sysPicObj
        },
        getBaseUrl(state) {
            if (state.baseUrl == '' || state.baseUrl == undefined) {
                return process.env.VUE_APP_BASE_API
            }
            return state.baseUrl
        },
        getWebnav(state) {
            return state.webnav
        }
    },
    mutations: {
        [types.THEME](state, payload) {
            localStorage.setItem('darkTheme',payload);
            state.darkTheme = payload;
        },
        [types.COMMON_GONGGAO](state, payload) {
            state.gongGaos = payload;
        },
        [types.SESSION_TOKEN](state) {
            let token = sessionStorage.getItem(types.SESSION_TOKEN);
            if (!token) {
                let d = new Date();
                token = d.getMonth() + 1 + "_" + d.getDate() + "_" + d.getTime();
                sessionStorage.setItem(types.SESSION_TOKEN, token);
            }
            state.sessionToken = token;
        },
        [types.BASE_URL](state) {
            if (state.baseUrl == '' || state.baseUrl == null) {
                let url = sessionStorage.getItem(types.BASE_URL)
                if (!url || url == 'undefined') {
                    var listStr = localStorage.getItem(types.BASE_URL_LIST)
                    if (!listStr || listStr == '[]') {
                        this.commit(types.CHANGE_URL)
                    } else {
                        var list = JSON.parse(listStr);
                        // state.baseUrlList = list
                        url = list[0];
                    }
                    // url = state.baseUrlList[0];
                    sessionStorage.setItem(types.BASE_URL, url)
                }
                state.baseUrl = url;
            }
        },
        [types.CHANGE_URL](state, url) {
            var listStr = localStorage.getItem(types.BASE_URL_LIST)
            if (!listStr || listStr == '[]') {
                if (state.apigetnum >= 3) {
                    var list = [];
                    list.push(process.env.VUE_APP_BASE_API);
                    localStorage.setItem(types.BASE_URL_LIST, JSON.stringify(list))
                    state.baseUrl = process.env.VUE_APP_BASE_API;
                    return
                }
                apiGet(process.env.VUE_APP_API_GET, this.commit, this.dispatch);
                state.apigetnum = state.apigetnum + 1;
            } else {
                // listStr.split();
                var list = JSON.parse(listStr);
                state.baseUrlList = list.filter(i => {
                    return i != url;
                });
                localStorage.setItem(types.BASE_URL_LIST, JSON.stringify(state.baseUrlList))
            }

            state.baseUrl = state.baseUrlList[0];
        },
        [types.WEBNAV](state, webnav) {
            state.webnav = webnav
        },
        [types.SET_FASTURL](state, url) {
            if (state.fastUrl == '') {//只设置第一次的
                state.fastUrl = url
                state.baseUrl = state.fastUrl
            }
        },
        [types.SYS_PIC](state, payload) {
            state.sysPicObj = payload
        },
        [types.SYSTEM_SETTINGS](state, payload) {
            state.systemSettings = payload;
        },
        [types.CHANGE_TAB](state, payload) {
            localStorage.setItem('tab',payload);
            state.tab = payload;
        },
    },
    actions: {
        [types.COMMON_GONGGAO]({commit}, vueContext) {
            if (vueContext) {
                // let sysId = vueContext.cLoginUser.sysId ? vueContext.cLoginUser.sysId : "";
                vueContext.$http.post("/announcements.json", {}).then(result => {
                    if (result.code === 0) {
                        commit(types.COMMON_GONGGAO, !!result.data ? result.data : []);
                    }
                });
            }
        },
        [types.SYSTEM_SETTINGS]({commit}, vueContext) {
            if (vueContext) {
                vueContext.$http.post("/getsys.json").then(res => {
                    if (res.code == 0) {
                        commit(types.SYSTEM_SETTINGS, res.data);
                        document.title = res.data.name
                        // 修改浏览器图标 和 前端图片
                        commit(types.SYS_PIC, !!res.data ? res.data : {})
                        var obj = document.getElementById("iconlink")
                        obj.href = res.data.webIcon;
                        obj.type = '';
                        obj.type = 'image/x-icon';
                    }
                });
            }
        },
        [types.SYSTEM_UPDATE]({commit}) {
            axios.post('/getsys.json').then(res => {
                if (res.code == 0) {
                    commit(types.SYSTEM_SETTINGS, res.data)
                    //let sysId = res.data.id
                    let params = {} //: {sysId: sysId}
                    axios.post('/announcements.json', params).then(result => {
                        if (result.code == 0) {
                            commit(types.COMMON_GONGGAO, !!result.data ? result.data : [])
                        }
                    })
                    document.title = res.data.name
                    // 修改浏览器图标 和 前端图片
                    commit(types.SYS_PIC, !!res.data ? res.data : {})
                    var obj = document.getElementById("iconlink")
                    obj.href = res.data.webIcon;
                    obj.type = '';
                    obj.type = 'image/x-icon';
                }
            })
        },
        [types.WEBNAV]({commit}, {callback, url, type}) {
            if (url == null || url == undefined) {
                url == ''
            }
            var baseUrl = url;
            if (type == 'getfasturl') {
                if (baseUrl != undefined && baseUrl != '') {
                    axios.post(url + '/common/checkOk.json', {}).then(result => {
                        if (result.code == 0) {
                            commit(types.SET_FASTURL, baseUrl)
                        }
                    })
                }
                setTimeout(function () {
                    callback(type, 2, url)
                }, 2000);
                return;
            }
            if (type == 'tuiJianGames') {
                url = url + "/gamesbytype.json";
            }
            if (type == 'activities') {
                url = url + "/activities.json";
            }
            axios.post(url, {sysId: 0}).then(result => {
                if (result.code == 0) {
                    if (baseUrl != undefined && baseUrl != '') {
                        commit(types.SET_FASTURL, baseUrl)
                    }

                    var webnav = []
                    if (type == 'tuiJianGames') {
                        webnav = !!result.data.companyCustomGames
                            ? result.data.companyCustomGames
                            : []
                    }
                    if (type == 'activities') {
                        let list = result.data.activityVoList
                            ? result.data.activityVoList
                            : []
                        list.forEach(element => {
                            element.selected = false
                        })
                        webnav = list
                    }
                    callback(type, webnav, url);
                }
            })
            setTimeout(function () {
                callback(type, 2, url)
            }, 3000);
        }
    }
};

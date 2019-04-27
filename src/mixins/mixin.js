import {dateFormat} from "../assets/lib/util";
import types from "../store/mutation-types";
import alert from "../mixins/alert";
import message from "../mixins/message";
import Clipboard from 'clipboard';

export default {
    mixins: [alert, message],
    data() {
        return {
            leftDrawer: false,
        }
    },
    computed: {
        cApi: function () {
            // return process.env.VUE_APP_BASE_API;
            return this.$store.getters.getBaseUrl;
        },
        cLoginUser: function () {
            return this.$store.getters.getLoginUser;
        },
        cNeedLogin() {
            return this.$store.getters.getNeedLogin;
        },
        cQQ1() {
            let sysInfo = this.$store.getters.getSysInfo;
            this.drawBanner = sysInfo.rouletteSlide;
            this.agentQQ = sysInfo.agentQQ;
            return sysInfo.customQQ ? sysInfo.customQQ : '';
        },
        cQQ2() {
            if (process.env.VUE_APP_ISAPP == 'TRUE') {
                let qq = process.env.VUE_APP_QQ
                return qq ? qq : ''
            }
        },
    },
    methods: {
        quickEnterGame(roomId,gameId,comGameType,gameName){
            if (comGameType == 5) {
                this.$router.push({
                    name: 'GameList',
                    params: {
                        gameCompanyId: roomId,
                        gameName: gameName,
                    }
                })
            } else {
                this.$router.push({
                    name: 'GameContainer',
                    params: {
                        gameCompanyId: roomId,
                        gameId: gameId,
                        comGameType: comGameType
                    }
                })
            }
        },
        openDrawer() {
            this.leftDrawer = true;
            this.$http.get("/memberUser/memberinfo.json").then(result => {
                if (result.code == 0) {
                    this.$store.dispatch(types.SAVE_LOGIN_USER, result.data);
                }
            });
        },
        goBack() {
            this.$router.back();
        },
        //复制功能
        copy() {
            var clipboard = new Clipboard('.clipboard');
            clipboard.on('success', () => {
                this.$Message.success('内容已复制到剪贴板');
            })
            clipboard.on('error', function (e) {
            })
        },
        mLoading(visible, content) {
            this.$store.commit(types.UPDATE_LOADING_MODEL_VISIBLE, {
                visible: !!visible,
                content
            });
        },
        toNeedLogin() {
            if (this.cNeedLogin) {
                this.mConfirm('请先登陆', () => {
                    this.$router.push({name: 'Login'})
                })
                return false
            } else {
                return true
            }
        },
        mCheckLoginState() {
            this.$store.dispatch(types.LOAD_LOGIN_USER);
            if (this.$store.getters.getNeedLogin) {
                this.$store.dispatch(types.LOGINOUT_USER);
                this.$store.dispatch(types.COMMON_GONGGAO, this);
                if (this.$route.name !== "Login" && this.$route.name !== "Home" && this.$route.name !== "Score" && this.$route.name !== "Discount" && this.tab !== "Score") {
                    this.mConfirm('请先登陆', () => {
                        this.$router.push({name: 'Login'})
                    })
                }
            } else {
                this.$router.push({name: this.tab})
            }
        },
        mReLogin() {
            if (process.env.NODE_ENV == "development") {
                console.log("mReLogin");
            }
            this.mLoading(false);
            this.$store.dispatch(types.LOGINOUT_USER);
            this.mCheckLoginState();
        },
        mRefreshAccountInfo() {
            this.$store.dispatch(types.ACCOUNT_INFO_REFRESH_DATA, true);
        },
        mFormatDate(value, fmt) {
            return dateFormat(value, fmt);
        },
        mOpenCService() {
            let sysInfo = this.$store.getters.getSysInfo;
            if (sysInfo.customUrl) {
                this.$router.push({
                    name: "CustomerService",
                    params: {aType: "cs", cUrl: sysInfo.customUrl}
                });
            } else {
                this.$store.dispatch(types.SYSTEM_SETTINGS, this);
                this.mAlert("客服正赶来，请刷新后再试..");
            }
        },
        mmLogin(userName, password, vcode) {
            return new Promise((ok, error) => {
                this.$http
                    .post("/login.json", {
                        username: userName,
                        password: password,
                        checkcode: vcode
                    })
                    .then(result => {
                        if (result.code == 0) {
                            this.$store.dispatch(types.SAVE_LOGIN_USER, result.data);
                            this.mLoading(false);
                            this.mMessage(
                                "登陆成功！",
                                () => {
                                    this.$store.dispatch(types.COMMON_GONGGAO, this);
                                    this.$router.push({name: "Home"});
                                },
                                "success",
                                0.5
                            );
                            ok(result);
                        } else {
                            error(result);
                        }
                    });
            });
        }
    }
};
